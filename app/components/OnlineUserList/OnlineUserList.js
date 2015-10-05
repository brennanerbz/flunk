import React, { Component, PropTypes } from 'react';
require('../ActivityList/ActivityList.scss');

export default class OnlineUserList extends Component {
	static propTypes = {
	}

	render() {
		const online_icon = require('../../assets/profile_icon_green.png');
		return(
			<div>
				<div className="section_header">
					<span className="section_icon"><img src={online_icon} className="header_icon"/></span>
					<span className="section_header_label">Online</span>
				</div>
				<ul className="activity_list">
					<li>
						<span className="activity_item">
							<div className="activity_action">
								<a><img src="https://cdn-images-1.medium.com/fit/c/72/72/0*Un7eHMAQh62QX1LO.jpg" className="online_user_pic"/></a>
							</div>
							<div className="activity_message">
								<div className="message_content activity_user">
								Nathan Lomeli
								<i className="online_icon"></i>
								</div>
							</div>
						</span>
					</li>
				</ul>
			</div>
		);
	}
}