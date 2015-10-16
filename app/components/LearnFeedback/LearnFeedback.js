import React, { Component, PropTypes } from 'react';
require('./LearnFeedback.scss');

export default class LearnFeedback extends Component {
	static propTypes = {
	}

	relatedHook(related) {
		const choices = related.split('|').slice(0, 4)
		const hook = 'Some of these related terms might help: ';
		const last_choice = choices.slice(-1)[0]		
		const bold_choices = choices.map(choice => {
				return (
					<b className="related_choice">{choice + ", "}</b>
				)
			}
		)		
		return (
			<span>{hook} {bold_choices.slice(0, 3)}{" and "}<b className="related_choice">{last_choice + "."}</b></span>
		)
	}

	hintHook() {
		let hook_choices = [
		'Maybe this example will help...', 
		'Try this hint...',
		'This hint might help...',
		'This other example might help you...'
		]
		let r_num = Math.floor(Math.random() * 4)
		let hint_hook = hook_choices[r_num]
		return (
			<p>{hint_hook}</p>
		)
	}


	renderFeedbackMessage(trial, slot) {
		const correct = slot.completion
		const praise = trial.praise.charAt(0).toUpperCase() + trial.praise.slice(1)
		const feedback = trial.feedback
		const answer = trial.answer
		return(
			<p className="feedback">
			{	
				praise.toLowerCase() !== 'bad' && answer !== null
				? praise + " "
				: null
			} 
			{	
				feedback.toLowerCase() !== 'incorrect' && answer !== null
				? feedback + ". "
				: null
			}
			{
				correct !== 'None'
				? <a>Press any key to continue</a>
				: null
			}
			{	
				trial.difficulty == 'related' && correct == 'None'
				? ::this.relatedHook(trial.related)
				: null
			}
			{
				trial.difficulty == 'aug' && correct == 'None'
				? ::this.hintHook()
				: null
			}
			</p>
		)
	}

	render() {
		const { trial, slot } = this.props;
		return(
			<div>
				{
					trial.feedback
					? ::this.renderFeedbackMessage(trial, slot) 
					: null
				}
			</div>
		);
	}
}