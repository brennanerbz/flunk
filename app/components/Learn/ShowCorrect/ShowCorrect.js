import React, { Component, PropTypes } from 'react';
require('./ShowCorrect.scss');

export default class ShowCorrect extends Component {
	static propTypes = {
	}	

	shouldComponentUpdate(nextProps) {
		return this.props.current_slot.id == nextProps.current_slot.id || this.props.trial.answer == nextProps.trial.answer
	}
	
	render() {
		const { current_slot,
			    trial, 
			    showCompletedSequence
			  } = this.props;
		return(
			<div className="show_correct_container">
				<div className="show_correct">
					<p className="correct_answer">{trial.answer}</p>
				</div>
				<a className="continue_btn"
				   onClick={showCompletedSequence 
				   			? () => this.props.newSequence(null) 
				   			: () => this.props.skipSlot()}>
				   			{showCompletedSequence 
				   			? "Press any key to start new round" 
				   			: "Press any key to continue"}</a>
			</div>
		);
	}
}