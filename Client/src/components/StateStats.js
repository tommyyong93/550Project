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
    fetch(`http://localhost:8081/stateStats/${this.props.state.selectedState}`, {
      method: 'GET'
    })
  }



  mapHandler = (event) => {
    var state = event.target.dataset.name;
    this.setState({
      selectedState: state,
      showPopup: true
    })

    /* Add fetch statement here*/
    
  };

  handleClose = () => {
    this.setState({
      showPopup: false
    });
  }

 
  render() {
    return (
      <div className="StateStats">
        <PageNavbar active="state"/>
        <div className='search-container-block'>
          <Card className='state-results-container'>{this.state.selectedState ? `Here are the top nursing homes in ${this.state.selectedState}` : "Click on a state to learn more!"}</Card>
          <div className="map-container">
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
                  Percentage of Homes With COVID Cases:
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