import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

require('./SideNav.scss');

export default class SideNav extends Component {
	static propTypes = {
		
	}

	componentDidMount = () => {
		$('.sidenav').height($(window).height() - 50);
		$(this.refs['set_header']).tooltip({
			delay: { show: 400, hide: 50},
			template: '<div class="tooltip tooltip-side" role="tooltip"><div class="tooltip-arrow-left"></div><div class="tooltip-inner"></div></div>'
		});
		$(this.refs['set_action']).tooltip({
			delay: { show: 400, hide: 50}
		})
	}

	render() {
		const add_circle_icon = require('../../assets/add_circle_icon.png'),
			  set_icon = require('../../assets/set_icon.png'),
			  set_icon_active = require('../../assets/set_icon_white.png'),
			  home_icon = require('../../assets/home_icon.png'),
			  home_icon_active = require('../../assets/home_icon_white.png'),
			  profile_icon = require('../../assets/profile_icon.png'),
			  profile_icon_active = require('../../assets/profile_icon_white.png'),
			  settings_icon = require('../../assets/settings_icon.png'),
			  settings_icon_active = require('../../assets/settings_icon_white.png');
		return(
			<div className="sidenav">
					<div className="sidenav_main">
						<h2 className="sidenav_header">
							<span className="sidenav_header_label">
							Main
							</span>
						</h2>
						<div className="sidenav_profile_info">
							<i className="side_icon active_icon"></i>
							<span className="user_name">
							Brennan Erbeznik
							</span>
						</div>
						<ul className="sidenav_list">
							<li className="sidenav_setitem">
								<a className="sidenav_setitem_name">
									<span className="overflow_ellipsis">
										<span className="prefix_icon">
											<img src={home_icon} className="set_icon"/>
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
					<div className="sidenav_sets_wrapper">
						<Link to="/createset">
						<span className="side_icon new_set_btn">
							<img src={add_circle_icon} 
								 ref="set_action"
								 className="new_set_icon"
								 data-toggle="tooltip" 
							  	 title="Create a study set"></img>
						</span>
						</Link>
						<h2 ref='set_header' 
							className="sidenav_header" 
							data-toggle="tooltip" 
							title="Browse all sets">
							<span className="sidenav_header_label">
							Sets
							</span>
						</h2>
						<ul className="sidenav_list">
							<li className="sidenav_setitem">
								<a className="sidenav_setitem_name">
									<span className="overflow_ellipsis">
										<span className="prefix_icon">
											<img src={set_icon} className="set_icon"/>
										</span>
										introtobiology
									</span>
								</a>
							</li>
							<li className="sidenav_setitem active">
								<a className="sidenav_setitem_name">
									<span className="overflow_ellipsis">
										<span className="prefix_icon">
											<img src={set_icon_active} className="set_icon"/>
										</span>
										computerscience101
									</span>
								</a>
							</li>
							<Link to="/createset" className="sidenav_create list_more">Create a study set...</Link>
						</ul>
						<div className="clear_both"></div>
					</div>
			</div>
		);
	}
}