import React, { Component, PropTypes } from 'react';
require('./LearnHelp.scss')
import classnames from 'classnames';
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
		const { slot, trial } = this.props;
		return(
			<div className="learn_help">
				<div className="">
					<p className={classnames("diff_label", {'mc_label': trial.difficulty == 'mc' || trial.difficulty == 'nonemc'  })}>
					{ 
						trial.difficulty == 'mc' || trial.difficulty == 'nonemc'
						? "Multiple Choice:"
						: null
					}
					{
						trial.difficulty == 'stem'
						? "Fill in the blank:"
						: null
					}
					{
						trial.difficulty == 'copy' || trial.difficulty == 'peek'
						? 'Correct answer:'
						: null
					}
					</p>
				</div>
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