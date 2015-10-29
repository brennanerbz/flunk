import React, { Component, PropTypes } from 'react';
require('./Hint.scss');

export default class Hint extends Component {
	static propTypes = {
		hints: PropTypes.array
	}

	render() {
		const { hints, current_slot } = this.props;
		let hint;
		if(hints !== null) {
			hint = hints[0]
		}
		return (
			false
			? <div className="hint_container">				
				<p className="hint">{hint}</p>
				<p className="hint_source">Source</p>
			  </div>
			: null
		);
	}
}


// <p className="diff_label">Hint:</p>