import React, { Component, PropTypes } from 'react';

export default class ProfileTabs extends Component {
	static propTypes = {
	}

	render() {
		return(
			<div className="tabs_container">
				<ul className="tabs_list">
					<li className="tab_item created_tab active">
						Created
					</li>
					<li className="tab_item studied_tab">
						Studied
					</li>
				</ul>
			</div>
		);
	}
}