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

	renderFeedbackMessage(trial, slot) {
		const correct = slot.completion
		const praise = trial.praise.charAt(0).toUpperCase() + trial.praise.slice(1)
		const feedback = trial.feedback
		return(
			<p className="feedback">
			{	
				praise.toLowerCase() !== 'bad'
				? praise + " "
				: null
			} 
			{	
				feedback.toLowerCase() !== 'incorrect'
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