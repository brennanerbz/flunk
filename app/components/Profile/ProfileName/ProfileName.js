import React, { Component, PropTypes } from 'react';

export default class ProfileName extends Component {
	static propTypes = {
	}

	render() {
		return(
			<div className="profile_name_container">
				<h4 className="profile_username">brennanerbz</h4>
				<span className="profile_fullname">Brennan Erbeznik</span>
			</div>
		);
	}
}