import React, { Component, PropTypes } from 'react';

export default class ConceptHeader extends Component {
	static propTypes = {
	}

	render() {
		// debugger
		const { term } = this.props;
		let term_name;
		if(term == undefined) return;
		term_name = term.target;
		return(
			<div className="concept_header">
				<h4 className="search_query">{term_name}</h4>
			</div>
		);
	}
}