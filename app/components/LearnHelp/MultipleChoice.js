import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

class MultiChoiceItem extends Component {
	render() {
		const { choice } = this.props;
		return(
			<li className="mc_item"><span>{choice}</span></li>
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
				<ul className="mc_choices">
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
