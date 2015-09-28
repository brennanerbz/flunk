import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';

@connect(state => ({
	router: state.router
}))
export default class App extends Component {
	static propTypes = {
		children: PropTypes.element.isRequired
	}

	render() {
		return(
			<div>
				<h1>App</h1>
				{this.props.children}
				<Link to={`/`}>Home</Link>
			</div>
		);
	}
}