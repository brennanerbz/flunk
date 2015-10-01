import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

let styles = {
	marginTop: "200px",
	marginLeft: "200px"
}

export default class LandingPage extends Component {
	constructor(props, context) {
		super(props, context)
	}

	static propTypes = {
		
	}

	render() {
		return(
			<div className={styles}>
				<h1>Hey, I'm the landing page.</h1>
				<h1>Hey, I'm the landing page.</h1>
				<h1>Hey, I'm the landing page.</h1>
				<h1>Hey, I'm the landing page.</h1>
				<Link to="/profile/">Profile</Link>
				<h1>Hey, I'm the landing page.</h1>
				<h1>Hey, I'm the landing page.</h1>
				<h1>Hey, I'm the landing page.</h1>
				<h1>Hey, I'm the landing page.</h1>
				<h1>Hey, I'm the landing page.</h1>

			</div>
		);
	}
}