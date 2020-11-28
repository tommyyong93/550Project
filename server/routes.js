var config = require('./db-config.js');
var mysql = require('mysql');

config.connectionLimit = 10;
var connection = mysql.createPool(config);

/* -------------------------------------------------- */
/* ------------------- Route Handlers --------------- */
/* -------------------------------------------------- */



/* --- Front page search bar --- */
function searchBar(req, res) {
  var term = req.params.searchterm
  console.log(term)
  var query = `
    SELECT P.ProviderName, L.State, L.Latitude, L.Longitude, P.FPN
    FROM Providers P JOIN Locations L ON P.FPN = L.FPN JOIN CMSData C On P.FPN = C.FPN JOIN COVIDData D ON P.FPN = D.FPN
    WHERE L.State LIKE '${term}%' OR
    L.City LIKE '${term}%' OR
    L.Zip LIKE '${term}%'
    ORDER BY P.ProviderName;
  `
  console.log(query)
  connection.query(query, (err, rows, fields) => {
    if (err) {
      console.log(err);
    } else {
      res.json(rows);
      console.log(rows);
    }
  })
}


/* --- Filtered search --- */
function filteredSearch(req, res) {
  var name = req.params.name
  if (name === "default") name = "%"
  var id = req.params.id
  if (id === "default") id = "%"
  var state = req.params.state
  if (state === "default") state = "%"
  var provider = req.params.provider
  if (provider === "default") provider = "%"
  var owner = req.params.owner
  if (owner === "default") owner = "%"
  var abuse = req.params.abuse
  if (abuse === "default") abuse = "%"
  var rating = req.params.rating
  if (rating === "default") rating = "%"
  var residents = req.params.residents
  if (residents === "default") residents = "800"
  var admission = req.params.admission
  if (admission === "default") admission = "400"
  var cases = req.params.cases
  if (cases === "default") cases = "400"
  var beds = req.params.beds
  if (beds === "default") beds = "0"
  var submitted = req.params.submitted
  if (submitted === "default") submitted = "%"
  var qa = req.params.qa
  if (qa === "default") qa = "%"
  var latitude = req.params.latitude
  if (latitude === "default") latitude = "39.952217"
  var longitude = req.params.longitude
  if (longitude === "default") longitude = "-75.193214"
  var distance = req.params.distance
  if (distance === "default") distance = "40000"
  var query = `
    SELECT P.ProviderName, L.State, L.Latitude, L.Longitude, P.FPN
    FROM Providers P JOIN Locations L ON P.FPN = L.FPN JOIN CMSData C On P.FPN = C.FPN JOIN COVIDData D ON P.FPN = D.FPN
    WHERE L.State LIKE '${state}'
    AND P.FPN LIKE '${id}%'
    AND P.ProviderName LIKE '${name.toUpperCase()}%'
    AND P.ProviderType LIKE "${provider}"
    AND P.OwnershipType LIKE "${owner}"
    AND P.AbuseIcon LIKE "${abuse}"
    AND C.OverallRating LIKE "${rating}"
    AND P.AveResidentsPerDay <= ${residents}
    AND D.ResidentsTotalAdmissions <= ${admission}
    AND D.ResidentsTotalConfirmed <= ${cases}
    AND (P.NumberOfAllBeds - P.TotalNumberofOccupiedBeds >= ${beds})
    AND D.SubmittedData LIKE "${submitted}"
    AND D.PassedQACheck LIKE "${qa}"
    AND (12742 * SIN(SQRT(0.5 - COS((L.Latitude - ${latitude}) * PI() / 180) / 2 + (COS(L.Latitude * PI() / 180) * COS(${latitude} * PI() / 180) * (1-COS((L.Longitude - ${longitude})* PI()/180))/2))) <= ${distance})
    ORDER BY P.ProviderName;
  `
  console.log(query)
  connection.query(query, (err, rows, fields) => {
    if (err) {
      console.log(err);
    } else {
      res.json(rows);
      console.log(rows);
    }
  })
}

/* --- State Page  --- */

