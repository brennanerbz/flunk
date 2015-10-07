import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import moment from 'moment';

// @connect (state => state.user.sets, state.router.location)

import SideNavSetListItem from './SideNavSetListItem';

@connect(state => ({
	sets: state.sets.set_list.map(id => state.sets.set_items[id])
}))
export default class SetList extends Component {
	static propTypes = {
		sets: PropTypes.array
	}

	componentDidMount = () => {
		$(this.refs['set_header']).tooltip({
			delay: { show: 400, hide: 50},
			template: '<div class="tooltip tooltip-side side_tool" role="tooltip"><div class="tooltip-arrow-left"></div><div class="tooltip-inner"></div></div>'
		});
		$(this.refs['set_action']).tooltip({
			delay: { show: 400, hide: 50},
			template: '<div class="tooltip side_tool" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>'
		})
	}

	render() {
		const { sets } = this.props,
			  add_circle_icon = require('../../assets/add_circle_icon.png');
		sets.sort((set1, set2) => {
			return (moment(set1.last_studied).isBefore(set2.last_studied)) ? 1 : -1
		})
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
					{
						sets.map(set => <SideNavSetListItem set={set} key={set.id} />)
					}					
					<Link to="/createset" className="sidenav_create list_more">Create a study set...</Link>
				</ul>
			</div>
		);
	}
}