import React, { Component, PropTypes } from 'react';
require('./LearnCard.scss');

export default class LearnCard extends Component {
	static propTypes = {
	}

	render() {
		return(
			<div className="card">
				<div className="card-header">
				    &nbsp;
				</div>
				<div className="card-block">
				<p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
				</div>
			</div>
		);
	}
}

// <h4 className="card-title">Card title</h4>