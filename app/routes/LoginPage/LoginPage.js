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
	logged_in: state.user.logged_in,
	router: state.router
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
			  { pushState, router } = this.props;
		return(
			<div className="sign_in_page_container">
				<div className="sign_in_page">
					<div className="sign_in_content">
						<div className="logo"
							 onClick={() => pushState(null, '/')}>
							<img src={brand_logo}/>
						</div>
						<div className="card">
							<div className="header">
								<h4>Log In</h4>
							</div>
							<div className="sign_up_group">
								<button className="google_button button">
									<img className="icon" 
										 src={g_icon}/>
									Log in with Google
								</button>
								<button className="facebook_button button">
									<img className="icon"
										 src={f_icon}/>
									Log in with Facebook
								</button>
							</div>
							<div className="day_divider">
								<hr className="separator"/>
								<i className="copy_only"/>
								<div className="day_divider_label">
									or
								</div>
							</div>
							<form className="sign_in">
								<input className=""
									   autoFocus={true}
									   placeholder="Email"/>
								<input className=""
									   type="password"
									   placeholder="Password"/>
								<button className="button primary">
									Log In 
								</button>
							</form>
						</div>
						<div className="backup">
							Don't have an account? <a className="link">Create account</a>
						</div>
					</div>
				</div>
				<div className="close"
					 onClick={() => pushState(null, '/landing')}>
					<div className="close_icon material-icons">
						clear
					</div>
				</div>
			</div>
		);
	}
}