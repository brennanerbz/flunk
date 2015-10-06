import React, { Component, PropTypes } from 'react';

export default class LearnCard extends Component {
	static propTypes = {
	}

	render() {
		return(
			<div class="card card-block">
			  <h4 class="card-title">Card title</h4>
			  <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
			  <a href="#" class="card-link">Card link</a>
			  <a href="#" class="card-link">Another link</a>
			</div>
		);
	}
}