import React from 'react';
import PageNavbar from './PageNavbar'
import {
  Card,
} from "@blueprintjs/core";
import '../style/NursingHomeProfile.css';

export default class NursingHomeProfile extends React.Component {

  render() {
    return (
      <div className="profile-page">
        <PageNavbar/>
        <div className='profile-page-card'>


        </div>
      </div>
    )
  }
}