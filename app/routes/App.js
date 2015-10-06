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

@connect(
	state => ({ router: state.router }),
	{ pushState }
)
export default class FlunkApp extends Component {
	static propTypes = {
		children: PropTypes.any,
		dispatch: PropTypes.func,
		error: PropTypes.string
	}

	renderSideNav(){
		const route = this.props.router.location.pathname;
		if (route == '/createset' || route == '/learn') { return; }
		return (
			<SideNav {...this.props} />
		);
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