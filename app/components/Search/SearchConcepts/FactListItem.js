import React, { Component, PropTypes } from 'react';

export default class FactListItem extends Component {
	static propTypes = {
		fact: PropTypes.object
	}

	renderCue(cue, term) {
		var re = new RegExp('('+term+')', 'gi'),
			cue = cue.replace(re, '<b>$1</b>'); 
		return { 
			__html:	cue
		}
	}

	render() {
		const { fact } = this.props;
		return(
			<li className="definition_item">
				<p className="definition"
				   dangerouslySetInnerHTML={::this.renderCue(fact.cue, fact.target)}>
				</p>
			</li>
		);
	}
}