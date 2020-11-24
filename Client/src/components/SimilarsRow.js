import React from 'react';
import '../style/NursingHomeRow.css';
import {
  Link
} from 'react-router-dom'

export default class SimilarsRow extends React.Component {

    constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="similarFPNs">
				<div className="FPNinfo">{this.props.Name}: {this.props.FPN}, StateRank: {this.props.StateRank} </div>
			</div>
		);
	}
}