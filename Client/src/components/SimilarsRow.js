import React from 'react';
import '../style/NursingHomeRow.css';

export default class SimilarsRow extends React.Component {

  changeProfile = (name, state, id, lat, long) => {
    this.props.onProfileChange(name, state, id, lat, long)
  }

  changeProfile = (name, state, id, lat, long) => {
    if (lat === 0.0 || long === 0.0) return;
    this.props.onProfileChange(name, state, id, lat, long)
  }

  render() {
    return (
      <div className="similarFPNs">
				<div className="FPNinfo" onClick={()=>this.changeProfile(this.props.name,this.props.state,this.props.id,this.props.latitude,this.props.longitude)}>{this.props.name}</div>
			</div>
    );
  }
}