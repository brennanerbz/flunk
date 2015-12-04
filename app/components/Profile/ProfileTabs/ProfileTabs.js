import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
require('../../SetView/Tabs/Tabs.scss');

export default class ProfileTabs extends Component {
	static propTypes = {
	}

	render() {
		return(
			<div className="tab_set">
				<a className={classnames({'selected': this.props.tab.length == 0})}
					onClick={() => this.props.changeTabs('')}>
					Created
				</a>
				<a className={classnames({'selected': this.props.tab == 'studied'})}
					onClick={() => this.props.changeTabs('studied')}>
					Studied
				</a>
			</div>
		);
	}
}