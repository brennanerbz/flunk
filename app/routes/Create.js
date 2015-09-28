import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

export default class Home extends Component {

	static contextTypes ={
		history: PropTypes.object
	}

	changeRoute = () => {
	  const history = this.context.history;
	  history.pushState(null, '/');
	}

	render() {
		return(
			<div>
				<h1>Create</h1>
				<button></button>
			</div>
		);
	}
}