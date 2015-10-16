import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

class MultiChoiceItem extends Component {
	render() {
		const { choice } = this.props;
		return(
			<li className="list-group-item">{choice}</li>
		);
	}
}

export default class MultipleChoice extends Component {
	static propTypes = {
		choices: PropTypes.string
	}

	render() {
		const { choices } = this.props;
		let parsed_choices;
		if(choices !== null || typeof choices !== undefined) { parsed_choices = choices.split("|") }
		return (
			<div>
				<p className="diff_label">Multiple choice:</p>
				<ul className="list-group">
					{
						parsed_choices !== undefined
						? parsed_choices.map((choice, i) => <MultiChoiceItem key={i} choice={choice}/>)
						: null
					}
				</ul>
			</div>
		);
	}
}
