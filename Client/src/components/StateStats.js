import React from 'react';
import PageNavbar from './PageNavbar';
import USAMap from "react-usa-map";
import '../style/StateStats.css';
import {
  Button,
  Classes,
  Dialog,
  Card,
} from "@blueprintjs/core";

export default class StateStats extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedState: "",
      showPopup: false,
      OverallRating: "",
      OccupancyRate: "",
      ResidentCaseRate: "",
      COVIDmortalityRate: "",
      COVIDreportingRate: "",
      COVIDtestingRate: "",
      StaffingRate: "",
      PercentageOfHomesWithCOVID: ""
    };
    fetch(`http://localhost:8081/stateStats/${this.props.state.selectedState}`, {
      method: 'GET'
    })
  }



  mapHandler = (event) => {
    var state = event.target.dataset.name;
    this.setState({
      selectedState: state,
      showPopup: true
    })
    fetch(`http://localhost:8081/stateStats/${state}`, {
        method: 'GET'
      })
      .then(res => res.json())
      .then(queries => {
        if (!queries) return;
        console.log(queries); 
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

  };

  handleClose = () => {
    this.setState({
      showPopup: false
    });
  }

  render() {
    return (
      <div className="StateStats">
        <PageNavbar active="state"/>
        <div className='search-container-block'>
          <Card className='state-results-container'>{this.state.selectedState ? `Here are the top nursing homes in ${this.state.selectedState}` : "Click on a state to learn more!"}</Card>
          <div className="map-container">
            <div className='country-row'>
              <Card className='country-stats-card'>
                <h1>Country Stats</h1>
                <div className='stats-country'>
                  <div className='single-stat'>
                    <p>Total Number of Nursing Homes</p>
                    <p>15000</p>
                  </div>
                  <div className='single-stat'>
                    <p>Total Number of Fines in Nursing Homes</p>
                    <p>15000</p>
                  </div>
                  <div className='single-stat'>
                    <p>Total Covid Admission in Nursing Homes</p>
                    <p>15000</p>
                  </div>
                  <div className='single-stat'>
                    <p>Total Number of Deaths from COVID-19 in Nursing Homes</p>
                    <p>15000</p>
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
              title= {`You selected ${this.state.selectedState}`}
              isOpen={this.state.showPopup}
            >
              <div className={Classes.DIALOG_BODY}>
                <p>
                  Overall Rating: {this.state.OverallRating}
                </p>
                <p>
                  Occupancy Rate: {this.state.OccupancyRate}
                </p>
                <p>
                  Resident Case Rate: {this.state.ResidentCaseRate}
                </p>
                <p>
                  COVID Mortality Rate: {this.state.COVIDmortalityRate}
                </p>
                <p>
                  COVID Reporting Rate: {this.state.COVIDreportingRate}
                </p>
                <p>
                  COVID Testing Rate: {this.state.COVIDtestingRate}
                </p>
                <p>
                  Staffing Rate: {this.state.StaffingRate}
                </p>
                <p>
                  Percentage of Homes with COVID Cases: {this.state.PercentageOfHomesWithCOVID}
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