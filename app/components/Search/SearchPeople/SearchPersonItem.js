import React, { Component, PropTypes } from 'react';

export default class SearchPersonItem extends Component {
	static propTypes = {
	}

	render() {
		const user_pic = require('../../../assets/profile_pic.png');
		return(
			<li className="search_user_item">
				<div className="user_pic_container">
					<img src={user_pic} className="user_pic" />
				</div>
				<div className="user_content">
					<h4 className="username">brennan_erbz</h4>
					<span className="fullname">Brennan Erbeznik</span>					
					<div className="user_stats">13 mutual classmates</div>
				</div>
			</li>
		);
	}
}