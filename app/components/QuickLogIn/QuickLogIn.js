import React, { Component, PropTypes } from 'react';
require('./QuickLogIn.scss');

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import classnames from 'classnames';
import { Link } from 'react-router';
import { pushState } from 'redux-router';

import * as useractions from '../../actions/user';

@connect(state => ({
	user: state.user.user,
	logged_in: state.user.logged_in,
	router: state.router
	}), 
	dispatch => ({
		...bindActionCreators({
			...useractions,
			pushState
		}, dispatch)
	})
)
export default class QuickLogIn extends Component {
	static propTypes = {
	}

	state = {
		email: null,
		password: null,
		focused: false,
		isLoggingIn: false
	}

	submitLogIn() {
		this.setState({isLoggingIn: true})
		const { logIn } = this.props;
		logIn(this.state.email, this.state.password)
		setTimeout(() => {
			this.setState({
				isLoggingIn: false,
				email: null,
				password: null
			})
		}, 500)
	}

	componentDidMount() {
		this.setState({
			focused: true,
			isLoggingIn: false
		})
		this.refs.email.focus()
	}

	close() {
		setTimeout(() => {
			if(!this.state.focused && !this.state.isLoggingIn) {
				this.props.closePopout()
			}
		}, 100)
	}

	componentWillUnmount() {
		this.setState({
			focused: false,
			isLoggingIn: false
		})
	}

	render() {
		const g_icon = require('../../assets/google_logo.png'),
			  f_icon = require('../../assets/facebook_logo.png'),
			  arrow_up = require('../../assets/arrow_up.png');
		return(
			<div className="quick_login_container"
				>
				<div className="card"  onBlur={::this.close}>
					<div className="log_in_form">
						<input 
							placeholder="Email" 
							ref="email" 
							autoFocus={true} 
							onFocus={() => this.setState({focused: true})}
							onBlur={() => this.setState({focused: false})} 
							onChange={(e) => this.setState({email: e.target.value})}
							onInput={(e) => {
								if(e.which == 13) ::this.submitLogIn()
							}}/>
						<input 
							type="password" 
							placeholder="Password"  
							onFocus={() => this.setState({focused: true})} 
							onBlur={() => this.setState({focused: false})}
							onChange={(e) => this.setState({password: e.target.value})}
							onInput={(e) => {
								if(e.which == 13) ::this.submitLogIn()
							}}/>
						<button className="button primary"
							    onClick={::this.submitLogIn}>
							   	Log In
						</button>
						<a className="forgot">Forgot password?</a>
					</div>
				</div>
			</div>
		);
	}
}









/* Facebook && Google
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