import React from 'react';
import '../style/NursingHomeRow.css';
import {
  Link
} from 'react-router-dom'

export default class StateRow extends React.Component {

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
      </div>
    </div>)
  }
}