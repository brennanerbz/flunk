import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

export default class Home extends Component {

	static contextTypes ={
		history: PropTypes.object
	}

	changeRoute = () => {
	  const history = this.context.history;
	  history.pushState(null, '/create');
	}

	render() {
		return(
			<div>
				<h1>Home</h1>
				<button onClick={this.changeRoute}>Create</button>
			</div>
		);
	}
}