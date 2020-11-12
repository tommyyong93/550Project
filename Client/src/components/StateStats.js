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


  render() {
    return (
      <div className="StateStats">
        <PageNavbar/>
        <div className='search-container-block'>
          <Card className='state-results-container'>{this.state.selectedState ? `Here are the top nursing homes in ${this.state.selectedState}` : "Click on a state to learn more"}</Card>
          <div className="map-container">
            <div className='USA-Map'>
              <USAMap onClick={this.mapHandler} defaultFill="#DCDCDC"/>
            </div>
            <Dialog
              onClose={this.handleClose}
              title= {`You selected ${this.state.selectedState}`}
              isOpen={this.state.showPopup}
            >
              <div className={Classes.DIALOG_BODY}>
                <p>
                  Number of Nursing Homes...
                </p>
                <p>
                  Average Number of Beds...
                </p>
                <p>
                  Average Occupancy..
                </p>
                <p>
                  Average Rating...
                </p>
                <p>
                  Here are some top rated Nursing Homes...
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