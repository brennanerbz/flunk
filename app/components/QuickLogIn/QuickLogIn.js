import React, { Component, PropTypes } from 'react';
require('./QuickLogIn.scss');

export default class QuickLogIn extends Component {
	static propTypes = {
	}

	submitLogIn() {

	}

	componentDidMount() {
		this.refs.email.focus()
	}

	render() {
		const g_icon = require('../../assets/google_logo.png'),
			  f_icon = require('../../assets/facebook_logo.png'),
			  arrow_up = require('../../assets/arrow_up.png');
		return(
			<div className="quick_login_container">
				<div className="card">
					<img className="icon arrow up" src={arrow_up} />
					<form className="log_in_form"
						  onSubmit={::this.submitLogIn}
						  onBlur={() => this.props.closePopout()}>
						<input placeholder="Email" ref="email" autoFocus={true}/>
						<input type="password" placeholder="Password"/>
						<button className="button primary"
							    onClick={::this.submitLogIn}>
							   	Log In
						</button>
						<a className="forgot">Forgot password?</a>
					</form>
				</div>
			</div>
		);
	}
}
/*
<div className="log_in_group">
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
	<div className="day_divider">
		<hr className="separator"/>
		<i className="copy_only"/>
		<div className="day_divider_label">
			or
		</div>
	</div>
</div>

*/