import React, { Component, PropTypes } from 'react';
require('./LearnCard.scss');

export default class LearnCard extends Component {
	static propTypes = {
		sequence: PropTypes.object
	}

	render() {
		const { sequence } = this.props;
		return(
			<div className="card">
				<div className="card-header">
				    &nbsp;
				</div>
				<div className="card-block">
					<p className="card-text">{sequence.mode}</p>
				</div>
			</div>
		);
	}
}

// <h4 className="card-title">Card title</h4>