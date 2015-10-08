import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
require('./LearnCard.scss');


@connect(state => ({
	queues: state.sets.queues
}))
export default class LearnCard extends Component {
	static propTypes = {
		sequence: PropTypes.object
	}

	// subscribe to the queues/trials state

	render() {
		const { sequence, queues } = this.props;
		return(
			<div className="card">
				<div className="card-header">
				    &nbsp;
				</div>
				<div className="card-block">
					<p className="card-text">{queues[0].id}</p>					
				</div>
			</div>
		);
	}
}

// <h4 className="card-title">Card title</h4>