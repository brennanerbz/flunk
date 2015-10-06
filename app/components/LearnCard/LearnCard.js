import React, { Component, PropTypes } from 'react';

export default class LearnCard extends Component {
	static propTypes = {
	}

	render() {
		return(
			<div className="card card-block">
			  <h4 className="card-title">Card title</h4>
			  <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
			  <a href="#" className="card-link">Card link</a>
			  <a href="#" className="card-link">Another link</a>
			</div>
		);
	}
}