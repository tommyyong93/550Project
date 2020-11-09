import React from 'react';
import '../style/FrontPage.css';
import PageNavbar from './PageNavbar';
import {
  InputGroup,
} from "@blueprintjs/core";


export default class FrontPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount() {

  }


  render() {
    return (
      <div className="FrontPage">
        <PageNavbar active="dashboard" />
        <br></br>
        <div className="title-container">
          <h1>Welcome to Find Your Nursing Home!</h1>
          <h5>We'll help you find a place you'll love.</h5>
        </div>
        <div className="search-container">
          <InputGroup placeholder="Enter a city, state or ZIP code" leftIcon="search"></InputGroup>
        </div>

      </div>
    );
  }
}