var config = require('./db-config.js');
var mysql = require('mysql');

config.connectionLimit = 10;
var connection = mysql.createPool(config);

/* -------------------------------------------------- */
/* ------------------- Route Handlers --------------- */
/* -------------------------------------------------- */

/* ---- Test ---- */
function testFunc(req, res) {
  var query = `
  SELECT state
  FROM Locations
  LIMIT 10;
`;
  connection.query(query, function (err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
};

/* ---- Test2 ---- */
function testFunc2(req, res) {
  var vstate = req.params.state
  var query = `
  SELECT FPN
  FROM Locations
  WHERE state='${vstate}'
  LIMIT 10;
`;
  connection.query(query, function (err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
};

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
  if (residents === "default") residents = "0"
  var admission = req.params.admission
  if (admission === "default") admission = "0"
  var cases = req.params.cases
  if (cases === "default") cases = "0"
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
    AND P.AveResidentsPerDay >= ${residents}
    AND D.ResidentsTotalAdmissions >= ${admission}
    AND D.TotalResidentConfirmedCasesPer1000 >= ${cases}
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
  FPNs_with_flag_type AS (
  (SELECT * FROM both_flag) UNION (SELECT * FROM covid_minus_both) UNION (SELECT * FROM other_minus_both))
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

// The exported functions, which can be accessed in index.js.
module.exports = {
  testFunc: testFunc,
  testFunc2: testFunc2,
  searchBar: searchBar,
  filteredSearch: filteredSearch,
  getRedFlagType: getRedFlagType,
}