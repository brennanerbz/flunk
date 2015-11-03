import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import classnames from 'classnames';

export default class SideNavSetListItem extends Component {
	static propTypes = {
		set: PropTypes.object
	}

	render() {
		const { set, index } = this.props,
			set_name = set.title.toLowerCase(),
			set_icon = require('../../assets/set_icon.png'),
			set_icon_active = require('../../assets/set_icon_white.png'),
			icon = index == set.id ? set_icon_active : set_icon;
		return(
			<li className={classnames("sidenav_setitem", {"active": index == set.id })}>
				<Link to={`/set/${set.id}`} className="sidenav_setitem_name">
					<span className="overflow_ellipsis">
						<span className="prefix_icon">
							<img src={icon} className="set_icon"/>
						</span>
						{set_name}
					</span>
				</Link>
			</li>
		);
	}
}