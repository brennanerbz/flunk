import React, { Component, PropTypes } from 'react';
require('./SignUpForm.scss');

export default class SignUpForm extends Component {
	static propTypes = {
	}

	render() {
		const g_icon = require('../../assets/google_logo.png'),
			  f_icon = require('../../assets/facebook_logo.png');
		return(
			<div className="sign_up_container">
				<div className="message">
					<h4>Sign Up</h4>
					<p>It's free</p>
				</div>
				<div className="card">
					<div className="sign_up_group">
						<button className="google_button button">
							<img className="icon" 
								 src={g_icon}/>
							Sign in with Google
						</button>
						<button className="facebook_button button">
							<img className="icon"
								 src={f_icon}/>
							Sign in with Facebook
						</button>
						<div className="day_divider">
							<hr className="separator"/>
							<i className="copy_only"/>
							<div className="day_divider_label">
								or
							</div>
						</div>
					</div>
					<form className="sign_up_form">
						<input placeholder="First name"/>
						<input placeholder="Last name"/>
						<input placeholder="Email"/>
						<input placeholder="Password"/>
						<p>By clicking Sign Up, you agree to our <a>Terms of Service</a> and <a>Data Policy</a></p>
						<button className="button green">Sign Up</button>
					</form>
				</div>
			</div>
		);
	}
}