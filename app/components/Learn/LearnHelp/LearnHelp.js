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
		const { slot, current_slot, current_trial, user_answer, feedback } = this.props;
		return(
			<section className="learn_help">
				{
					current_trial !== undefined && current_slot !== undefined
					&&
					<ol className="conversation">
						{
							user_answer !== null 
							&& user_answer.length > 0
							&& 
							<UserAnswer user_answer={user_answer}
										current_trial={current_trial} />
						}
						{
							feedback !== null
							&& 
							<FeedbackMessage feedback={feedback}
											 current_trial={current_trial}/>
						}
						{
							current_trial.format !== null
							&& current_trial.format !== 'recall'
							&&
							<Help current_trial={current_trial} />
						}
					</ol>
				}
			</section>
		);
	}
}
