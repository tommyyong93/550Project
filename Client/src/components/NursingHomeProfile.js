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
      NumVentilatorsInFacility: ""
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
      .catch(err => console.log(err))	
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
              <p>Survey Score: {this.state.TotalWeightedHealthSurveyScore}</p>
              <p>Reported Incidents #: {this.state.NumReportedIncidents}</p>
              <p>Substantiated Complaints #: {this.state.NumSubstantiatedComplaints}</p>
              <p>Fines #: {this.state.NumFines}</p>
              <p>Payment Denials #: {this.state.NumPaymentDenials}</p>
              <p>Penalties #: {this.state.NumPenalties}</p>
            </Card>
            <Card className='hours-card'>
              <h2>Staff Hours...</h2>
              <p>Ownership Type: </p>
              <p>Provider Type: </p>
              <p>Certified Beds: </p>
              <p>Total Number of Occupied Beds: </p>
              <p>Abuse Icon: </p>
              <p>Etc...</p>
            </Card>
            <Card className='others-card'>
              <h2>Other...</h2>
              <p>Ownership Type: </p>
              <p>Provider Type: </p>
              <p>Certified Beds: </p>
              <p>Total Number of Occupied Beds: </p>
              <p>Abuse Icon: </p>
              <p>Etc...</p>
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