import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

import Main from './Main';
import SideNavSetList from './SideNavSetList';
require('./SideNav.scss');

export default class SideNav extends Component {
	static propTypes = {
		
	}

	componentDidMount = () => {
		$('.sidenav').height($(window).height() - 50)
		window.addEventListener('resize', this.resizeSideNav);
	}

	resizeSideNav = () => {
		$('.sidenav').height($(window).height() - 50)
	}

	render() {
		return(
			<div className="sidenav">
					<Main/>	
					<SideNavSetList/>
					<div className="clear_both"></div>
			</div>
		);
	}
}