function stateStats(req, res) {
  var state = req.params.state;
  var query = `
  WITH Occupancy(FPN, state, occupied, total, rate) AS
  (SELECT P.FPN, L.State, P.TotalNumberofOccupiedBeds, P.CertifiedBeds, P.TotalNumberofOccupiedBeds/P.CertifiedBeds
  FROM Locations L JOIN Providers P ON L.FPN = P.FPN),

  ResidentCases(FPN, state, rate) AS
  (SELECT P.FPN, L.State, CD.ResidentsTotalConfirmed/P.TotalNumberofOccupiedBeds AS rate
  FROM COVIDData CD JOIN Providers P ON CD.FPN = P.FPN JOIN Locations L ON P.FPN = L.FPN),

  HomesWithCOVID(state, count) AS
  (SELECT L.State, COUNT(P.FPN)
  FROM Providers P JOIN Locations L ON P.FPN = L.FPN JOIN COVIDData CD ON L.FPN = CD.FPN
  WHERE CD.ResidentsWeeklyConfirmed > 0 OR CD.ResidentsWeeklySuspected > 0 OR CD.StaffWeeklyConfirmed > 0 OR CD.StaffWeeklySuspected > 0
  GROUP BY L.State),

  COVIDDeathRate(FPN, state, rate) AS
  (SELECT P.FPN, L.State, CD.ResidentsTotalCovidDeaths/P.TotalNumberofOccupiedBeds
  FROM Providers P JOIN COVIDData CD ON P.FPN = CD.FPN JOIN Locations L ON CD.FPN = L.FPN),

  ReportingProviders(state, count) AS
  (SELECT L.State, COUNT(P.FPN)
  FROM Providers P JOIN COVIDData CD ON P.FPN = CD.FPN JOIN Locations L ON CD.FPN = L.FPN
  WHERE CD.SubmittedData = "Y"
  GROUP BY L.State),

  StaffingHours(FPN, state, rate) AS
  (SELECT P.FPN, L.State, C.LicensedStaffing_ReportedHoursPerResidentPerDay+C.TotalNurse_ReportedHoursPerResidentPerDay+C.PT_ReportedHoursPerResidentPerDay
  FROM Providers P JOIN CMSData C ON P.FPN = C.FPN JOIN Locations L ON C.FPN = L.FPN),

  COVIDTesting(state, count) AS
  (SELECT L.State, COUNT(P.FPN)
  FROM Providers P JOIN COVIDData CD ON P.FPN = CD.FPN JOIN Locations L ON CD.FPN = L.FPN
  WHERE CD.ResidentsAbleToTestAllWithinWeek = "Y"
  GROUP BY L.State),

  AllProviders(state, count) AS
  (SELECT L.State, COUNT(*)
  FROM Providers P JOIN Locations L ON P.FPN = L.FPN
  GROUP BY L.State)

  SELECT L.State, ROUND(AVG(C.OverallRating), 2) AS OverallRating, ROUND(AVG(O.rate), 2)*100 AS OccupancyRate, ROUND(AVG(R.rate), 2)*100 AS ResidentCaseRate, ROUND(AVG(CDR.rate), 2)*100 AS COVIDDeathRate, ROUND(COUNT(RP.count)/AP.count*100 , 2)AS ReportingRate, ROUND(AVG(SH.rate), 2) AS StaffingRate, ROUND(CT.count/AP.count*100, 2) AS COVIDTestingRate, ROUND(HWC.count/AP.count*100, 2) AS HomesWithCOVID

  FROM Providers P JOIN CMSData C ON P.FPN = C.FPN JOIN Occupancy O ON C.FPN = O.FPN JOIN Locations L ON O.FPN = L.FPN JOIN COVIDTesting CT ON L.State = CT.state JOIN HomesWithCOVID HWC ON L.State = HWC.state JOIN AllProviders AP ON L.State = AP.state JOIN ReportingProviders RP ON L.State = RP.state JOIN ResidentCases R ON L.FPN = R.FPN JOIN COVIDDeathRate CDR ON R.FPN = CDR.FPN JOIN StaffingHours SH ON CDR.FPN = SH.FPN
  GROUP BY L.State
  HAVING L.State = '${state}';
  `;
  connection.query(query, function (err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
};

/* --- All Individual Nursing Home Profile Page Info Below --- */

/* --- Similar Homes - Covid data reported --- */

function findSimilarHomes(req, res) {
  var vFPN = req.params.FPN
  var vLat = req.params.lat
  var vLong = req.params.long
  var vState = req.params.state
  var rank = req.params.rank

  var query = `
  WITH StatePercentiles AS (
    SELECT l.State AS State, p.FPN AS FPN, p.ProviderName AS Name, cms.OverallRating AS OverallRating, cms.HealthInspectionRating AS HealthInspRating, cms.StaffingRating AS StaffRating, cms.QMRating AS QMRating, ((cms.LicensedStaffing_ReportedHoursPerResidentPerDay + cms.TotalNurse_ReportedHoursPerResidentPerDay + PT_ReportedHoursPerResidentPerDay)/3) AS AverageHrsPerResPerDay, ROUND(PERCENT_RANK() OVER (ORDER BY ((cms.LicensedStaffing_ReportedHoursPerResidentPerDay + cms.TotalNurse_ReportedHoursPerResidentPerDay + PT_ReportedHoursPerResidentPerDay)/3)),6) AS AverageHrsPerResPerDay_StatePercentile, cms.NumReportedIncidents AS ReportedIncidents, cms.NumSubstantiatedComplaints AS Complaints, cov.NumVentilatorsInFacility AS VentilatorsInFacility,  ROUND(PERCENT_RANK() OVER (ORDER BY cov.NumVentilatorsInFacility),6) AS VentilatorsInFacility_StatePercentile, cov.TotalResidentCovidDeathsPer1000 AS CovidDeathsPer1000, ROUND(PERCENT_RANK() OVER (ORDER BY cov.TotalResidentCovidDeathsPer1000),6) AS CovidDeathsPer1000_StatePercentile
      FROM Providers p JOIN Locations l ON p.FPN = l.FPN JOIN CMSData cms ON p.FPN = cms.FPN JOIN COVIDData cov ON cms.FPN = cov.FPN
    WHERE l.State = '${vState}'),
  StateGrades AS (
    SELECT FPN, Name, (((OverallRating)*(0.6) + (HealthInspRating)*(0.45) + (StaffRating)*(0.45) + (QMRating)*(0.45) + (AverageHrsPerResPerDay_StatePercentile)*(0.05) + (ReportedIncidents)*(-0.25) + (Complaints)*(-0.25) + (CovidDeathsPer1000_StatePercentile)*(-0.55) + (VentilatorsInFacility_StatePercentile)*(0.05))*10) AS Grade
      FROM StatePercentiles),
  StateRanks AS (
    SELECT FPN, Name, DENSE_RANK() OVER(ORDER BY Grade DESC) AS StateRank
      FROM StateGrades
    ORDER BY StateRank)
  SELECT s.FPN, s.Name, StateRank, (12742 * SIN(SQRT(0.5 - COS((l.Latitude - ${vLat}) * PI() / 180) / 2 + (COS(l.Latitude * PI() / 180) * COS(${vLat} * PI() / 180) * (1-COS((l.Longitude - ${vLong})* PI()/180))/2)))) as Distance
  FROM Locations l JOIN StateRanks s ON l.FPN=s.FPN
  WHERE (StateRank<(${rank}+10) and StateRank>(${rank}-10)) and s.FPN != '${vFPN}'
  ORDER BY Distance, StateRank
  LIMIT 3;
  `

  connection.query(query, (err, rows, fields) => {
    if (err) {
      console.log(err);
    } else {
      res.json(rows);
      console.log(rows);
    }
  })
}

/* --- Similar Homes - No Covid data reported --- */
/* --- This is currently working correctly in mysql but always returning an empty result in postman --- */
/* --- Should return a result for FPN 145541 --- */

function findSimilarWithData(req, res) {
  var vFPN = req.params.FPN
  var query = `
  WITH MinDist AS (
    WITH Pairs AS (
        WITH NoData AS (
            SELECT P.FPN, L.State, L.Longitude, L.Latitude
            FROM Providers P JOIN COVIDData C ON P.FPN = C.FPN JOIN Locations L on P.FPN = L.FPN
            WHERE C.SubmittedData = 'N' AND L.Longitude <> 0.0 AND L.Latitude <> 0.0
        )
        SELECT N.FPN as NoReport, Y.FPN as YesReport, N.State as NoState, Y.State as YesState, 12742 * SIN(SQRT(0.5 - COS((N.Latitude - Y.Latitude) * PI() / 180) / 2 + (COS(N.Latitude * PI() / 180) * COS(Y.Latitude * PI() / 180) * (1-COS((N.Longitude - Y.Longitude)* PI()/180))/2))) as Distance
        FROM NoData N, (
            SELECT P.FPN, L.State, L.Longitude, L.Latitude
            FROM Providers P JOIN COVIDData C ON P.FPN = C.FPN JOIN Locations L on P.FPN = L.FPN
            WHERE C.SubmittedData = 'Y' AND L.Longitude <> 0.0 AND L.Latitude <> 0.0
        ) AS Y
    )
    SELECT P.NoReport, MIN(P.Distance) as Distance
    FROM Pairs P
    GROUP BY P.NoReport
)
SELECT DISTINCT M.NoReport, P.YesReport, M.Distance
FROM MinDist M JOIN (
    WITH NoData AS (SELECT P.FPN, L.State, L.Longitude, L.Latitude
    FROM Providers P JOIN COVIDData C ON P.FPN = C.FPN JOIN Locations L on P.FPN = L.FPN
    WHERE C.SubmittedData = 'N' AND L.Longitude <> 0.0 AND L.Latitude <> 0.0)
    SELECT N.FPN as NoReport, Y.FPN as YesReport, N.State as NoState, Y.State as YesState, 12742 * SIN(SQRT(0.5 - COS((N.Latitude - Y.Latitude) * PI() / 180) / 2 + (COS(N.Latitude * PI() / 180) * COS(Y.Latitude * PI() / 180) * (1-COS((N.Longitude - Y.Longitude)* PI()/180))/2))) as Distance
    FROM NoData N, (SELECT P.FPN, L.State, L.Longitude, L.Latitude
    FROM Providers P JOIN COVIDData C ON P.FPN = C.FPN JOIN Locations L on P.FPN = L.FPN
    WHERE C.SubmittedData = 'Y' AND L.Longitude <> 0.0 AND L.Latitude <> 0.0) AS Y
    )
AS P ON M.Distance = P.Distance
WHERE M.NoReport = P.NoReport and M.NoReport='${vFPN}';
  `
  connection.query(query, (err, rows, fields) => {
    if (err) {
      console.log(err);
    } else {
      res.json(rows);
      console.log(rows);
    }
  })
}


/* --- Routes to return additional info from FPN --- */

function getState(req, res) {
  var varFPN = req.params.FPN;
  var query = `
  SELECT state
  FROM Locations
  WHERE FPN='${varFPN}';
`;
  connection.query(query, function (err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
};

function getSubmittedCovidData(req, res) {
  var varFPN = req.params.FPN;
  var query = `
  SELECT SubmittedData
  FROM COVIDData
  WHERE FPN='${varFPN}';
`;
  connection.query(query, function (err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
};

function getLatitude(req, res) {
  var varFPN = req.params.FPN;
  var query = `
  SELECT latitude
  FROM Locations
  WHERE FPN='${varFPN}';
`;
  connection.query(query, function (err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
};

function getRank(req, res) {
  var varFPN = req.params.FPN;
  var vState = req.params.state;
  var query = `
  WITH OverallPercentiles AS (
    SELECT l.State AS State, p.FPN AS FPN, p.ProviderName AS Name, cms.OverallRating AS OverallRating, cms.HealthInspectionRating AS HealthInspRating, cms.StaffingRating AS StaffRating, cms.QMRating AS QMRating, ((cms.LicensedStaffing_ReportedHoursPerResidentPerDay + cms.TotalNurse_ReportedHoursPerResidentPerDay + PT_ReportedHoursPerResidentPerDay)/3) AS AverageHrsPerResPerDay, ROUND(PERCENT_RANK() OVER (ORDER BY ((cms.LicensedStaffing_ReportedHoursPerResidentPerDay + cms.TotalNurse_ReportedHoursPerResidentPerDay + PT_ReportedHoursPerResidentPerDay)/3)),6) AS AverageHrsPerResPerDay_OverallPercentile, cms.NumReportedIncidents AS ReportedIncidents, cms.NumSubstantiatedComplaints AS Complaints, cov.ResidentsTotalCovidDeaths AS TotalCovidDeaths, ROUND(PERCENT_RANK() OVER (ORDER BY cov.ResidentsTotalCovidDeaths),6) AS TotalCovidDeaths_OverallPercentile,  cov.NumVentilatorsInFacility AS VentilatorsInFacility, ROUND(PERCENT_RANK() OVER (ORDER BY cov.NumVentilatorsInFacility),6) AS VentilatorsInFacility_OverallPercentile
    FROM Providers p JOIN Locations l ON p.FPN = l.FPN JOIN CMSData cms ON p.FPN = cms.FPN JOIN COVIDData cov ON cms.FPN = cov.FPN),
  OverallRanks AS (
    SELECT State, FPN, Name, OverallRating, HealthInspRating, StaffRating, QMRating, AverageHrsPerResPerDay, ReportedIncidents, Complaints, TotalCovidDeaths, VentilatorsInFacility, (((OverallRating)*(0.6) + (HealthInspRating)*(0.45) + (StaffRating)*(0.45) + (QMRating)*(0.45) + (AverageHrsPerResPerDay_OverallPercentile)*(0.05) + (ReportedIncidents)*(-0.25) + (Complaints)*(-0.25) + (TotalCovidDeaths_OverallPercentile)*(-0.55) + (VentilatorsInFacility_OverallPercentile)*(0.05))*10) AS Grade, DENSE_RANK() OVER(ORDER BY (((OverallRating)*(0.6) + (HealthInspRating)*(0.45) + (StaffRating)*(0.45) + (QMRating)*(0.45) + (AverageHrsPerResPerDay_OverallPercentile)*(0.05) + (ReportedIncidents)*(-0.25) + (Complaints)*(-0.25) + (TotalCovidDeaths_OverallPercentile)*(-0.55) + (VentilatorsInFacility_OverallPercentile)*(0.05))*10) DESC) AS OverallRank
    FROM OverallPercentiles
    ORDER BY OverallRank),
  StateCountFPNs AS (
    SELECT State, COUNT(FPN) AS CountFPNs
    FROM Locations
    GROUP BY State),
  StatePercentiles AS (
    SELECT l.State AS State, t.CountFPNs AS CountFPNs, p.FPN AS FPN, p.ProviderName AS Name, cms.OverallRating AS OverallRating, cms.HealthInspectionRating AS HealthInspRating, cms.StaffingRating AS StaffRating, cms.QMRating AS QMRating, ((cms.LicensedStaffing_ReportedHoursPerResidentPerDay + cms.TotalNurse_ReportedHoursPerResidentPerDay + PT_ReportedHoursPerResidentPerDay)/3) AS AverageHrsPerResPerDay, ROUND(PERCENT_RANK() OVER (ORDER BY ((cms.LicensedStaffing_ReportedHoursPerResidentPerDay + cms.TotalNurse_ReportedHoursPerResidentPerDay + PT_ReportedHoursPerResidentPerDay)/3)),6) AS AverageHrsPerResPerDay_StatePercentile, cms.NumReportedIncidents AS ReportedIncidents, cms.NumSubstantiatedComplaints AS Complaints, cov.NumVentilatorsInFacility AS VentilatorsInFacility,  ROUND(PERCENT_RANK() OVER (ORDER BY cov.NumVentilatorsInFacility),6) AS VentilatorsInFacility_StatePercentile, cov.ResidentsTotalCovidDeaths AS TotalCovidDeaths, ROUND(PERCENT_RANK() OVER (ORDER BY cov.ResidentsTotalCovidDeaths),6) AS TotalCovidDeaths_StatePercentile
    FROM Providers p JOIN Locations l ON p.FPN = l.FPN JOIN CMSData cms ON p.FPN = cms.FPN JOIN COVIDData cov ON cms.FPN = cov.FPN JOIN StateCountFPNs t ON l.State = t.State
    WHERE l.State = '${vState}'),
  StateGrades AS (
    SELECT State, CountFPNs, FPN, Name, OverallRating, HealthInspRating, StaffRating, QMRating, AverageHrsPerResPerDay, ReportedIncidents, Complaints, TotalCovidDeaths, VentilatorsInFacility, (((OverallRating)*(0.6) + (HealthInspRating)*(0.45) + (StaffRating)*(0.45) + (QMRating)*(0.45) + (AverageHrsPerResPerDay_StatePercentile)*(0.05) + (ReportedIncidents)*(-0.25) + (Complaints)*(-0.25) + (TotalCovidDeaths_StatePercentile)*(-0.55) + (VentilatorsInFacility_StatePercentile)*(0.05))*10) AS Grade
    FROM StatePercentiles),
  StateRanks AS (
    SELECT State, CountFPNs, FPN, Name, OverallRating, HealthInspRating, StaffRating, QMRating, AverageHrsPerResPerDay, ReportedIncidents, Complaints, TotalCovidDeaths, VentilatorsInFacility, DENSE_RANK() OVER(ORDER BY Grade DESC) AS StateRank
    FROM StateGrades
    ORDER BY StateRank)
  SELECT l.State AS State, CountFPNs, sr.StateRank, o.OverallRank, p.FPN AS FPN, p.ProviderName AS Name, cms.OverallRating AS OverallRating, cms.HealthInspectionRating AS HealthInspRating, cms.StaffingRating AS StaffRating, cms.QMRating AS QMRating, ((cms.LicensedStaffing_ReportedHoursPerResidentPerDay + cms.TotalNurse_ReportedHoursPerResidentPerDay + PT_ReportedHoursPerResidentPerDay)/3) AS AverageHrsPerResPerDay, cms.NumReportedIncidents AS ReportedIncidents, cms.NumSubstantiatedComplaints AS Complaints, cov.ResidentsTotalCovidDeaths AS TotalCovidDeaths, cov.NumVentilatorsInFacility AS VentilatorsInFacility
  FROM Providers p JOIN Locations l ON p.FPN = l.FPN JOIN CMSData cms ON p.FPN = cms.FPN JOIN COVIDData cov ON p.FPN = cov.FPN JOIN StateRanks sr ON p.FPN = sr.FPN JOIN OverallRanks o ON p.FPN = o.FPN
  WHERE p.FPN = '${varFPN}';

`;
  connection.query(query, function (err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
};

function getLongitude(req, res) {
  var varFPN = req.params.FPN;
  var query = `
  SELECT longitude
  FROM Locations
  WHERE FPN='${varFPN}';
`;
  connection.query(query, function (err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
};

/* --- Individual Nursing Home Stats  --- */

function profileInfo(req, res) {
  var varFPN = req.params.FPN;
  var query = `
  SELECT ProviderName, OwnershipType, ProviderType, NumberOfAllBeds, TotalNumberOfOccupiedBeds, AveResidentsPerDay,
  OverallRating, HealthInspectionRating, StaffingRating, QMRating, TotalWeightedHealthSurveyScore, NumReportedIncidents,
  NumSubstantiatedComplaints, NumFines, NumPaymentDenials, NumPenalties, ResidentsTotalCovidDeaths, NumVentilatorsInFacility,
  Address, City, State, Zip, CountyName, Phone
  FROM Locations l JOIN Providers p ON p.FPN=l.FPN JOIN CMSData cm ON cm.FPN=p.FPN JOIN COVIDData c ON c.FPN=cm.FPN
  WHERE p.FPN ='${varFPN}';
`;
  console.log(query);
  connection.query(query, function (err, rows, fields) {
    if (err) console.log(err);
    else {
      console.log(rows);
      res.json(rows);
    }
  });
};

/* --- Averages for individual nursing home page --- */

function overallAvg(req, res) {
  var query = `
  SELECT AVG(cms.OverallRating) AS OverallAvgOverallRating, AVG(cms.HealthInspectionRating) AS OverallAvgHealthInspRating, AVG(cms.StaffingRating) AS OverallAvgStaffRating, AVG(cms.QMRating) AS OverallAvgQMRating, AVG((cms.LicensedStaffing_ReportedHoursPerResidentPerDay + cms.TotalNurse_ReportedHoursPerResidentPerDay + PT_ReportedHoursPerResidentPerDay)/3) AS OverallAvgAverageHrsPerResPerDay, AVG(cms.NumReportedIncidents) AS OverallAvgReportedIncidents, AVG(cms.NumSubstantiatedComplaints) AS OverallAvgComplaints, AVG(cms.NumFines) AS OverallAvgNumFines, AVG(cms.NumPenalties) AS OverallAvgNumPenalties, AVG(cov.ResidentsTotalCovidDeaths) AS OverallAvgCovidDeaths, AVG(cov.NumVentilatorsInFacility) AS OverallAvgVentilatorsInFacility
  FROM Locations l JOIN CMSData cms ON l.FPN = cms.FPN JOIN COVIDData cov ON l.FPN = cov.FPN;
`;
  console.log(query);
  connection.query(query, function (err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
};


function stateAvg(req, res) {
  var state = req.params.state;
  var query = `
  SELECT l.State, AVG(cms.OverallRating) AS StateAvgOverallRating, AVG(cms.HealthInspectionRating) AS StateAvgHealthInspRating, AVG(cms.StaffingRating) AS StateAvgStaffRating, AVG(cms.QMRating) AS StateAvgQMRating, AVG((cms.LicensedStaffing_ReportedHoursPerResidentPerDay + cms.TotalNurse_ReportedHoursPerResidentPerDay + PT_ReportedHoursPerResidentPerDay)/3) AS StateAvgAverageHrsPerResPerDay, AVG(cms.NumReportedIncidents) AS StateAvgReportedIncidents, AVG(cms.NumSubstantiatedComplaints) AS StateAvgComplaints, AVG(cms.NumFines) AS StateAvgNumFines, AVG(cms.NumPenalties) AS StateAvgNumPenalties, AVG(cov.ResidentsTotalCovidDeaths) AS StateAvgCovidDeaths, AVG(cov.NumVentilatorsInFacility) AS StateAvgVentilatorsInFacility
  FROM Locations l JOIN CMSData cms ON l.FPN = cms.FPN JOIN COVIDData cov ON l.FPN = cov.FPN
  GROUP BY l.State
  HAVING l.State = '${state}';
  `;
  console.log(query);
  connection.query(query, function (err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
};

// /* ---- Red Flag ---- */
function getRedFlagType(req, res) {
  var varFPN = req.params.FPN;
  var query = `
  WITH sub_compl AS(
    SELECT FPN, NumSubstantiatedComplaints, percent_rank() OVER (order by NumSubstantiatedComplaints) AS 'percent_rank'
    FROM CMSData),
  high_sub_compl AS(
    SELECT *
    FROM sub_compl
    WHERE sub_compl.percent_rank > 0.95),
  num_fines AS(
    SELECT FPN, NumFines, percent_rank() OVER (order by NumFines) AS 'percent_rank'
    FROM CMSData),
  high_num_fines AS(
    SELECT *
    FROM num_fines
    WHERE num_fines.percent_rank > 0.95),
  num_reported_incidents AS(
    SELECT FPN, NumReportedIncidents, percent_rank() OVER (order by NumReportedIncidents) AS 'percent_rank'
    FROM CMSData),
  high_num_inc AS(
    SELECT *
    FROM num_reported_incidents
    WHERE num_reported_incidents.percent_rank > 0.95),
  other_flag AS (
    SELECT FPN
    FROM Providers
    WHERE FPN IN (SELECT FPN FROM high_num_fines) OR FPN IN (SELECT FPN FROM high_sub_compl) OR FPN IN (SELECT FPN FROM high_num_inc) OR AbuseIcon='TRUE'),
  covid_flag AS (
    SELECT FPN
    FROM COVIDData
    WHERE
    SubmittedData='N' OR
    PassedQACheck='N' OR
    ResidentsWeeklyConfirmed>0 OR
    ResidentsAbleToTestAllWithinWeek='N' OR
    StaffWeeklyConfirmed>0 OR
    AnyCurrentSupplyN95Masks='N'),
  both_flag AS (
    SELECT FPN, 'both' as flag
    FROM Providers
    WHERE FPN IN (SELECT FPN FROM covid_flag) AND FPN IN (SELECT FPN FROM other_flag)),
  covid_minus_both AS (
    SELECT FPN, 'covid_flag' as flag
    FROM Providers
    WHERE FPN IN (SELECT FPN FROM covid_flag) AND FPN NOT IN (SELECT FPN FROM both_flag)),
  other_minus_both AS (
    SELECT FPN, 'other_flag' as flag
    FROM Providers
    WHERE FPN IN (SELECT FPN FROM other_flag) AND FPN NOT IN (SELECT FPN FROM both_flag)),
  no_flag AS (
    SELECT FPN, 'no_flag' as flag
    FROM Providers
    WHERE FPN NOT IN (SELECT FPN FROM other_flag) AND FPN NOT IN (SELECT FPN FROM both_flag) and FPN NOT IN (SELECT FPN FROM other_minus_both)
  ),
  FPNs_with_flag_type AS (
    (SELECT * FROM both_flag) UNION (SELECT * FROM covid_minus_both) UNION (SELECT * FROM other_minus_both) UNION (SELECT * FROM no_flag)
  )
  SELECT flag
  FROM FPNs_with_flag_type
  WHERE FPN ='${varFPN}'
 ;
  `;
  connection.query(query, function (err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
};

function getRedFlagBool(req, res) {
  var varFPN = req.params.FPN;
  var query = `
  WITH sub_compl AS(
    SELECT FPN, NumSubstantiatedComplaints, percent_rank() OVER (order by NumSubstantiatedComplaints) AS 'percent_rank'
    FROM CMSData),
  high_sub_compl AS(
    SELECT *
    FROM sub_compl
    WHERE sub_compl.percent_rank > 0.95),
  num_fines AS(
    SELECT FPN, NumFines, percent_rank() OVER (order by NumFines) AS 'percent_rank'
    FROM CMSData),
  high_num_fines AS(
    SELECT *
    FROM num_fines
    WHERE num_fines.percent_rank > 0.95),
  num_reported_incidents AS(
    SELECT FPN, NumReportedIncidents, percent_rank() OVER (order by NumReportedIncidents) AS 'percent_rank'
    FROM CMSData),
  high_num_inc AS(
    SELECT *
    FROM num_reported_incidents
    WHERE num_reported_incidents.percent_rank > 0.95),
  covid_flag AS (
    SELECT FPN
    FROM COVIDData
    WHERE
    SubmittedData='N' OR
    PassedQACheck='N' OR
    ResidentsWeeklyConfirmed>0 OR
    ResidentsAbleToTestAllWithinWeek='N' OR
    StaffWeeklyConfirmed>0 OR
    AnyCurrentSupplyN95Masks='N'),
  FPNs_with_flag AS (
  SELECT FPN, 'true' AS flag
  FROM Providers
  WHERE FPN IN (SELECT FPN FROM high_num_fines) OR FPN IN (SELECT FPN FROM high_sub_compl) OR FPN IN (SELECT FPN FROM high_num_inc) OR AbuseIcon='TRUE' OR FPN IN (SELECT FPN FROM covid_flag)
  ),
  FPNs_no_flag AS (
  SELECT FPN, 'false' as flag
  FROM Providers
  WHERE FPN NOT IN (SELECT FPN FROM high_num_fines) AND FPN NOT IN (SELECT FPN FROM high_sub_compl) AND FPN NOT IN (SELECT FPN FROM high_num_inc) AND AbuseIcon='FALSE' AND FPN NOT IN (SELECT FPN FROM covid_flag)
  ),
  all_FPNS AS (
  (SELECT * FROM FPNs_no_flag)
  UNION
  (SELECT * FROM FPNs_with_flag)
  )
  SELECT flag
  FROM all_FPNS
  WHERE FPN ='${varFPN}'
 ;
  `;
  connection.query(query, function (err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
};

/* ---- Nearest Nursing Home that reported Data (complex query )---- */
function getNearestReportData(req, res) {
  var varFPN = req.params.FPN
  var query = `
  WITH MinDist AS (
    WITH AllPairs AS (
      WITH NoData AS (
        SELECT P.FPN, P.ProviderName, L.State, L.Longitude, L.Latitude
        FROM Providers P JOIN COVIDData C ON P.FPN = C.FPN JOIN Locations L on P.FPN = L.FPN
        WHERE C.SubmittedData = 'N' AND L.Longitude <> 0.0 AND L.Latitude <> 0.0 AND P.FPN ='${varFPN}')
    SELECT N.ProviderName as NoReport, Y.ProviderName as YesReport, Y.FPN as YesFPN, N.State as NoState, Y.State as YesState, 12742 * SIN(SQRT(0.5 - COS((N.Latitude - Y.Latitude) * PI() / 180) / 2 + (COS(N.Latitude * PI() / 180) * COS(Y.Latitude * PI() / 180) * (1-COS((N.Longitude - Y.Longitude)* PI()/180))/2))) as Distance
    FROM NoData N, (
      SELECT P.FPN, P.ProviderName, L.State, L.Longitude, L.Latitude
      FROM Providers P JOIN COVIDData C ON P.FPN = C.FPN JOIN Locations L on P.FPN = L.FPN
      WHERE C.SubmittedData = 'Y' AND L.Longitude <> 0.0 AND L.Latitude <> 0.0
      ) AS Y)
  SELECT A.NoReport, MIN(A.Distance) as Distance
  FROM AllPairs A)
  SELECT M.NoReport, P.YesReport, P.YesFPN, P.YesState, M.Distance
  FROM MinDist M JOIN (
    WITH NoData AS (SELECT P.ProviderName, L.State, L.Longitude, L.Latitude
    FROM Providers P JOIN COVIDData C ON P.FPN = C.FPN JOIN Locations L on P.FPN = L.FPN
    WHERE C.SubmittedData = 'N' AND L.Longitude <> 0.0 AND L.Latitude <> 0.0)
    SELECT N.ProviderName as NoReport, Y.ProviderName as YesReport, Y.FPN as YesFPN, N.State as NoState, Y.State as YesState, 12742 * SIN(SQRT(0.5 - COS((N.Latitude - Y.Latitude) * PI() / 180) / 2 + (COS(N.Latitude * PI() / 180) * COS(Y.Latitude * PI() / 180) * (1-COS((N.Longitude - Y.Longitude)* PI()/180))/2))) as Distance
    FROM NoData N, (SELECT P.FPN, P.ProviderName, L.State, L.Longitude, L.Latitude
    FROM Providers P JOIN COVIDData C ON P.FPN = C.FPN JOIN Locations L on P.FPN = L.FPN
    WHERE C.SubmittedData = 'Y' AND L.Longitude <> 0.0 AND L.Latitude <> 0.0) AS Y
    )
  AS P ON M.Distance = P.Distance;
  `
  console.log(query)
  connection.query(query, (err, rows, fields) => {
    if (err) {
      console.log(err);
    } else {
      res.json(rows);
      console.log(rows);
    }
  })
}

/* ---- Nearest Nursing Home that passed QA (complex query )---- */
function getNearestQACheck(req, res) {
  var varFPN = req.params.FPN
  var query = `
  WITH MinDist AS (
    WITH AllPairs AS (
      WITH NoData AS (
        SELECT P.FPN, P.ProviderName, L.State, L.Longitude, L.Latitude
        FROM Providers P JOIN COVIDData C ON P.FPN = C.FPN JOIN Locations L on P.FPN = L.FPN
        WHERE C.PassedQACheck = 'N' AND L.Longitude <> 0.0 AND L.Latitude <> 0.0 AND P.FPN ='${varFPN}')
    SELECT N.ProviderName as NoReport, Y.ProviderName as YesReport, Y.FPN as YesFPN, N.State as NoState, Y.State as YesState, 12742 * SIN(SQRT(0.5 - COS((N.Latitude - Y.Latitude) * PI() / 180) / 2 + (COS(N.Latitude * PI() / 180) * COS(Y.Latitude * PI() / 180) * (1-COS((N.Longitude - Y.Longitude)* PI()/180))/2))) as Distance
    FROM NoData N, (
      SELECT P.FPN, P.ProviderName, L.State, L.Longitude, L.Latitude
      FROM Providers P JOIN COVIDData C ON P.FPN = C.FPN JOIN Locations L on P.FPN = L.FPN
      WHERE C.PassedQACheck = 'Y' AND L.Longitude <> 0.0 AND L.Latitude <> 0.0
      ) AS Y)
  SELECT A.NoReport, MIN(A.Distance) as Distance
  FROM AllPairs A)
  SELECT M.NoReport, P.YesReport, P.YesFPN, P.YesState, M.Distance
  FROM MinDist M JOIN (
    WITH NoData AS (SELECT P.ProviderName, L.State, L.Longitude, L.Latitude
    FROM Providers P JOIN COVIDData C ON P.FPN = C.FPN JOIN Locations L on P.FPN = L.FPN
    WHERE C.PassedQACheck = 'N' AND L.Longitude <> 0.0 AND L.Latitude <> 0.0)
    SELECT N.ProviderName as NoReport, Y.ProviderName as YesReport, Y.FPN as YesFPN, N.State as NoState, Y.State as YesState, 12742 * SIN(SQRT(0.5 - COS((N.Latitude - Y.Latitude) * PI() / 180) / 2 + (COS(N.Latitude * PI() / 180) * COS(Y.Latitude * PI() / 180) * (1-COS((N.Longitude - Y.Longitude)* PI()/180))/2))) as Distance
    FROM NoData N, (SELECT P.FPN, P.ProviderName, L.State, L.Longitude, L.Latitude
    FROM Providers P JOIN COVIDData C ON P.FPN = C.FPN JOIN Locations L on P.FPN = L.FPN
    WHERE C.PassedQACheck = 'Y' AND L.Longitude <> 0.0 AND L.Latitude <> 0.0) AS Y
    )
  AS P ON M.Distance = P.Distance;
  `
  console.log(query)
  connection.query(query, (err, rows, fields) => {
    if (err) {
      console.log(err);
    } else {
      res.json(rows);
      console.log(rows);
    }
  })
}

/* ---- Get all FPNs (used for random nursing home)---- */
function getFPNs(req, res) {
  var query = `
  SELECT P.ProviderName, P.FPN, L.State, L.Longitude, L.Latitude
  FROM Providers P JOIN Locations L on P.FPN = L.FPN;
  `
  console.log(query)
  connection.query(query, (err, rows, fields) => {
    if (err) {
      console.log(err);
    } else {
      res.json(rows);
      console.log(rows);
    }
  })
}

/* ---- Get total nursing homes ---- */
function getTotalNursingHomes(req, res) {
  query = `
    SELECT COUNT(*) as total
    FROM Providers;
  `
  console.log(query)
  connection.query(query, (err, rows, fields) => {
    if (err) {
      console.log(err);
    } else {
      res.json(rows);
      console.log(rows);
    }
  })
}

/* ---- Get total number of fines ---- */
function getTotalFines(req, res) {
  query = `
  SELECT SUM(AmountFines) as fines
  FROM CMSData;
  `
  console.log(query)
  connection.query(query, (err, rows, fields) => {
    if (err) {
      console.log(err);
    } else {
      res.json(rows);
      console.log(rows);
    }
  })
}

/* ---- Get total covid admission ---- */
function getTotalCovidAdmission(req, res) {
  query = `
  SELECT SUM(ResidentsTotalConfirmed) as totalAdmission
  FROM COVIDData;
  `
  console.log(query)
  connection.query(query, (err, rows, fields) => {
    if (err) {
      console.log(err);
    } else {
      res.json(rows);
      console.log(rows);
    }
  })
}

/* ---- Get total deaths from covid---- */
function getTotalDeaths(req, res) {
  query = `
  SELECT SUM(ResidentsTotalAllDeath) as deaths
  FROM COVIDData;
  `
  console.log(query)
  connection.query(query, (err, rows, fields) => {
    if (err) {
      console.log(err);
    } else {
      res.json(rows);
      console.log(rows);
    }
  })
}

/* ---- Get top nursing homes in a state---- */
function getTopNursingHomesInState(req, res) {
  var State = req.params.State;
  var query = `
  WITH OverallPercentiles AS (
    SELECT l.State AS State, p.FPN AS FPN, p.ProviderName AS Name, cms.OverallRating AS OverallRating, cms.HealthInspectionRating AS HealthInspRating, cms.StaffingRating AS StaffRating, cms.QMRating AS QMRating, ((cms.LicensedStaffing_ReportedHoursPerResidentPerDay + cms.TotalNurse_ReportedHoursPerResidentPerDay + PT_ReportedHoursPerResidentPerDay)/3) AS AverageHrsPerResPerDay, ROUND(PERCENT_RANK() OVER (ORDER BY ((cms.LicensedStaffing_ReportedHoursPerResidentPerDay + cms.TotalNurse_ReportedHoursPerResidentPerDay + PT_ReportedHoursPerResidentPerDay)/3)),6) AS AverageHrsPerResPerDay_OverallPercentile, cms.NumReportedIncidents AS ReportedIncidents, cms.NumSubstantiatedComplaints AS Complaints, cov.ResidentsTotalCovidDeaths AS TotalCovidDeaths, ROUND(PERCENT_RANK() OVER (ORDER BY cov.ResidentsTotalCovidDeaths),6) AS TotalCovidDeaths_OverallPercentile,  cov.NumVentilatorsInFacility AS VentilatorsInFacility, ROUND(PERCENT_RANK() OVER (ORDER BY cov.NumVentilatorsInFacility),6) AS VentilatorsInFacility_OverallPercentile
    FROM Providers p JOIN Locations l ON p.FPN = l.FPN JOIN CMSData cms ON p.FPN = cms.FPN JOIN COVIDData cov ON cms.FPN = cov.FPN),
  OverallRanks AS (
    SELECT State, FPN, Name, OverallRating, HealthInspRating, StaffRating, QMRating, AverageHrsPerResPerDay, ReportedIncidents, Complaints, TotalCovidDeaths, VentilatorsInFacility, (((OverallRating)*(0.6) + (HealthInspRating)*(0.45) + (StaffRating)*(0.45) + (QMRating)*(0.45) + (AverageHrsPerResPerDay_OverallPercentile)*(0.05) + (ReportedIncidents)*(-0.25) + (Complaints)*(-0.25) + (TotalCovidDeaths_OverallPercentile)*(-0.55) + (VentilatorsInFacility_OverallPercentile)*(0.05))*10) AS Grade, DENSE_RANK() OVER(ORDER BY (((OverallRating)*(0.6) + (HealthInspRating)*(0.45) + (StaffRating)*(0.45) + (QMRating)*(0.45) + (AverageHrsPerResPerDay_OverallPercentile)*(0.05) + (ReportedIncidents)*(-0.25) + (Complaints)*(-0.25) + (TotalCovidDeaths_OverallPercentile)*(-0.55) + (VentilatorsInFacility_OverallPercentile)*(0.05))*10) DESC) AS OverallRank
    FROM OverallPercentiles
    ORDER BY OverallRank),
  StatePercentiles AS (
    SELECT l.State AS State, p.FPN AS FPN, p.ProviderName AS Name, cms.OverallRating AS OverallRating, cms.HealthInspectionRating AS HealthInspRating, cms.StaffingRating AS StaffRating, cms.QMRating AS QMRating, ((cms.LicensedStaffing_ReportedHoursPerResidentPerDay + cms.TotalNurse_ReportedHoursPerResidentPerDay + PT_ReportedHoursPerResidentPerDay)/3) AS AverageHrsPerResPerDay, ROUND(PERCENT_RANK() OVER (ORDER BY ((cms.LicensedStaffing_ReportedHoursPerResidentPerDay + cms.TotalNurse_ReportedHoursPerResidentPerDay + PT_ReportedHoursPerResidentPerDay)/3)),6) AS AverageHrsPerResPerDay_StatePercentile, cms.NumReportedIncidents AS ReportedIncidents, cms.NumSubstantiatedComplaints AS Complaints, cov.NumVentilatorsInFacility AS VentilatorsInFacility,  ROUND(PERCENT_RANK() OVER (ORDER BY cov.NumVentilatorsInFacility),6) AS VentilatorsInFacility_StatePercentile, cov.ResidentsTotalCovidDeaths AS TotalCovidDeaths, ROUND(PERCENT_RANK() OVER (ORDER BY cov.ResidentsTotalCovidDeaths),6) AS TotalCovidDeaths_StatePercentile
  FROM Providers p JOIN Locations l ON p.FPN = l.FPN JOIN CMSData cms ON p.FPN = cms.FPN JOIN COVIDData cov ON cms.FPN = cov.FPN
    WHERE l.State = '${State}'),
  StateGrades AS (
    SELECT State, FPN, Name, OverallRating, HealthInspRating, StaffRating, QMRating, AverageHrsPerResPerDay, ReportedIncidents, Complaints, TotalCovidDeaths, VentilatorsInFacility, (((OverallRating)*(0.6) + (HealthInspRating)*(0.45) + (StaffRating)*(0.45) + (QMRating)*(0.45) + (AverageHrsPerResPerDay_StatePercentile)*(0.05) + (ReportedIncidents)*(-0.25) + (Complaints)*(-0.25) + (TotalCovidDeaths_StatePercentile)*(-0.55) + (VentilatorsInFacility_StatePercentile)*(0.05))*10) AS Grade
  FROM StatePercentiles),
  StateRanks AS (
    SELECT State, FPN, Name, OverallRating, HealthInspRating, StaffRating, QMRating, AverageHrsPerResPerDay, ReportedIncidents, Complaints, TotalCovidDeaths, VentilatorsInFacility, DENSE_RANK() OVER(ORDER BY Grade DESC) AS StateRank
  FROM StateGrades
    ORDER BY StateRank)
  SELECT l.State AS State, l.Latitude as Latitude, l.Longitude as Longitude, sr.StateRank, o.OverallRank, p.FPN AS FPN, p.ProviderName AS Name, cms.OverallRating AS OverallRating, cms.HealthInspectionRating AS HealthInspRating, cms.StaffingRating AS StaffRating, cms.QMRating AS QMRating, ((cms.LicensedStaffing_ReportedHoursPerResidentPerDay + cms.TotalNurse_ReportedHoursPerResidentPerDay + PT_ReportedHoursPerResidentPerDay)/3) AS AverageHrsPerResPerDay, cms.NumReportedIncidents AS ReportedIncidents, cms.NumSubstantiatedComplaints AS Complaints, cov.ResidentsTotalCovidDeaths AS TotalCovidDeaths, cov.NumVentilatorsInFacility AS VentilatorsInFacility
  FROM Providers p JOIN Locations l ON p.FPN = l.FPN JOIN CMSData cms ON p.FPN = cms.FPN JOIN COVIDData cov ON p.FPN = cov.FPN JOIN StateRanks sr ON p.FPN = sr.FPN JOIN OverallRanks o ON p.FPN = o.FPN
  LIMIT 25;
`;
  connection.query(query, function (err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
};


// The exported functions, which can be accessed in index.js.
module.exports = {
  searchBar: searchBar,
  filteredSearch: filteredSearch,
  getRedFlagType: getRedFlagType,
  getRedFlagBool: getRedFlagBool,
  getLongitude: getLongitude,
  getState: getState,
  getLatitude: getLatitude,
  getSubmittedCovidData: getSubmittedCovidData,
  getRank: getRank,
  findSimilarHomes: findSimilarHomes,
  findSimilarWithData: findSimilarWithData,
  profileInfo: profileInfo,
  overallAvg: overallAvg,
  stateAvg: stateAvg,
  stateStats: stateStats,
  getNearestReportData: getNearestReportData,
  getNearestQACheck: getNearestQACheck,
  getFPNs: getFPNs,
  getTotalNursingHomes: getTotalNursingHomes,
  getTotalFines: getTotalFines,
  getTotalCovidAdmission: getTotalCovidAdmission,
  getTotalDeaths: getTotalDeaths,
  getTopNursingHomesInState: getTopNursingHomesInState
}