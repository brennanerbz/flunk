import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
require('./LearnInput.scss')

export default class LearnInput extends Component {
	static propTypes = {
	}

	state = {
		answer: '',
		reaction_time: null,
		correct: false
	}		

	componentDidMount() {
		this.setState({
			correct: false
		});
	}

	componentWillReceiveProps(nextProps) {
		const { current_slot } = this.props;
		this.refs.answerbox.focus()
		if (current_slot !== nextProps.current_slot) {
			this.setState({
				answer: ''
			});
		}
	}

	handleChange = (e) => {
		this.setState({
			answer: e.target.value
		});	
	}

	handleReactionTime = () => {
		if (this.state.reaction_time !== null ) { return; }
		const t = new Date()
		const reaction_time = t.toISOString().replace("T", " ").replace("Z", "")
		this.setState({
			reaction_time: reaction_time
		});
	}
 
	handleSubmit = (e) => {
		e.preventDefault()
		const { adapt } = this.props;
		const reaction_time = this.state.reaction_time;
		const d = new Date()
		const response_time = d.toISOString().replace('T', " ").replace("Z", "")		
		const answer = this.state.answer.toLowerCase().trim()
		adapt(answer, reaction_time, response_time)
		this.setState({
			answer: '',
			reaction_time: null
		});
	}

	handleKeyDown(event) {
		this.handleReactionTime()
		// const { trial } = this.props,
		// 	  target = event.target.value;
		// if((target == trial.target.slice(0, -1) || target == trial.target) 
		// 	&& (trial.difficulty == 'copy' || trial.difficulty == 'peek')) {
		// 	this.setState({
		// 		correct: true
		// 	});
		// }
		// else if(target !== trial.target.slice(0, -1)) {
		// 	this.setState({
		// 		correct: false
		// 	})
		// }		
	}

	render() {
		return(
			<div className="input_box">	
			    <form onSubmit={this.handleSubmit}>
			    <input autoFocus={true} 
			    	   ref="answerbox"
			    	   value={this.state.answer}
			    	   onChange={this.handleChange}
			    	   onKeyDown={::this.handleKeyDown}
			    	   type="text" 
			    	   className={classnames({'correct_answer': this.state.correct})}/>
			   	</form>
			   	<span className="">
			   		<button className="button answer_btn" 
			   			    type="button"
			   			    onClick={::this.handleSubmit}>Answer</button>
			   	</span>
			</div>
		);
	}
}
