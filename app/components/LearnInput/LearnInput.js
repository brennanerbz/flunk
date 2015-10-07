import React, { Component, PropTypes } from 'react';
require('./LearnInput.scss')

export default class LearnInput extends Component {
	static propTypes = {
	}

	render() {
		return(
			<div className="input-group">
			    <span className="input-group-btn">
			    	<button className="btn help_btn" type="button">?</button>
			    </span>
			    <input autoFocus={true} type="text" className="form-control"/>
			</div>
		);
	}
}