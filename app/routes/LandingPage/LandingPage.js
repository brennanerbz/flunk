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
		const library = require('../../assets/library-plus.png'),
			  edit = require('../../assets/edit.png'),
			  upload = require('../../assets/upload.png'),
			  iphone = require('../../assets/acuitIphone.png');
		return(		
			<div className="landing_page">
				<div className="landing_page_container">
					<div className="marketing_copy">
						<h1>A smart learning tool that makes learning simpler, more pleasant, and more productive.</h1>
						<ul className="copy_list">
							<li className="copy_item">
								Upload
							</li>
							<li className="copy_item">
								Create
							</li>
							<li className="copy_item">
								Learn
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