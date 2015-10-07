import React, { Component, PropTypes } from 'react';
require('./LearnCard.scss');

export default class LearnCard extends Component {
	static propTypes = {
		sequences: PropTypes.array
	}

	render() {
		const { sequences } = this.props;
		return(
			<div className="card">
				<div className="card-header">
				    &nbsp;
				</div>
				<div className="card-block">
				{ sequences.map(sequence => <p className="card-text" key={sequence.id}>{sequence.mode}</p>)}
				</div>
			</div>
		);
	}
}

// <h4 className="card-title">Card title</h4>