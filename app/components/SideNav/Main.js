import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

export default class Main extends Component {
	static propTypes = {
		
	}

	render() {
	    const home_icon = require('../../assets/home_icon.png'),
		home_icon_active = require('../../assets/home_icon_white.png'),
		profile_icon = require('../../assets/profile_icon.png'),
		profile_icon_active = require('../../assets/profile_icon_white.png'),
		settings_icon = require('../../assets/settings_icon.png'),
		settings_icon_active = require('../../assets/settings_icon_white.png');
		return(
			<div className="sidenav_main">				
				<h2 className="sidenav_header">
					<span className="sidenav_header_label">
					Main
					</span>
				</h2>				
				<ul className="sidenav_list">
					<li className="sidenav_setitem active">
						<a className="sidenav_setitem_name">
							<span className="overflow_ellipsis">
								<span className="prefix_icon">
									<img src={home_icon_active} className="set_icon  home_icon"/>
								</span>
								Home
							</span>
						</a>
					</li>
					<li className="sidenav_setitem">
						<a className="sidenav_setitem_name">
							<span className="overflow_ellipsis">
								<span className="prefix_icon">
									<img src={profile_icon} className="set_icon"/>
								</span>
								Profile
							</span>
						</a>
					</li>
					<li className="sidenav_setitem">
						<a className="sidenav_setitem_name">
							<span className="overflow_ellipsis">
								<span className="prefix_icon">
									<img src={settings_icon} className="set_icon"/>
								</span>
								Settings
							</span>
						</a>
					</li>
				</ul>
			</div>	
		);
	}
}


// -- Include supplemental user_name 
// <div className="sidenav_profile_info">
// 	<i className="side_icon active_icon"></i>
// 	<span className="user_name">
// 	Brennan Erbeznik
// 	</span>
// </div>