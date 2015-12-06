import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import { pushState } from 'redux-router';
/* Styles */
const styles = require('../styles/global.scss');
/* Components */
import Header from '../components/Header/Header';
import SideNav from '../components/SideNav/SideNav';

import LandingPage from './LandingPage/LandingPage';
import Home from './Home/Home';

import * as actions from '../actions/usersets';
import * as user from '../actions/user';

@connect(
	state => ({ router: state.router }),
	dispatch => ({
		...bindActionCreators({
			...actions,
			...user
		}, dispatch)
	})
)
export default class FlunkApp extends Component {
	static propTypes = {
		children: PropTypes.any,
		dispatch: PropTypes.func,
		error: PropTypes.string
	}

	componentWillMount() {
		const { fetchAssignments, fetchUser } = this.props; 
		// on mounting, will load user object and assignments
		// TODO: use cookies/localstorage to query for user
		fetchUser(1)
		fetchAssignments(1)
	}

	renderSideNav() {
		let route = this.props.router.location.pathname,
			count = route.match(/\//g).length,
			regex = count >= 2 ? /\/(.*?)\// : /\/(.*)/,
			root_path;
		route !== '/' ? root_path = regex.exec(route)[1] : root_path = '/'
		if     (route.indexOf('createset') !== -1 
			 || route.indexOf('learn') !== -1 
			 || route.indexOf('search') !== -1
			 || route.indexOf('error') !== -1) { return; }
		else if(route.indexOf('set') !== -1
			 || route.indexOf('profile') !== -1
			 || route == '/') {
			return (
				<SideNav {...this.props} root_path={root_path} />
			);
		}
		else if(route !== '/') { return }
	}

	render() {
		let route = this.props.router.location.pathname,
			count = route.match(/\//g).length,
			regex = count >= 2 ? /\/(.*?)\// : /\/(.*)/,
			root_path;
		route !== '/' ? root_path = regex.exec(route)[1] : root_path = '/'
		var childrenWithProps = React.Children.map(this.props.children, (child) => {
			return React.cloneElement(child, { root_path: root_path })
		})
		return( 
			<div>
				<Header root_path={root_path}/>
				<div className="outer_shell">
					{::this.renderSideNav()}
					{childrenWithProps}
				</div>
			</div>
		);
	}
}