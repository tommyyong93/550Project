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
      latitide: 32.2226,
      longitude: -110.9747,
    }
  }

  componentDidMount() {
    document.title = this.state.name
  }

  render() {
    return (
      <div className="profile-page">
        <PageNavbar selected={this.state.name}/>
        <div className='profile-page-card'>
          <div className='top-row'>
            <div className='profile-info'>
              <h1>Example Nursing Home</h1>
              <div>
                <p>Adress: 1234 Road, Austin, TX, 12356</p>
                <p>Phone Number: 123-456-789</p>
                <p>Ownership Type: </p>
                <p>Provider Type: </p>
                <p>Certified Beds: </p>
                <p>Total Number of Occupied Beds: </p>
                <p>Abuse Icon: </p>
                <p>Etc...</p>
              </div>
            </div>
            <div className='static-map-container'>
              <ProfileMap
                name={this.state.name}
                latitude={this.state.latitude ? this.state.latitude : 39.9526}
                longitude={this.state.longitude ? this.state.longitude : -75.1652}
              />
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