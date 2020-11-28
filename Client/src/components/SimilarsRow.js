import React from 'react';
import '../style/NursingHomeRow.css';
import {
  Link
} from 'react-router-dom'

export default class SimilarsRow extends React.Component {

  changeProfile = (name, state, id, lat, long) => {
    this.props.onProfileChange(name, state, id, lat, long)

  }

  render() {
    return (
      <div className="similarFPNs">
        <Link to={{
          pathname: `/profile/${this.props.id}`,
          state: {
            name: this.props.name,
            state: this.props.state,
            id: this.props.id,
            latitude:this.props.latitude,
            longitude: this.props.longitude
          }
        }}>
          <span className="FPNinfo" onClick={()=>this.changeProfile(this.props.name,this.props.state,this.props.id,this.props.latitude,this.props.longitude)}>{this.props.name}</span>
        </Link>

			</div>
    );
  }
}