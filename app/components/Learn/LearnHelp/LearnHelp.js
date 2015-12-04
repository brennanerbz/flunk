import React, { Component, PropTypes } from 'react';
require('./LearnHelp.scss')
import classnames from 'classnames';
// import Hint from './Hint';
import Help from './Help';

/* Feedback Convo */
import FeedbackMessage from './FeedbackMessage';
import UserAnswer from './UserAnswer';

export default class LearnHelp extends Component {
	static propTypes = {
	}

	render() {
		const { slot, current_slot, current_trial, previous_trial } = this.props;
		return(
			<section className="learn_help">
				{
					current_trial !== undefined && current_slot !== undefined
					&&
					<ol className="conversation">
						{
							previous_trial.answer !== null 
							&& previous_trial.answer !== undefined
							&& previous_trial.answer.length > 0 
							&&
							<UserAnswer previous_trial={previous_trial}
										current_trial={current_trial} />
						}
						{
							previous_trial.feedback !== null 
							&& previous_trial.feedback !== undefined
							&& previous_trial.feedback.length > 0
							&&
							<FeedbackMessage previous_trial={previous_trial}
											 current_trial={current_trial}/>
						}
						{
							current_slot.format !== null
							&& current_slot.format !== 'recall'
							&&
							<Help current_slot={current_slot} />
						}
					</ol>
				}
			</section>
		);
	}
}
