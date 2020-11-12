import React from 'react';
import PageNavbar from './PageNavbar'
import {
  Card,
} from "@blueprintjs/core";
import '../style/NursingHomeProfile.css';

export default class NursingHomeProfile extends React.Component {

  constructor(props) {
    super(props)
    this.state = {

    }
  }

  render() {
    return (
      <div className="profile-page">
        <PageNavbar/>
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
              <h3>Put static map here</h3>
            </div>
          </div>
          <div className='bottom-row'>
            <Card className='ratings-card'>
              Ratings...
            </Card>
            <Card className='hours-card'>
              Staff Hours...
            </Card>
            <Card className='others-card'>
              Other...
            </Card>
          </div>
        </div>
      </div>
    )
  }
}