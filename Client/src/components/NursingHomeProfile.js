import React from 'react';
import PageNavbar from './PageNavbar'
import ProfileMap from './ProfileMap'
import {
  Card,
} from "@blueprintjs/core";
import '../style/NursingHomeProfile.css';

export default class NursingHomeProfile extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      name: "Example nursing home",
      latitude: "",
      longitude: "",
      state: "",
      submittedData: "",
      passedQA: "",
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
                <p>Ownership Type: </p>
                <p>Provider Type: </p>
                <p>Certified Beds: </p>
                <p>Total Number of Occupied Beds: </p>
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