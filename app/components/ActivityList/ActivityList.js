import React, { Component, PropTypes } from 'react';
require('./ActivityList.scss');

export default class ActivityList extends Component {
	static propTypes = {
	}

	render() {
		const practice_icon = require('../../assets/practice_icon_blue.png'),
			  activity_icon = require('../../assets/activity_icon_blue.png');
		return(
			<div>
				<div className="section_header">
					<span className="section_icon"><img src={activity_icon} className="header_icon"/></span>
					<span className="section_header_label">Activity</span>
				</div>
				<ul className="activity_list">
					<li>
						<span className="activity_item">
							<div className="activity_action">
								<a><img src={practice_icon} className="activity_icon"/></a>
							</div>
							<div className="activity_message">
								<div className="message_content">Brennan Erbeznik practiced <a className="link">Intro to Psychology</a></div>
								<span className="message_datetime">4 hours ago</span>
							</div>
						</span>
					</li>
				</ul>
			</div>
		);
	}
}