import React, { Component, PropTypes } from 'react';
require('./LearnHelp.scss')
// import Hint from './Hint';
import Related from './Related';
import MultipleChoice from './MultipleChoice';
import Target from './Target';

export default class LearnHelp extends Component {
	static propTypes = {
	}

	// recall | pic | related | augN | nonemc | mc | stem | peek | copy

	renderHelp() {
		const { trial } = this.props;
		switch(trial.difficulty) {
			case 'recall':
				return;
			case 'related':
				return;
			case 'nonemc':
			case 'mc':
			 	return (
			 		<MultipleChoice choices={trial.choices}/>
			 	)
			case 'stem':
			case 'peek':
			case 'copy':
				return (
					<Target stem={trial.stem} target={trial.target}/>
				)
			case 'aug':
			default:
				break;
		}
	}

	render() {
		const { slot } = this.props;
		return(
			<div className="learn_help">	
				{
					slot.completion == 'None'
					? ::this.renderHelp()
					: null
				}
			</div>
		);
	}
}

// case 'related':
// 	return (
// 		<Related related={trial.related}/>
// 	);