import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

// @connect (state => state.user.sets, state.router.location)
export default class SetList extends Component {
	static propTypes = {
	}

	componentDidMount = () => {
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
			  set_icon_active = require('../../assets/set_icon_white.png');
			 
		return(
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
			</div>
		);
	}
}