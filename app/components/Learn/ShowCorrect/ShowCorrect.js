import React, { Component, PropTypes } from 'react';
require('./ShowCorrect.scss');

export default class ShowCorrect extends Component {
	static propTypes = {
	}	
	
	render() {
		const { current_slot, trial } = this.props;
		return(
			<div className="show_correct_container">
				<div className="show_correct">
					<p className="correct_answer">{trial.answer}</p>
				</div>
				<a className="continue_btn"
				   onClick={() => this.props.skipSlot()}>Press any key to continue</a>
			</div>
		);
	}
}