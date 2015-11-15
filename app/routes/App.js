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

	renderSideNav(){
		const route = this.props.router.location.pathname;
		if (route.indexOf('/createset') !== -1 || route.indexOf('learn') !== -1 || route.indexOf('search') !== -1) { return; }
		return (
			<SideNav {...this.props} />
		);
	}

	componentWillMount() {
		const { fetchAssignments, fetchUser } = this.props; 
		// on mounting, will load user object and assignments
		// TODO: use cookies/localstorage to query for user
		fetchUser(1)
		fetchAssignments(1)
	}

	render() {
	const route = this.props.router.location.pathname;	
		return(
			<div>
				<Header/>
				{::this.renderSideNav()}				
				{this.props.children}
			</div>
		);
	}
}