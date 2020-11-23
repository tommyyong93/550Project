import React from 'react';
import PageNavbar from './PageNavbar'
import ProfileMap from './ProfileMap'
import {
  Card,
} from "@blueprintjs/core";
import '../style/NursingHomeProfile.css';
import NursingHomeRow from './NursingHomeRow';

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
      OverallRank: ""
    }
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
        console.log(queries);
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


    fetch(`http://localhost:8081/stateAvg/${this.props.location.state.state}`, {
      method: 'GET'
    })
      .then(res => res.json()) 
      .then(queries => {
        if (!queries) return;
        console.log(queries);
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
        console.log(queries);
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
        console.log(queries);
        let queryObj = queries[0];    
        this.setState({
          StateRank: queryObj.StateRank,
          OverallRank: queryObj.OverallRank
        })
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div className="profile-page">
        <PageNavbar selected={this.state.name} active="profile"/>
        <div className='profile-page-card'>
          <div className='top-row'>
            <div className='profile-info'>
              <h1>{this.state.name}</h1>
              <div>
                <p>Address: {this.state.Address}, {this.state.City}, {this.state.state}, {this.state.Zip}</p>
                <p>Phone Number: {this.state.Phone}</p>
                <p>Ownership Type: {this.state.OwnershipType} </p>
                <p>Provider Type: {this.state.ProviderType} </p>
                <p>Occupied Beds (as of 11/1): {this.state.TotalNumberOfOccupiedBeds}/{this.state.NumberOfAllBeds}</p>
                <p>Average # Residents Per Day: {this.state.AveResidentsPerDay}</p>
                <p>State Rank: {this.state.StateRank}</p>
                <p>Overall Rank: {this.state.OverallRank}</p>
              </div>
            </div>
            <div className='static-map-container'>
              {this.state.latitude !== "" && this.state.longitude !== "" ?
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
              <p>{this.state.state} Avg Covid Deaths #: {this.state.StateAvgCovidDeaths}</p>
              <p>{this.state.state} Avg Ventilators #: {this.state.StateAvgVentilatorsInFacility}</p>
              <p>{this.state.state} Avg Overall Rating: {this.state.StateAvgOverallRating}</p>
              <p>{this.state.state} Avg Health Inspection Rating: {this.state.StateAvgHealthInspRating} </p>
              <p>{this.state.state} Avg Staffing Rating: {this.state.StateAvgStaffRating}</p>
              <p>{this.state.state} Avg Quality Measure Rating: {this.state.StateAvgQMRating}</p>
              <p>{this.state.state} Avg Reported Incidents #: {this.state.StateAvgReportedIncidents}</p>
              <p>{this.state.state} Avg Substantiated Complaints #: {this.state.StateAvgComplaints}</p>
              <p>{this.state.state} Avg Fines #: {this.state.StateAvgNumFines}</p>
              <p>{this.state.state} Avg Penalties #: {this.state.StateAvgNumPenalties}</p>
            </Card>
            <Card className='others-card'>
              <h2>Overall Averages </h2>
              <p>Avg Covid Deaths #: {this.state.OverallAvgCovidDeaths}</p>
              <p>Avg Ventilators #: {this.state.OverallAvgVentilatorsInFacility}</p>
              <p>Avg Overall Rating: {this.state.OverallAvgOverallRating}</p>
              <p>Avg Health Inspection Rating: {this.state.OverallAvgHealthInspRating} </p>
              <p>Avg Staffing Rating: {this.state.OverallAvgStaffRating}</p>
              <p>Avg Quality Measure Rating: {this.state.OverallAvgQMRating}</p>
              <p>Avg Reported Incidents #: {this.state.OverallAvgReportedIncidents}</p>
              <p>Avg Substantiated Complaints #: {this.state.OverallAvgComplaints}</p>
              <p>Avg Fines #: {this.state.OverallAvgNumFines}</p>
              <p>Avg Penalties #: {this.state.OverallAvgNumPenalties}</p>
            </Card>
          </div>
          <div className='bottom-row'>
            <Card className='additional-card'>
              <h2>Here are some similar nursing homes</h2>
              <p>Nursing home 1</p>
              <p>Nursing home 1</p>
              <p>Nursing home 1</p>
            </Card>
          </div>
        </div>
      </div>
    )
  }
}