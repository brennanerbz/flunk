import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
require('./LandingPage.scss')
import SignUpForm from './SignUpForm';

export default class LandingPage extends Component {
	constructor(props, context) {
		super(props, context)
	}

	static propTypes = {
		
	}

	render() {
		const compose = require('../../assets/compose.png'),
			  upload = require('../../assets/upload.png'),
			  chat = require('../../assets/chat.png');
		return(		
			<div className="landing_page">
				<div className="landing_page_container">
					<div className="marketing_copy">
						<h1>Smart learning tools that let you study anything, for free.</h1>
						<ul className="copy_list">
							<li className="copy_item">
								<img className="big icon" src={upload}/>
								<div className="copy">
									<p className="header">Upload</p>
									<p className="text">Flunk can instantly transform anything you upload into a study set.</p>
								</div>
							</li>
							<li className="copy_item">
								<img className="big icon" src={compose}/>
								<div className="copy">
									<p className="header">Create</p>
									<p className="text">Easily enter the material you need to know. Creating a study set is easy.</p>
								</div>
							</li>
							<li className="copy_item">
								<img className="big icon" src={chat}/>
								<div className="copy">
									<p className="header">Learn</p>
									<p className="text">Learn with assistive hints, examples and step-by-step feedback.</p>
								</div>
							</li>
						</ul>
					</div>
					<div className="sign_up">
						<SignUpForm />
					</div>
				</div>
				<div className="footer">	
					<ul className="footer_links">
						<div className="left">
							<a className="">Students</a>
							<a className="">Teachers</a>
						</div>
						<div className="right">
							<a className="">Terms</a>
							<a className="">Privacy</a>
						</div>
					</ul>
				</div>
			</div>
		);
	}
}

// <button className="google_button button">
// 	<img className="icon" 
// 		 src={g_icon}/>
// 	Sign up with Google
// </button>
// <button className="facebook_button button">
// 	<img className="icon"
// 		 src={f_icon}/>
// 	Sign up with Facebook
// </button>