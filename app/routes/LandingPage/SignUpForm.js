import React, { Component, PropTypes } from 'react';
require('./SignUpForm.scss');

export default class SignUpForm extends Component {
	static propTypes = {
	}

	state = {
		modal_version: false
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
					
					<form className="sign_up_form"
						  onSubmit={::this.submitSignUp}>
						<input ref="first_name" placeholder="First name" autoFocus={this.props.shouldAutoFocus}/>
						<input placeholder="Last name"/>
						<input placeholder="Email"/>
						<input type="password" placeholder="Password"/>
						<p className="">By clicking Sign Up, you agree to our <a>Terms of Service</a> and <a>Data Policy</a></p>
						<button style={{
							fontSize: '16px',
							fontWeight: '600',
							background: '#1C93F4',
							borderColor: '#007BE8',
							height: '36px'
						}}className="button primary"
							    onClick={::this.submitSignUp}>
							   	Sign up for Beta
						</button>
					</form>
				</div>
			</div>
		);
	}
}


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