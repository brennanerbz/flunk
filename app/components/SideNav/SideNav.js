import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import Main from './Main';
import SideNavSetList from './SideNavSetList';
require('./SideNav.scss');

@connect(state =>({
	loc: state.router.location,
}))
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
		let pathname = this.props.loc.pathname,
			regex = /\/(.*?)\//,
			root_path;
		pathname !== '/' ? root_path = regex.exec(pathname) : root_path = '/'
		console.log(root_path)
		console.log('working fine')
		return(
			<div className="sidenav">
					<Main {...this.props}/>	
					<SideNavSetList {...this.props}/>
					<div className="clear_both"></div>
			</div>
		);
	}
}