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
			  f_icon = require('../../assets/facebook_logo.png'),
			  library = require('../../assets/library-plus.png'),
			  edit = require('../../assets/edit.png'),
			  upload = require('../../assets/upload.png'),
			  iphone = require('../../assets/acuitIphone.png');
		return(		
			<div className="landing_page">
				<div className="landing_page_container">
					<div className="top">
						<div className="message">
							<h1 className="">Outsmarting
								<span className="message_typed"> school, </span>together</h1>
							<p>Flunk is a smart learning tool that makes <br/> learning simpler, more pleasant, and more productive.</p>
							<div className="sign_up_group">
								<button className="button primary">Sign Up</button>
							</div>
						</div>
						<div className="phone">
							<img className=""
								 src={iphone}/>
						</div>
					</div>
					<div className="bottom">
						<div className="features row">
							<div className=" feature_col">
								<div className="feature_header">
									<img className="icon"
										 src={upload}/>
									Upload
								</div>
								<div className="feature_content">
									Flunk can instantly transform anything you upload into a study set. 
								</div>
							</div>
							<div className=" feature_col top-to-bottom">
								<div className="feature_header">
									<img className="icon"
										 src={library}/>
									Create
								</div>
								<div className="feature_content">
									Easily enter the material you need to know. Creating a study set is easy. 
								</div>
							</div>
							<div className=" feature_col">
								<div className="feature_header">
									<img className="icon"
										 src={edit}/>
									Learn
								</div>
								<div className="feature_content">
									Learn with assistive hints, examples and step-by-step feedback.
								</div>
							</div>
						</div>
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