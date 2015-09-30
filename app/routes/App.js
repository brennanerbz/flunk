import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';

@connect(state => ({
	router: state.router
}))
export default class FlunkApp extends Component {
	static propTypes = {
		children: PropTypes.element.isRequired
	}

	render() {
		return(
			<div>
				<nav><h1>Nav</h1></nav>
				{this.props.children}
			</div>
		);
	}
}