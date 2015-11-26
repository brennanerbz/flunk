import React, { Component, PropTypes } from 'react';
require('./LoginPage.scss')
require('../LandingPage/LandingPage.scss')
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import classnames from 'classnames';
import { Link } from 'react-router';
import { pushState } from 'redux-router';


@connect(state => ({
	user: state.user.user,
	logged_in: state.user.logged_in
	}), 
	dispatch => ({
		...bindActionCreators({
			pushState
		}, dispatch)
	})
)
export default class LogInPage extends Component {
	static propTypes = {
	}

	render() {
		const brand_logo = require('../../components/Header/assets/FlunkLogo.png'),
			  account = require('../../assets/empty_account_2.png'),
			  g_icon = require('../../assets/google_logo.png'),
			  f_icon = require('../../assets/facebook_logo.png'),
			  { pushState } = this.props;
		return(
			<div className="sign_in_page_container">
				<div className="sign_in_page">
					<div className="sign_in_content">
						<div className="logo"
							 onClick={() => pushState(null, '/')}>
							<img src={brand_logo}/>
						</div>
						<div className="instruction">
							Sign into your account
						</div>
						<div className="card">
							<div className="user_info">
								
							</div>
							<form className="sign_in">
								<input className=""
									   autoFocus={true}
									   placeholder="Enter your e-mail"/>
								<button className="button primary">
									Next
								</button>
							</form>
							<div className="day_divider">
								<hr className="separator"/>
								<i className="copy_only"/>
								<div className="day_divider_label">
									Or
								</div>
							</div>
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
							</div>
						</div>
						<div className="backup">
							Don't have an account? &nbsp;
							<a className="link">Create account</a>
						</div>
					</div>
				</div>
			</div>
		);
	}
}