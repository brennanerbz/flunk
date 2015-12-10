import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { pushState } from 'react-redux';

import * as useractions from '../../actions/user';
require('./SignUpForm.scss');

@connect(state => ({
		user: state.user.user
	}),
	dispatch => ({
		...bindActionCreators({
			...useractions,
			pushState
		}, dispatch)
	})
)
export default class SignUpForm extends Component {
	static propTypes = {
	}

	state = {
		modal_version: false,
		first_name: null,
		last_name: null,
		password: null,
		email: null,
		username: null // temp
	}

	componentDidMount() {
		if(this.props.modal) {
			this.setState({
				modal_version: true
			})
		}
		setTimeout(() => {
			if(!this.props.last_call) {
				$(this.refs.first_name).focus()
			}
		}, 300)
	}

	handleSubmit() {
		const { createUser } = this.props;
		let user_info = {}
		for(var prop in this.state) {
			if(prop !== 'modal_version') {
				user_info[prop] = this.state[prop]
			}
		}
		createUser(user_info)
	}

	render() {
		const g_icon = require('../../assets/google_logo.png'),
			  f_icon = require('../../assets/facebook_logo.png');
		return(
			<div className="sign_up_container">
				<div className="card">
					{
						!this.state.modal_version
						&&
						<div className="message">
							{
								!this.props.last_call
								?
								<div>
									<h4>Sign Up</h4>
									<p>It's free.</p>
								</div>
								:
								<div>
									<h4 className="start_now">Get started now</h4>
								</div>
							}
						</div>
					}
					
					<form 
						className="sign_up_form"
						onSubmit={(e) => {
						  	e.preventDefault()
						  	::this.handleSubmit()
						}}>
						<input 
							ref="first_name" 
							placeholder="First name" 
							autoFocus={this.props.shouldAutoFocus}
							value={this.state.first_name}
							onChange={(e) => {
								this.setState({first_name: e.target.value})
							}}/>
						<input 
							placeholder="Last name"
							value={this.state.last_name}
							onChange={(e) => {
								this.setState({last_name: e.target.value})
							}}/>
						<input 
							placeholder="Email"
							value={this.state.email}
							onChange={(e) => {
								this.setState({email: e.target.value})
							}}/>
						<input 
							placeholder="Username"
							value={this.state.username}
							onChange={(e) => {
								this.setState({username: e.target.value})
							}}/>
						<input 
							type="password" 
							placeholder="Password"
							value={this.state.password}
							onChange={(e) => {
								this.setState({password: e.target.value})
							}}
							onInput={(e) => {
								if(e.which == 13) {
									::this.handleSubmit()
								}
							}}
							/>
						<p className="">
							By clicking Sign Up, you agree to our 
							<a>Terms of Service</a> and <a>Data Policy</a>
						</p>
						<button style={{
							fontSize: '16px',
							fontWeight: '600',
							background: '#1C93F4',
							borderColor: '#007BE8',
							height: '36px'
						}}className="button primary"
							    onClick={::this.handleSubmit}>
							   	Sign up for Beta
						</button>
					</form>
				</div>
			</div>
		);
	}
}

















/* Facebook and Google */
// <div className="sign_up_group">
// 	<button className="google_button button">
// 		<img className="icon" 
// 			 src={g_icon}/>
// 		Sign up with Google
// 	</button>
// 	<button className="facebook_button button">
// 		<img className="icon"
// 			 src={f_icon}/>
// 		Sign up with Facebook
// 	</button>
// 	<div className="day_divider">
// 		<hr className="separator"/>
// 		<i className="copy_only"/>
// 		<div className="day_divider_label">
// 			or
// 		</div>
// 	</div>
// </div>