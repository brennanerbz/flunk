import React, { Component, PropTypes } from 'react';

export default class ConceptHeader extends Component {
	static propTypes = {
	}

	render() {
		const { items, query } = this.props,
			    item = items[0]
		return(
			<div className="concept_header">
				<h4 className="search_query">{item.target}</h4>
			</div>
		);
	}
}