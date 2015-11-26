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
			  group = require('../../assets/group.png'),
			  iphone = require('../../assets/acuitIphone.png');
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
							<img className=""
								 src={iphone}/>
						</div>
					</div>
					<div className="bottom">
						<div className="features row">
							<div className=" feature_col">
								<div className="feature_header">
									<img className="icon"
										 src={library}/>
									Create
								</div>
								<div className="feature_content">
									Easily create a study set with the exact content you need to know or search to see if it’s already done.
								</div>
							</div>
							<div className=" feature_col top-to-bottom">
								<div className="feature_header">
									<img className="icon"
										 src={edit}/>
									Learn
								</div>
								<div className="feature_content">
									Have fast, effective study sessions with adaptive flashcards. The last study tool you’ll ever need.
								</div>
							</div>
							<div className=" feature_col">
								<div className="feature_header">
									<img className="icon"
										 src={group}/>
									Share
								</div>
								<div className="feature_content">
									Send a study set or concept to your friends with one link— even if they don’t have an account.
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