import React, { Component, PropTypes } from 'react';
require('./LearnHelp.scss')
import Hint from './Hint';
import Related from './Related';
import MultipleChoice from './MultipleChoice';
import Answer from './Answer';

export default class LearnHelp extends Component {
	static propTypes = {
	}

	// recall | pic | related | augN | nonemc | mc | stem | peek | copy

	renderHelp() {
		const { trial } = this.props;
		switch(trial.difficulty) {
			case 'recall':
				return;
			case 'aug':
				return (
					<Hint hint={trial.augcue}/>
				)
			case 'related':
				return (
					<Related related={trial.related}/>
				);
			case 'nonemc':
			case 'mc':
			 	return (
			 		<MultipleChoice choices={trial.choices}/>
			 	)
			case 'stem':
			case 'peek':
			case 'copy':
				return (
					<Answer stem={trial.stem} target={trial.target}/>
				)
			default:
				break;
		}
	}

	render() {
		return(
			<div>	
				{
					::this.renderHelp()
				}
			</div>
		);
	}
}