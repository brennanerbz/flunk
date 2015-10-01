import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import { pushState } from 'redux-router';
/* Styles */
const styles = require('../styles/global.scss');
/* Components */
import Header from '../components/Header/Header';

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

	render() {
		return(
			<div>
				<Header/>
				{this.props.children}
			</div>
		);
	}
}