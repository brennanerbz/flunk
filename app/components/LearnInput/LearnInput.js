import React, { Component, PropTypes } from 'react';
require('./LearnInput.scss')

export default class LearnInput extends Component {
	static propTypes = {
	}

	state = {
		answer: '',
		reaction_time: null
	}	

	handleChange = (e) => {
		this.setState({
			answer: e.target.value
		});
	}

	keyDownHandlers = {
		ArrowLeft() {
			this.props.skip('prev')
		}, 

		ArrowRight() {
			this.props.skip('next')
		},

		ArrowDown(event) {
			this.handleSubmit(event)
		}
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
  		if (this.keyDownHandlers[event.key]) {
    		this.keyDownHandlers[event.key].call(this, event)
  		}
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

	render() {
		return(
			<div className="input-group">
			    
			    <form onSubmit={this.handleSubmit}>
			    <input autoFocus={true} 
			    	   ref="answerbox"
			    	   value={this.state.answer}
			    	   onChange={this.handleChange}
			    	   onKeyDown={::this.handleKeyDown}
			    	   type="text" 
			    	   className="form-control"/>
			   	</form>
			   	<span className="input-group-btn">
			   		<button className="btn help_btn" type="button">Answer</button>
			   	</span>
			</div>
		);
	}
}