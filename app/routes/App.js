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
				<Link to="/"><h1>Acuit</h1></Link>
				<Link to="/posts"><h1>Posts</h1></Link>
				{this.props.children}
			</div>
		);
	}
}