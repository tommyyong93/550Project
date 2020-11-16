import React from 'react';
import '../style/NursingHomeRow.css';
import {
  Link
} from 'react-router-dom'

export default class NursingHomeRow extends React.Component {

  changePosition = (lat, long) => {
    if (lat === 0.0 || long === 0.0) return;
    this.props.onPositionChange(lat, long)
  }

  render() {
    return (<div className="nursinghome-row">
      <div className="nursinghome-name">
        <Link to={{
          pathname: `/profile/${this.props.id}`,
          state: {
            name: this.props.name,
            state: this.props.state,
            id: this.props.id,
            latitude:this.props.latitude,
            longitude: this.props.longitude
          }
        }}>{this.props.index}. {this.props.name}, {this.props.state}</Link>
        <span className='destinationClick' onClick={() => this.changePosition(this.props.latitude,this.props.longitude)}>{this.props.latitude === 0.0 && this.props.longitude === 0.0 ? "" : " >"}</span>
      </div>
    </div>)
  }
}