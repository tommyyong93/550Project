import React from 'react';
import PageNavbar from './PageNavbar';
import USAMap from "react-usa-map";
import '../style/StateStats.css';
import {
  Button,
  Classes,
  Dialog,
  Card,
} from "@blueprintjs/core";

export default class StateStats extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedState: "",
      showPopup: false
    };
  }

  mapHandler = (event) => {
    var state = event.target.dataset.name;
    this.setState({
      selectedState: state,
      showPopup: true
    })
  };

  handleClose = () => {
    this.setState({
      showPopup: false
    });
  }

  componentDidMount() {
    // Send an HTTP request to the server.
    fetch("http://localhost:8081/genres", {
      method: 'GET' // The type of HTTP request.
    })
      .then(res => res.json()) // Convert the response data to a JSON.
      .then(genreList => {
        if (!genreList) return;
        // Map each genreObj in genreList to an HTML element:
        // A button which triggers the showMovies function for each genre.
        let genreDivs = genreList.map((genreObj, i) =>
          <GenreButton id={"button-" + genreObj.genre} onClick={() => this.showMovies(genreObj.genre)} genre={genreObj.genre} />
        );

        // Set the state of the genres list to the value returned by the HTTP response from the server.
        this.setState({
          genres: genreDivs
        })
      })
      .catch(err => console.log(err))	// Print the error if there is one.
  }

  render() {
    return (
      <div className="StateStats">
        <PageNavbar active="state"/>
        <div className='search-container-block'>
          <Card className='state-results-container'>{this.state.selectedState ? `Here are the top nursing homes in ${this.state.selectedState}` : "Click on a state to learn more!"}</Card>
          <div className="map-container">
            <div className='country-row'>
              <Card className='country-stats-card'>
                <h1>Country Stats</h1>
                <div className='stats-country'>
                  <div className='single-stat'>
                    <p>Total Number of Nursing Homes</p>
                    <p>15000</p>
                  </div>
                  <div className='single-stat'>
                    <p>Total Number of Fines in Nursing Homes</p>
                    <p>15000</p>
                  </div>
                  <div className='single-stat'>
                    <p>Total Covid Admission in Nursing Homes</p>
                    <p>15000</p>
                  </div>
                  <div className='single-stat'>
                    <p>Total Number of Deaths from COVID-19 in Nursing Homes</p>
                    <p>15000</p>
                  </div>
                </div>
              </Card>
            </div>
            <div className='USA-Map'>
              <USAMap
                onClick={this.mapHandler} defaultFill="#DCDCDC"/>
            </div>
            <Dialog
              onClose={this.handleClose}
              title= {`You selected ${this.state.selectedState}`}
              isOpen={this.state.showPopup}
            >
              <div className={Classes.DIALOG_BODY}>
                <p>
                  Overall Rating: 
                </p>
                <p>
                  Occupancy Rate:
                </p>
                <p>
                  Resident Case Rate:
                </p>
                <p>
                  COVID Mortality Rate:
                </p>
                <p>
                  COVID Reporting Rate:
                </p>
                <p>
                  COVID Testing Rate:
                </p>
                <p>
                  Staffing Rate:
                </p>
                <p>
                  Percentage of Homes with COVID Cases:
                </p>
              </div>
              <div className={Classes.DIALOG_FOOTER}>
                <div className={Classes.DIALOG_FOOTER_ACTIONS}>
                  <Button onClick={this.handleClose}>Close</Button>
                </div>
              </div>
            </Dialog>
          </div>
        </div>
			</div>
    );
  }
}