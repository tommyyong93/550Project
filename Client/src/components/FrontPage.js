import React from 'react';
import '../style/FrontPage.css';
import PageNavbar from './PageNavbar';
import {
  Redirect
} from "react-router-dom";
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
      query: event.target.value,
      redirect: false,
      searchResults: [],
      markers: []
    })
  }

  onFormSubmit = async (event) => {
    event.preventDefault();
    if (this.state.query === "") return
    await fetch(`http://localhost:8081/search/${this.state.query}`, {
        method: 'GET'
      })
      .then(res => res.json())
      .then(queries => {
        if (!queries) return;
        var length = queries.length;
        var queriesArray = [];
        var markersArray = [];
        for (var i = 0; i < length; i++) {
          queriesArray[i] = {
            key: i + queries[i].ProviderName,
            name: queries[i].ProviderName,
            state: queries[i].State,
            id: queries[i].FPN,
            latitude: queries[i].Latitude,
            longitude: queries[i].Longitude,
            index: i + 1
          }
          if (i <= 100) {
            if (queries[i].Latitude === 0.0) continue;
            if (queries[i].Longitude === 0.0) continue;
            markersArray[i] = {
              key: queries[i].ProviderName,
              lat: queries[i].Latitude,
              long: queries[i].Longitude,
              title: queries[i].ProviderName
            }
          }
        }
        this.setState({
          searchResults: queriesArray,
          markers: markersArray
        })
        this.setState({
          redirect: true
        })
      })
      .catch(err => console.log(err))
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
            <InputGroup placeholder="Enter a city, state (as abbreviation) or ZIP code" leftIcon="search" value={this.state.query} onChange={this.onInputChange}
              onSubmit={this.onFormSubmit}></InputGroup>
            {this.state.redirect ?
              <Redirect to={{
                pathname: '/search',
                state: { markersFromFrontPage: this.state.markers, searchResultsFromFrontPage : this.state.searchResults }
              }}
              /> : ""}
          </form>
        </div>
      </div>
    );
  }
}