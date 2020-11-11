import React from 'react';
import '../style/FrontPage.css';
import PageNavbar from './PageNavbar';
import {
  InputGroup
} from "@blueprintjs/core";


export default class FrontPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: ""
    }
  }

  onInputChange = (event) => {
    this.setState({
      query: event.target.value
    })
  }

  onFormSubmit = (event) => {
    event.preventDefault();
    console.log(this.state.query)
  }


  render() {
    return (
      <div className="FrontPage">
        <PageNavbar active="dashboard" />
        <br></br>
        <div className="title-container">
          <h1>Welcome to Nurse Next Door!</h1>
          <h5>We'll help you find a nursing home that you'll love.</h5>
        </div>
        <div className="search-container">
          <form className='form' onSubmit={this.onFormSubmit}>
            <InputGroup placeholder="Enter a city, state or ZIP code" leftIcon="search" value={this.state.query} onChange={this.onInputChange}
              onSubmit={this.onFormSubmit}></InputGroup>
          </form>
        </div>
      </div>
    );
  }
}