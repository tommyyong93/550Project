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
      name: "Example Nursing Home",
      latitude: "",
      longitude: "",
      state: "",
      OwnershipType: "",
      ProviderType: "",
      NumberOfAllBeds: "",
      TotalNumberOfOccupiedBeds: "",
      AveResidentsPerDay: "",
      submittedData: "",
      passedQA: "",
    }
  }

  componentDidMount() {
    // get all individual nursing home info from FPN selected
    fetch("http://localhost:8081/profile/" + this.props.FPN, {
        method: 'GET'
      })
      .then(res => res.json())
      .then(queries => {
        if (!queries) return;
        //console.log(queries);
        let queryObj = queries[0];
        this.setState({
          OwnershipType: queryObj.OwnershipType,
          ProviderType: queryObj.ProviderType,
          NumberOfAllBeds: queryObj.NumberOfAllBeds,
          TotalNumberOfOccupiedBeds: queryObj.TotalNumberOfOccupiedBeds
        })
      })
      .catch(err => console.log(err))

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
      }
    }
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
                <p>Lat: {this.state.latitude}</p>
                <p>Long: {this.state.longitude}</p>
                <p>State: {this.state.state}</p>
                <p>Phone Number: 123-456-789</p>
                <p>Ownership Type: {this.state.OwnershipType} </p>
                <p>Provider Type: {this.state.ProviderType} </p>
                <p>Certified Beds: {this.state.NumberOfAllBeds} </p>
                <p>Total Number of Occupied Beds: {this.state.TotalNumberOfOccupiedBeds} </p>
                <p>Abuse Icon: </p>
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
              <h2>Ratings...</h2>
              <p>Ownership Type: </p>
              <p>Provider Type: </p>
              <p>Certified Beds: </p>
              <p>Total Number of Occupied Beds: </p>
              <p>Abuse Icon: </p>
              <p>Etc...</p>
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