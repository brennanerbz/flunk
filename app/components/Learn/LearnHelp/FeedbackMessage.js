import React, { Component, PropTypes } from 'react';

export default class FeedbackMessage extends Component {
	static propTypes = {
	}

	render() {
		const { previous_trial, current_trial} = this.props;
		return(
			<li className="bot">
				{
					previous_trial.feedback !== null && previous_trial.feedback.length > 0
					&&
					<div className="message">
						<p>{previous_trial.feedback}</p>
					</div>
				}
			</li>
		);
	}
}