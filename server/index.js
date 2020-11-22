const bodyParser = require('body-parser');
const express = require('express');
var routes = require("./routes.js");
const cors = require('cors');

const app = express();
/* test*/ 
app.use(cors({
  credentials: true,
  origin: 'http://localhost:3000'
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

/* ---------------------------------------------------------------- */
/* ------------------- Route handler registration ----------------- */
/* ---------------------------------------------------------------- */


/* --- Front page search bar --- */
app.get('/search/:searchterm', routes.searchBar)

/* --- Filtered search --- */
app.get('/filter/:name&:id&:state&:provider&:owner&:abuse&:rating&:residents&:admission&:cases&:beds&:submitted&:qa&:latitude&:longitude&:distance', routes.filteredSearch)

/* --- State Page Routes --- */
app.get('/stateStats/:state', routes.stateStats);

/* --- Individual Nursing Home Profile Page Routes --- */
/* --- Similar Homes - This home does not submit covid data - not currently working, come back to this --- */
app.get('/similar2/:FPN', routes.findSimilarWithData)

/* --- Similar Homes - This home submits covid data --- */
app.get('/similar/:FPN/:lat/:long/:state/:rank', routes.findSimilarHomes)

/* --- Routes to return additional info from FPN --- */
app.get('/state/:FPN', routes.getState)
app.get('/latitude/:FPN', routes.getLatitude)
app.get('/longitude/:FPN', routes.getLongitude)
app.get('/covidData/:FPN', routes.getSubmittedCovidData)

/* --- Get Individual Nursing Home Rank --- */
app.get('/rank/:FPN/:state', routes.getRank)

/* --- Grab all individual nursing home info --- */
app.get('/profile/:FPN', routes.profileInfo)

/* --- Averages for individual nursing home page --- */
app.get('/overallAvg', routes.overallAvg)
app.get('/stateAvg/:state', routes.stateAvg)

/* ---- Red Flag ---- */
// if this FPN has a red flag, returns the type of red flag. If no red flag, returns empty array
app.get('/redflag/:FPN', routes.getRedFlagType);



app.listen(8081, () => {
  console.log(`Server listening on PORT 8081`);
});