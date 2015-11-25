import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
require('./LandingPage.scss')

export default class LandingPage extends Component {
	constructor(props, context) {
		super(props, context)
	}

	static propTypes = {
		
	}

	render() {
		return(
			<div className="landing_page">
				<div className="landing_page_container">
					<h1> Landing Page </h1>
					<h1> Landing Page </h1>
					<h1> Landing Page </h1>
					<h1> Landing Page </h1>
					<h1> Landing Page </h1>
					<h1> Landing Page </h1>
					<h1> Landing Page </h1>
					<h1> Landing Page </h1>
					<h1> Landing Page </h1>
					<h1> Landing Page </h1>
				</div>
			</div>
		);
	}
}