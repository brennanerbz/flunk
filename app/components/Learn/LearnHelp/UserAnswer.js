import React, { Component, PropTypes } from 'react';

export default class UserAnswer extends Component {
	static propTypes = {
	}

	render() {
		const { previous_trial } = this.props;
		let answer = previous_trial.answer !== undefined
					? previous_trial.answer 
					: null
		return(
			<li className="user">
				{
					answer !== null && answer.length > 0
					&&
					<div className="message">
						<p>{ answer }</p>
					</div>
				}
			</li>
		);
	}
}

// {
// 	answer.length == 0
// 	&& <p>...</p>
// }

