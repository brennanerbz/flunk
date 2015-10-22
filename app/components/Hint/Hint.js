import React, { Component, PropTypes } from 'react';
require('./Hint.scss');

export default class Hint extends Component {
	static propTypes = {
		hint: PropTypes.string
	}

	render() {
		const { trial } = this.props;
		const hint = trial.augcue;
		return (
			trial.difficulty == 'aug'
			? <div className="hint_container">				
				<p className="hint">{hint}</p>
				<p className="hint_source">Source</p>
			  </div>
			: null
		);
	}
}


// <p className="diff_label">Hint:</p>