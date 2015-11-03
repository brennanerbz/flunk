import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

export default class ProfileTabs extends Component {
	static propTypes = {
	}

	render() {
		return(
			<div className="tabs_container">
				<ul className="tabs_list">
					<li className={classnames({'active': this.props.tab == 'created'}, "tab_item created_tab")}
						onClick={() => this.props.changeTabs('created')}>
						Created
					</li>
					<li className={classnames({'active': this.props.tab == 'studied'}, "tab_item created_tab")}
						onClick={() => this.props.changeTabs('studied')}>
						Studied
					</li>
				</ul>
			</div>
		);
	}
}