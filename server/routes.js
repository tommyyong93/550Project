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
connection.query(query, function(err, rows, fields) {
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
connection.query(query, function(err, rows, fields) {
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
  FPNs_with_flag_type AS (
  (SELECT * FROM both_flag) UNION (SELECT * FROM covid_minus_both) UNION (SELECT * FROM other_minus_both))
  SELECT flag
  FROM FPNs_with_flag_type
  WHERE FPN ='${varFPN}'
 ;
  `;
connection.query(query, function(err, rows, fields) {
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
  getRedFlagType: getRedFlagType,
}