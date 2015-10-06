import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

export default class SideNavSetListItem extends Component {
	static propTypes = {
		set: PropTypes.object
	}

	render() {
		const { set } = this.props,
			set_name = set.name.toLowerCase(),
			set_icon = require('../../assets/set_icon.png'),
			set_icon_active = require('../../assets/set_icon_white.png');

		return(
			<li className="sidenav_setitem">
				<Link to={`/learn/${set.id}`} className="sidenav_setitem_name">
					<span className="overflow_ellipsis">
						<span className="prefix_icon">
							<img src={set_icon} className="set_icon"/>
						</span>
						{set_name}
					</span>
				</Link>
			</li>
		);
	}
}