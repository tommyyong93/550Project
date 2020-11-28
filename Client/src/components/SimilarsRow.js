import React from 'react';
import '../style/NursingHomeRow.css';
import {
  Link
} from 'react-router-dom'

export default class SimilarsRow extends React.Component {

  constructor(props) {
    super(props);
  }

  changeProfile = (name, state, id, lat, long) => {
    if (lat === 0.0 || long === 0.0) return;
    this.props.onProfileChange(name, state, id, lat, long)
  }

  render() {
    return (
      <div className="nursinghome-row">
        <div className="nursinghome-name">
          <span onClick={() => this.changeProfile(this.props.name,this.props.state,this.props.id,this.props.latitude,this.props.longitude)}>{this.props.name}</span>
        </div>
      </div>
    );
  }
}