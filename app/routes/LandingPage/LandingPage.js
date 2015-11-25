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
		const g_icon = require('../../assets/google_logo.png'),
			  f_icon = require('../../assets/facebook_logo.png')
		return(		
			<div className="landing_page">
				<div className="landing_page_container">
					<div className="top">
						<div className="message">
							<h1>A simple tool to study anything.</h1>
							<p>The easiest way to learn is finally here.<br/> Meet the world's most effective study tool.</p>
							<div className="sign_up_group">
								<button className="google_button button">
									<img className="icon" 
										 src={g_icon}/>
									Sign up with Google
								</button>
								<button className="facebook_button button">
									<img className="icon"
										 src={f_icon}/>
									Sign up with Facebook
								</button>
							</div>
						</div>
						<div className="phone">
							Phone
						</div>
					</div>
					<div className="bottom">
						<div className="features row">
							<div className="col-md-4 feature_col">
							1
							</div>
							<div className="col-md-4 feature_col top-to-bottom">
							2
							</div>
							<div className="col-md-4 feature_col">
							3
							</div>
						</div>
					</div>
				</div>
				<div className="footer">
				</div>
			</div>
		);
	}
}