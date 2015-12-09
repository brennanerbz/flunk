import React, { Component, PropTypes } from 'react';
require('./QuickLogIn.scss');

export default class QuickLogIn extends Component {
	static propTypes = {
	}

	state = {
		focused: false,
		isLoggingIn: false
	}

	submitLogIn() {
		this.setState({isLoggingIn: true})
		setTimeout(() => {
			this.setState({isLoggingIn: false})
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
							onBlur={() => this.setState({focused: false})} />
						<input 
							type="password" 
							placeholder="Password"  
							onFocus={() => this.setState({focused: true})} 
							onBlur={() => this.setState({focused: false})}/>
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