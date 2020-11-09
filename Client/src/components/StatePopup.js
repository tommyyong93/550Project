import React from 'react';

export default class Popup extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  render() {
    return (
      <div>
        {
          this.props.visbility === true ?
            <div>
              <div onClick={this.props.close}>Click me to close</div>
              <div>You clicked on {this.props.stateUS}! Here are some stats:</div>
              <div>Number of Nursing Homes...</div>
              <div>Average Number of Beds...</div>
              <div>Average Occupancy...</div>
              <div>Average Rating...</div>
              <div>Here are some top rated Nursing Homes...</div>
            </div>
          :
          <div></div>
        }
      </div>
    )
  }
}