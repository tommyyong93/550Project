import React from 'react';
import PageNavbar from './PageNavbar';
import USAMap from "react-usa-map";
import '../style/StateStats.css';
import {
  Button,
  Classes,
  Dialog,
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
      <div className="BestGenres">
        <PageNavbar active="bestgenres" />
        <br/>
        <div className="title-container">
          <div className="jumbotron">
            <div className="h5">Stats by State</div>
          </div>
          <br></br>
          <div className="map-container">
            <div>
              <USAMap onClick={this.mapHandler} defaultFill="#00008B"/>
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