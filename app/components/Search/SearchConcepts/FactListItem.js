import React, { Component, PropTypes } from 'react';

export default class FactListItem extends Component {
	static propTypes = {
		fact: PropTypes.object
	}

	renderFact(fact, term, query) {
		if(fact == null) return {__html: null}
		fact = fact
		.replace(term, `<i>${term}</i>`)
		.replace(query, `<b>${query}</b>`) 
		return {
			__html: fact
		}
	}

	render() {
		const { fact, index, query } = this.props;
		return(
			<li className="fact_item">
				<p className="fact"
				   dangerouslySetInnerHTML={
				   	::this.renderFact(
				   		fact.cue,
				   		fact.target,
				   		query
				   	)
				   }>
				</p>
			</li>
		);
	}
}