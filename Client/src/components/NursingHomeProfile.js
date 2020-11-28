import React from 'react';
import PageNavbar from './PageNavbar'
import ProfileMap from './ProfileMap'
import {
  Card,
} from "@blueprintjs/core";
import '../style/NursingHomeProfile.css';
import SimilarsRow from './SimilarsRow';
import { Icon, Intent } from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";
import { Popover, Position, Tooltip } from "@blueprintjs/core";

export default class NursingHomeProfile extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      fpn: "",
      ProviderName: "",
      Address: "",
      City: "",
      state: "",
      Zip: "",
      Phone: "",
      OwnershipType: "",
      ProviderType: "",
      NumberOfAllBeds: "",
      TotalNumberOfOccupiedBeds: "",
      AveResidentsPerDay: "",
      submittedData: "",
      passedQA: "",
      OverallRating: "",
      HealthInspectionRating: "",
      StaffingRating: "",
      QMRating: "",
      TotalWeightedHealthSurveyScore: "",
      NumReportedIncidents: "",
      NumSubstantiatedComplaints: "",
      NumFines: "",
      NumPaymentDenials: "",
      NumPenalties: "",
      ResidentsTotalCovidDeaths: "",
      NumVentilatorsInFacility: "",
      StateAvgOverallRating: "",
      StateAvgHealthInspRating: "",
      StateAvgStaffRating: "",
      StateAvgQMRating: "",
      StateAvgAverageHrsPerResPerDay: "",
      StateAvgReportedIncidents: "",
      StateAvgComplaints: "",
      StateAvgCovidDeaths: "",
      StateAvgVentilatorsInFacility: "",
      StateAvgNumFines: "",
      StateAvgNumPenalties: "",
      OverallAvgOverallRating: "",
      OverallAvgHealthInspRating: "",
      OverallAvgStaffRating: "",
      OverallAvgQMRating: "",
      OverallAvgAverageHrsPerResPerDay: "",
      OverallAvgReportedIncidents: "",
      OverallAvgComplaints: "",
      OverallAvgNumFines: "",
      OverallAvgNumPenalties: "",
      OverallAvgCovidDeaths: "",
      OverallAvgVentilatorsInFacility: "",
      StateRank: "",
      CountFPNs: "",
      OverallRank: "",
      Flag: "",
      flagColor: "",
      flagType: "",
      flagMessage: ""
    }
  }

  onProfileChange = async (name, state, id, lat, long) => {
    await this.setState({
      ProviderName: name,
      state: state,
      fpn: id,
      latitude: lat,
      longitude: long
    })
    await this.fetchFunction()
  }


  fetchFunction = async () => {
    await fetch(`http://localhost:8081/profile/${this.state.fpn}`, {
        method: 'GET'
      })
      .then(res => res.json())
      .then(queries => {
        if (!queries) return;
        let queryObj = queries[0];

        this.setState({
          ProviderName: queryObj.ProviderName,
          Address: queryObj.Address,
          City: queryObj.City,
          Zip: queryObj.Zip,
          Phone: queryObj.Phone,
          OwnershipType: queryObj.OwnershipType,
          ProviderType: queryObj.ProviderType,
          NumberOfAllBeds: queryObj.NumberOfAllBeds,
          TotalNumberOfOccupiedBeds: queryObj.TotalNumberOfOccupiedBeds,
          AveResidentsPerDay: queryObj.AveResidentsPerDay,
          OverallRating: queryObj.OverallRating,
          HealthInspectionRating: queryObj.HealthInspectionRating,
          StaffingRating: queryObj.StaffingRating,
          QMRating: queryObj.QMRating,
          TotalWeightedHealthSurveyScore: queryObj.TotalWeightedHealthSurveyScore,
          NumReportedIncidents: queryObj.NumReportedIncidents,
          NumSubstantiatedComplaints: queryObj.NumSubstantiatedComplaints,
          NumFines: queryObj.NumFines,
          NumPaymentDenials: queryObj.NumPaymentDenials,
          NumPenalties: queryObj.NumPenalties,
          ResidentsTotalCovidDeaths: queryObj.ResidentsTotalCovidDeaths,
          NumVentilatorsInFacility: queryObj.NumVentilatorsInFacility
        })
      })
      .catch(err => console.log(err));


    await fetch(`http://localhost:8081/stateAvg/${this.state.state}`, {
        method: 'GET'
      })
      .then(res => res.json())
      .then(queries => {
        if (!queries) return;
        let queryObj = queries[0];
        this.setState({
          StateAvgOverallRating: queryObj.StateAvgOverallRating,
          StateAvgHealthInspRating: queryObj.StateAvgHealthInspRating,
          StateAvgStaffRating: queryObj.StateAvgStaffRating,
          StateAvgQMRating: queryObj.StateAvgQMRating,
          StateAvgAverageHrsPerResPerDay: queryObj.StateAvgAverageHrsPerResPerDay,
          StateAvgReportedIncidents: queryObj.StateAvgReportedIncidents,
          StateAvgComplaints: queryObj.StateAvgComplaints,
          StateAvgNumFines: queryObj.StateAvgNumFines,
          StateAvgNumPenalties: queryObj.StateAvgNumPenalties,
          StateAvgCovidDeaths: queryObj.StateAvgCovidDeaths,
          StateAvgVentilatorsInFacility: queryObj.StateAvgVentilatorsInFacility
        })
      })
      .catch(err => console.log(err));

    await fetch(`http://localhost:8081/overallAvg`, {
        method: 'GET'
      })
      .then(res => res.json())
      .then(queries => {
        if (!queries) return;
        let queryObj = queries[0];
        this.setState({
          OverallAvgOverallRating: queryObj.OverallAvgOverallRating,
          OverallAvgHealthInspRating: queryObj.OverallAvgHealthInspRating,
          OverallAvgStaffRating: queryObj.OverallAvgStaffRating,
          OverallAvgQMRating: queryObj.OverallAvgQMRating,
          OverallAvgAverageHrsPerResPerDay: queryObj.OverallAvgAverageHrsPerResPerDay,
          OverallAvgReportedIncidents: queryObj.OverallAvgReportedIncidents,
          OverallAvgComplaints: queryObj.OverallAvgComplaints,
          OverallAvgNumFines: queryObj.OverallAvgNumFines,
          OverallAvgNumPenalties: queryObj.OverallAvgNumPenalties,
          OverallAvgCovidDeaths: queryObj.OverallAvgCovidDeaths,
          OverallAvgVentilatorsInFacility: queryObj.OverallAvgVentilatorsInFacility
        })
      })
      .catch(err => console.log(err));

    await fetch(`http://localhost:8081/rank/${this.state.fpn}/${this.state.state}`, {
        method: 'GET'
      })
      .then(res => res.json())
      .then(queries => {
        if (!queries) return;
        let queryObj = queries[0];
        this.setState({
          StateRank: queryObj.StateRank,
          CountFPNs: queryObj.CountFPNs,
          OverallRank: queryObj.OverallRank
        })
        fetch(`http://localhost:8081/similar/${this.state.fpn}/${this.state.latitude}/${this.state.longitude}/${this.state.state}/${this.state.StateRank}`, {
            method: 'GET'
          })
          .then(res => res.json())
          .then(queries => {
            if (!queries) return;
            let queryDivs = queries.map((genreObj, i) =>
              <SimilarsRow
                key={genreObj.FPN}
                id={genreObj.FPN}
                state={genreObj.State}
                name={genreObj.Name}
                latitude={genreObj.Latitude}
                longitude={genreObj.Longitude}
                onProfileChange={this.onProfileChange}
              />
            );
            this.setState({
              simFPNs: queryDivs
            })
          })
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
  }

  componentDidMount() {
    if (this.props.location) {
      if (this.props.location.state) {
        if (this.props.location.state.name) {
          this.setState({
            name: this.props.location.state.name
          })
        }
        if (this.props.location.state.latitude) {
          this.setState({
            latitude: this.props.location.state.latitude
          })
        }
        if (this.props.location.state.longitude) {
          this.setState({
            longitude: this.props.location.state.longitude
          })
        }
        if (this.props.location.state.state) {
          this.setState({
            state: this.props.location.state.state
          })
        }
        if (this.props.location.state.id) {
          this.setState({
            fpn: this.props.location.state.id
          })
        }
      }
    }

    // get all individual nursing home info from FPN selected
    fetch(`http://localhost:8081/profile/${this.props.location.state.id}`, {
        method: 'GET'
      })
      .then(res => res.json())
      .then(queries => {
        if (!queries) return;
        let queryObj = queries[0];
        this.setState({
          ProviderName: queryObj.ProviderName,
          Address: queryObj.Address,
          City: queryObj.City,
          Zip: queryObj.Zip,
          Phone: queryObj.Phone,
          OwnershipType: queryObj.OwnershipType,
          ProviderType: queryObj.ProviderType,
          NumberOfAllBeds: queryObj.NumberOfAllBeds,
          TotalNumberOfOccupiedBeds: queryObj.TotalNumberOfOccupiedBeds,
          AveResidentsPerDay: queryObj.AveResidentsPerDay,
          OverallRating: queryObj.OverallRating,
          HealthInspectionRating: queryObj.HealthInspectionRating,
          StaffingRating: queryObj.StaffingRating,
          QMRating: queryObj.QMRating,
          TotalWeightedHealthSurveyScore: queryObj.TotalWeightedHealthSurveyScore,
          NumReportedIncidents: queryObj.NumReportedIncidents,
          NumSubstantiatedComplaints: queryObj.NumSubstantiatedComplaints,
          NumFines: queryObj.NumFines,
          NumPaymentDenials: queryObj.NumPaymentDenials,
          NumPenalties: queryObj.NumPenalties,
          ResidentsTotalCovidDeaths: queryObj.ResidentsTotalCovidDeaths,
          NumVentilatorsInFacility: queryObj.NumVentilatorsInFacility
        })
      })
      .catch(err => console.log(err));


    fetch(`http://localhost:8081/hasredflag/${this.props.location.state.id}`, {
      method: 'GET'
    })
      .then(res => res.json()) 
      .then(queries => {
        if (!queries) return;
        console.log(queries);
        let queryObj = queries[0];    
        this.setState({
          Flag: queryObj.flag,
          flagColor: (queryObj.flag=='true' ? "red" : "black")
        })
      })
      .catch(err => console.log(err));	


      fetch(`http://localhost:8081/redflag/${this.props.location.state.id}`, {
        method: 'GET'
      })
        .then(res => res.json()) 
        .then(queries => {
          if (!queries) return;
          console.log(queries);
          let queryObj = queries[0];    
          this.setState({
            flagType: queryObj.flag,
            flagMessage: (queryObj.flag=='other_flag' ? 'This property is above the 95th percentile for substantiated complaints, fines, or reported incidents' : 
            (queryObj.flag=='covid_flag' ? 'This property does not submit Covid-19 data, has had a recent Covid-19 outbreak, or does not have adequate PPE supplies' : 
            (queryObj=='both') ? 'This property has a Covid-19 red flag (does not submit Covid-19 data, has had a recent Covid-19 outbreak, or does not have adequate PPE supplies) and has some other red flag (this property is above the 95th percentile for substantiated complaints, fines, or reported incidents)' : 'This property does not have red flags'))
          })
        })
        .catch(err => console.log(err));	

    fetch(`http://localhost:8081/stateAvg/${this.props.location.state.state}`, {
        method: 'GET'
      })
      .then(res => res.json())
      .then(queries => {
        if (!queries) return;
        let queryObj = queries[0];
        this.setState({
          StateAvgOverallRating: queryObj.StateAvgOverallRating,
          StateAvgHealthInspRating: queryObj.StateAvgHealthInspRating,
          StateAvgStaffRating: queryObj.StateAvgStaffRating,
          StateAvgQMRating: queryObj.StateAvgQMRating,
          StateAvgAverageHrsPerResPerDay: queryObj.StateAvgAverageHrsPerResPerDay,
          StateAvgReportedIncidents: queryObj.StateAvgReportedIncidents,
          StateAvgComplaints: queryObj.StateAvgComplaints,
          StateAvgNumFines: queryObj.StateAvgNumFines,
          StateAvgNumPenalties: queryObj.StateAvgNumPenalties,
          StateAvgCovidDeaths: queryObj.StateAvgCovidDeaths,
          StateAvgVentilatorsInFacility: queryObj.StateAvgVentilatorsInFacility
        })
      })
      .catch(err => console.log(err));

    fetch(`http://localhost:8081/overallAvg`, {
        method: 'GET'
      })
      .then(res => res.json())
      .then(queries => {
        if (!queries) return;
        let queryObj = queries[0];
        this.setState({
          OverallAvgOverallRating: queryObj.OverallAvgOverallRating,
          OverallAvgHealthInspRating: queryObj.OverallAvgHealthInspRating,
          OverallAvgStaffRating: queryObj.OverallAvgStaffRating,
          OverallAvgQMRating: queryObj.OverallAvgQMRating,
          OverallAvgAverageHrsPerResPerDay: queryObj.OverallAvgAverageHrsPerResPerDay,
          OverallAvgReportedIncidents: queryObj.OverallAvgReportedIncidents,
          OverallAvgComplaints: queryObj.OverallAvgComplaints,
          OverallAvgNumFines: queryObj.OverallAvgNumFines,
          OverallAvgNumPenalties: queryObj.OverallAvgNumPenalties,
          OverallAvgCovidDeaths: queryObj.OverallAvgCovidDeaths,
          OverallAvgVentilatorsInFacility: queryObj.OverallAvgVentilatorsInFacility
        })
      })
      .catch(err => console.log(err));

    fetch(`http://localhost:8081/rank/${this.props.location.state.id}/${this.props.location.state.state}`, {
        method: 'GET'
      })
      .then(res => res.json())
      .then(queries => {
        if (!queries) return;
        let queryObj = queries[0];
        this.setState({
          StateRank: queryObj.StateRank,
          CountFPNs: queryObj.CountFPNs,
          OverallRank: queryObj.OverallRank
        })
        fetch(`http://localhost:8081/similar/${this.props.location.state.id}/${this.props.location.state.latitude}/${this.props.location.state.longitude}/${this.props.location.state.state}/${this.state.StateRank}`, {
            method: 'GET'
          })
          .then(res => res.json())
          .then(queries => {
            if (!queries) return;
            let queryDivs = queries.map((genreObj, i) =>
              <SimilarsRow
                key={genreObj.FPN}
                id={genreObj.FPN}
                state={genreObj.State}
                name={genreObj.Name}
                latitude={genreObj.Latitude}
                longitude={genreObj.Longitude}
                onProfileChange={this.onProfileChange}
              />
            );
            this.setState({
              simFPNs: queryDivs
            })
          })
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div className="profile-page">
        <PageNavbar selected={this.state.ProviderName} active="profile"/>
        <div className='profile-page-card'>
          <div className='top-row'>
            <div className='profile-info'>
              <h1>{this.state.ProviderName}</h1>
              <div>
              <Popover content={<h1>Popover!</h1>} position={Position.RIGHT}>
                  <Tooltip content={this.state.flagMessage} position={Position.RIGHT}>
                    <Icon icon="flag" iconSize={20} color={this.state.flagColor}/>
                  </Tooltip>
              </Popover>
                {/* <Icon icon="flag" iconSize={20} color={this.state.flagColor}/> */}
                <p>Address: {this.state.Address}, {this.state.City}, {this.state.state}, {this.state.Zip}</p>
                <p>Phone Number: {this.state.Phone}</p>
                <p>Ownership Type: {this.state.OwnershipType} </p>
                <p>Provider Type: {this.state.ProviderType} </p>
                <p>Occupied Beds (as of 11/1): {this.state.TotalNumberOfOccupiedBeds}/{this.state.NumberOfAllBeds}</p>
                <p>Average # Residents Per Day: {this.state.AveResidentsPerDay}</p>
                <p>State Rank: {this.state.StateRank}/{this.state.CountFPNs}</p>
                <p>Overall Rank: {this.state.OverallRank}/15,342</p>
              </div>
            </div>
            <div className='static-map-container'>
              {(this.state.latitude !== "" && this.state.longitude !== "") ||
                (this.state.latitude !== "0.0" && this.state.longitude !== "0.0")
                  ?
                    <ProfileMap
                      name={this.state.name}
                      latitude={this.state.latitude}
                      longitude={this.state.longitude}
                    />
                  : ""}
            </div>
          </div>
          <div className='middle-row'>
            <Card className='ratings-card'>
              <h2>Stats</h2>
              <p>Residents Total Covid Deaths #: {this.state.ResidentsTotalCovidDeaths}</p>
              <p>Ventilators In Facility #: {this.state.NumVentilatorsInFacility}</p>
              <p>Overall Rating: {this.state.OverallRating}</p>
              <p>Health Inspection Rating: {this.state.HealthInspectionRating} </p>
              <p>Staffing Rating: {this.state.StaffingRating}</p>
              <p>Quality Measure Rating: {this.state.QMRating}</p>
              <p>Reported Incidents #: {this.state.NumReportedIncidents}</p>
              <p>Substantiated Complaints #: {this.state.NumSubstantiatedComplaints}</p>
              <p>Fines #: {this.state.NumFines}</p>
              <p>Penalties #: {this.state.NumPenalties}</p>
            </Card>
            <Card className='hours-card'>
              <h2>State Averages </h2>
              <p>{this.state.state} Covid Deaths #: {this.state.StateAvgCovidDeaths}</p>
              <p>{this.state.state} Ventilators #: {this.state.StateAvgVentilatorsInFacility}</p>
              <p>{this.state.state} Overall Rating: {this.state.StateAvgOverallRating}</p>
              <p>{this.state.state} Health Inspection Rating: {this.state.StateAvgHealthInspRating} </p>
              <p>{this.state.state} Staffing Rating: {this.state.StateAvgStaffRating}</p>
              <p>{this.state.state} Quality Measure Rating: {this.state.StateAvgQMRating}</p>
              <p>{this.state.state} Reported Incidents #: {this.state.StateAvgReportedIncidents}</p>
              <p>{this.state.state} Substantiated Complaints #: {this.state.StateAvgComplaints}</p>
              <p>{this.state.state} Fines #: {this.state.StateAvgNumFines}</p>
              <p>{this.state.state} Penalties #: {this.state.StateAvgNumPenalties}</p>
            </Card>
            <Card className='others-card'>
              <h2>Overall Averages </h2>
              <p>Covid Deaths #: {this.state.OverallAvgCovidDeaths}</p>
              <p>Ventilators #: {this.state.OverallAvgVentilatorsInFacility}</p>
              <p>Overall Rating: {this.state.OverallAvgOverallRating}</p>
              <p>Health Inspection Rating: {this.state.OverallAvgHealthInspRating} </p>
              <p>Staffing Rating: {this.state.OverallAvgStaffRating}</p>
              <p>Quality Measure Rating: {this.state.OverallAvgQMRating}</p>
              <p>Reported Incidents #: {this.state.OverallAvgReportedIncidents}</p>
              <p>Substantiated Complaints #: {this.state.OverallAvgComplaints}</p>
              <p>Fines #: {this.state.OverallAvgNumFines}</p>
              <p>Penalties #: {this.state.OverallAvgNumPenalties}</p>
            </Card>
          </div>
          <div className='bottom-row'>
            <Card className='additional-card'>
              <h2>Here are some similar nursing homes: </h2>
              <div className="results-container" id="results">
			    			{this.state.simFPNs}
			    		</div>
            </Card>
          </div>
        </div>
      </div>
    )
  }
}