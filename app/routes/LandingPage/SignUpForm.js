import React, { Component, PropTypes } from 'react';
require('./SignUpForm.scss');

export default class SignUpForm extends Component {
	static propTypes = {
	}

	submitSignUp(e) {
		e.preventDefault()
		console.log(e.target.value)
	}

	render() {
		const g_icon = require('../../assets/google_logo.png'),
			  f_icon = require('../../assets/facebook_logo.png');

		return(
			<div className="sign_up_container">
				<div className="card">
					<div className="message">
						<h4>Sign Up</h4>
						<p>It's free.</p>
					</div>
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
						<div className="day_divider">
							<hr className="separator"/>
							<i className="copy_only"/>
							<div className="day_divider_label">
								or
							</div>
						</div>
					</div>
					<form className="sign_up_form"
						  onSubmit={::this.submitSignUp}>
						<input placeholder="First name"/>
						<input placeholder="Last name"/>
						<input placeholder="Email"/>
						<input placeholder="Password"/>
						<p className="">By clicking Sign Up, you agree to our <a>Terms of Service</a> and <a>Data Policy</a></p>
						<button className="button green"
							    onClick={::this.submitSignUp}>
							   	Sign Up
						</button>
					</form>
				</div>
			</div>
		);
	}
}