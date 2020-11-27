import React from 'react';
import PageNavbar from './PageNavbar';
import USAMap from "react-usa-map";
import StateRow from './StateRow';
import '../style/StateStats.css';
import {
  Button,
  Classes,
  Dialog,
  Card,
  Tooltip,
  Position
} from "@blueprintjs/core";

export default class StateStats extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedState: "",
      stateFullName: "",
      showPopup: false,
      OverallRating: "",
      OccupancyRate: "",
      ResidentCaseRate: "",
      COVIDmortalityRate: "",
      COVIDreportingRate: "",
      COVIDtestingRate: "",
      StaffingRate: "",
      PercentageOfHomesWithCOVID: "",
      // The state variables below are for the country stats
      totalNursingHomes: "",
      totalDeaths: "",
      totalFines: "",
      totalCovidAdmission: "",
      // top nursing homes:
      topResults: []
    };
  }

  componentDidMount() {
    fetch(`http://localhost:8081/totalNursingHomes`, {
      method: "GET"
    }).then(res => res.json()).then(queries => {
      if (!queries) return;
      this.setState({
        totalNursingHomes: queries[0].total
      })
    })
    fetch(`http://localhost:8081/totalFines`, {
      method: "GET"
    }).then(res => res.json()).then(queries => {
      if (!queries) return;
      this.setState({
        totalFines: queries[0].fines
      })
    })
    fetch(`http://localhost:8081/totalCovidAdmission`, {
      method: "GET"
    }).then(res => res.json()).then(queries => {
      if (!queries) return;
      this.setState({
        totalAdmission: queries[0].totalAdmission
      })
    })
    fetch(`http://localhost:8081/totalCovidDeaths`, {
      method: "GET"
    }).then(res => res.json()).then(queries => {
      if (!queries) return;
      this.setState({
        totalDeaths: queries[0].deaths
      })
    })
  }

  mapHandler = (event) => {
    var state = event.target.dataset.name;
    var fullstate = this.stateMap[state]
    this.setState({
      selectedState: state,
      showPopup: true,
      stateFullName: fullstate
    })
    fetch(`http://localhost:8081/stateStats/${state}`, {
        method: 'GET'
      })
      .then(res => res.json())
      .then(queries => {
        if (!queries) return;
        let queryObj = queries[0];
        this.setState({
          OverallRating: queryObj.OverallRating,
          OccupancyRate: queryObj.OccupancyRate,
          ResidentCaseRate: queryObj.ResidentCaseRate,
          COVIDmortalityRate: queryObj.COVIDDeathRate,
          COVIDreportingRate: queryObj.ReportingRate,
          COVIDtestingRate: queryObj.COVIDTestingRate,
          StaffingRate: queryObj.StaffingRate,
          PercentageOfHomesWithCOVID: queryObj.HomesWithCOVID
        })
      })
      .catch(err => console.log(err));
    fetch(`http://localhost:8081/topNursingHomesInState/${state}`, {
        method: 'GET'
      })
      .then(res => res.json())
      .then(queries => {
        if (!queries) return;
        var length = queries.length;
        var queriesArray = [];
        console.log(queries)
        for (var i = 0; i < length; i++) {
          queriesArray[i] = <StateRow
            key={i + queries[i].Name}
            name={queries[i].Name}
            state={queries[i].State}
            id={queries[i].FPN}
            latitude={queries[i].Latitude}
            longitude={queries[i].Longitude}
            index={i+1}

                            />
        }
        this.setState({
          topResults: queriesArray
        })
      })
      .catch(err => console.log(err));
  };



  handleClose = () => {
    this.setState({
      showPopup: false
    });
  }

  numberWithCommas = (x) => {
    if (!x) return
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  stateMap = {
    AZ: 'Arizona',
    AL: 'Alabama',
    AK: 'Alaska',
    AR: 'Arkansas',
    CA: 'California',
    CO: 'Colorado',
    CT: 'Connecticut',
    DC: 'District of Columbia',
    DE: 'Delaware',
    FL: 'Florida',
    GA: 'Georgia',
    HI: 'Hawaii',
    ID: 'Idaho',
    IL: 'Illinois',
    IN: 'Indiana',
    IA: 'Iowa',
    KS: 'Kansas',
    KY: 'Kentucky',
    LA: 'Louisiana',
    ME: 'Maine',
    MD: 'Maryland',
    MA: 'Massachusetts',
    MI: 'Michigan',
    MN: 'Minnesota',
    MS: 'Mississippi',
    MO: 'Missouri',
    MT: 'Montana',
    NE: 'Nebraska',
    NV: 'Nevada',
    NH: 'New Hampshire',
    NJ: 'New Jersey',
    NM: 'New Mexico',
    NY: 'New York',
    NC: 'North Carolina',
    ND: 'North Dakota',
    OH: 'Ohio',
    OK: 'Oklahoma',
    OR: 'Oregon',
    PA: 'Pennsylvania',
    RI: 'Rhode Island',
    SC: 'South Carolina',
    SD: 'South Dakota',
    TN: 'Tennessee',
    TX: 'Texas',
    UT: 'Utah',
    VT: 'Vermont',
    VA: 'Virginia',
    WA: 'Washington',
    WV: 'West Virginia',
    WI: 'Wisconsin',
    WY: 'Wyoming'
  }

  render() {
    return (
      <div className="StateStats">
        <PageNavbar active="state"/>
        <div className='search-container-block'>
          <Card className='state-results-container'>{this.state.selectedState ? `Here are the top ${this.state.topResults.length} nursing homes in ${this.state.stateFullName}` : "Click on a state to learn more!"}
            {this.state.topResults}
            {this.state.selectedState ?
              <Tooltip className={Classes.TOOLTIP_INDICATOR} position={Position.RIGHT} content={"write something here about how we ranked these nursing homes"}>
                How did we rank these nursing homes?
              </Tooltip> : <></>}
          </Card>
          <div className="map-container">
            <div className='country-row'>
              <Card className='country-stats-card'>
                <h1>Nationwide Statistics</h1>
                <div className='stats-country'>
                  <div className='single-stat'>
                    <p>Total Number of Nursing Homes</p>
                    <p>{this.numberWithCommas(this.state.totalNursingHomes)}</p>
                  </div>
                  <div className='single-stat'>
                    <p>Total Number of Fines in Nursing Homes</p>
                    <p>{"$"+this.numberWithCommas(this.state.totalFines)+".00"}</p>
                  </div>
                  <div className='single-stat'>
                    <p>Total Covid Admission in Nursing Homes</p>
                    <p>{this.numberWithCommas(this.state.totalAdmission)}</p>
                  </div>
                  <div className='single-stat'>
                    <p>Total Number of Deaths from COVID-19 in Nursing Homes</p>
                    <p>{this.numberWithCommas(this.state.totalDeaths)}</p>
                  </div>
                </div>
              </Card>
            </div>
            <div className='USA-Map'>
              <USAMap
                onClick={this.mapHandler} defaultFill="#DCDCDC"/>
            </div>
            <Dialog
              onClose={this.handleClose}
              title= {`Here are some statistics on ${this.state.stateFullName}`}
              isOpen={this.state.showPopup}
            >
              <div className={Classes.DIALOG_BODY}>
                <p>
                  Overall Rating: {this.state.OverallRating}
                </p>
                <p>
                  Occupancy Rate: {this.state.OccupancyRate+"%"}
                </p>
                <p>
                  Resident Case Rate: {this.state.ResidentCaseRate+"%"}
                </p>
                <p>
                  COVID Mortality Rate: {this.state.COVIDmortalityRate+"%"}
                </p>
                <p>
                  COVID Reporting Rate: {this.state.COVIDreportingRate+"%"}
                </p>
                <p>
                  COVID Testing Rate: {this.state.COVIDtestingRate+"%"}
                </p>
                <p>
                  Average Staffing Hours: {this.state.StaffingRate}
                </p>
                <p>
                  Homes with COVID Cases: {this.state.PercentageOfHomesWithCOVID+"%"}
                </p>
              </div>
              <div className={Classes.DIALOG_FOOTER}>
                <div className={Classes.DIALOG_FOOTER_ACTIONS}>
                  <Button onClick={this.handleClose}>Close</Button>
                </div>
              </div>
            </Dialog>
          </div>
        </div>
			</div>
    );
  }
}