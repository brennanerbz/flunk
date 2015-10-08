import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
require('./LearnCard.scss');

export default class LearnCard extends Component {
	static propTypes = {
		curr_seq: PropTypes.object
	}

	// subscribe to the queues/trials state

	render() {
		const { curr_seq, qs } = this.props;
		return(
			<div className="card">
				<div className="card-header">
				    &nbsp;
				</div>
				<div className="card-block">
					<p className="card-text">{"Seq mode:" + curr_seq.mode}</p>
					<p className="card-text">{"Queues:" + qs}</p>
				</div>
			</div>
		);
	}
}

// <h4 className="card-title">Card title</h4>