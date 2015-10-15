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

		console.log("React:" + reaction_time + "Resp:" + response_time)
		adapt(answer, reaction_time, response_time)
		this.setState({
			answer: '',
			reaction_time: null
		});
	}

	componentWillReceiveProps() {
		this.refs.answerbox.focus()
	}

	render() {
		return(
			<div className="input-group">
			    <span className="input-group-btn">
			    	<button className="btn help_btn" type="button">?</button>
			    </span>
			    <form onSubmit={this.handleSubmit}>
			    <input autoFocus={true} 
			    	   ref="answerbox"
			    	   value={this.state.answer}
			    	   onChange={this.handleChange}
			    	   onKeyDown={this.handleReactionTime}
			    	   type="text" 
			    	   className="form-control"/>
			   	</form>
			</div>
		);
	}
}