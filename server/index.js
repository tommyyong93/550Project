const bodyParser = require('body-parser');
const express = require('express');
var routes = require("./routes.js");
const cors = require('cors');

const app = express();

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

/* ---- Test ---- */
app.get('/fpns', routes.testFunc);

/* ---- Test2 ---- */
app.get('/f/:state', routes.testFunc2);

/* --- Front page search bar --- */
app.get('/search/:searchterm', routes.searchBar)

/* --- Filtered search --- */
app.get('/filter/:name&:id&:state&:provider&:owner&:abuse&:rating&:residents&:admission&:cases&:beds&:submitted&:qa&:latitude&:longitude&:distance', routes.filteredSearch)

/* ---- Red Flag ---- */
// if this FPN has a red flag, returns the type of red flag. If no red flag, returns empty array
app.get('/redflag/:FPN', routes.getRedFlagType);

app.listen(8081, () => {
  console.log(`Server listening on PORT 8081`);
});