import React, { Component, PropTypes } from 'react';
require('./QuickPractice.scss');
import LearnInput from '../../LearnInput/LearnInput';

export default class QuickPractice extends Component {
	static propTypes = {
	}

	parseQuickCue(set) {
		let cue = set.items[0].cue;
		cue = cue.toLowerCase().slice(0, -1) + '?';
		return (
			<p>What is {cue}</p>
		);
	}

	render() {
		const { set } = this.props;
		return(
			<div className="quick_practice">
				<div className="quick_cue">
					{::this.parseQuickCue(set)}
				</div>
				<div className="quick_input">
					<LearnInput />
				</div>
			</div>
		);
	}
}