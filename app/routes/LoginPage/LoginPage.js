import React, { Component, PropTypes } from 'react';
require('./LoginPage.scss')
require('../LandingPage/LandingPage.scss')

export default class LogInPage extends Component {
	static propTypes = {
	}

	render() {
		const brand_logo = require('../../components/Header/assets/FlunkLogo.png'),
			  account = require('../../assets/empty_account_2.png'),
			  g_icon = require('../../assets/google_logo.png'),
			  f_icon = require('../../assets/facebook_logo.png');
		return(
			<div className="sign_in_page_container">
				<div className="sign_in_page">
					<div className="sign_in_content">
						<div className="logo">
							<img src={brand_logo}/>
						</div>
						<div className="card">
							<div className="user_info">
								<img src={account}/>
							</div>
							<form className="sign_in">
								<input className=""
									   placeholder="Enter your e-mail"/>
								<button className="button primary">
									Next
								</button>
							</form>
							<div className="separator">
								<hr/>
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
							</div>
						</div>
						<div className="backup">
							<a className="link">Create account</a>
						</div>
					</div>
				</div>
			</div>
		);
	}
}