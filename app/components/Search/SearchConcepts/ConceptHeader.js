import React, { Component, PropTypes } from 'react';

export default class ConceptHeader extends Component {
	static propTypes = {
	}

	render() {
		return(
			<div className="concept_header">
				<h4 className="search_query">Search query</h4>
				<ul className="subject_list">
					<li className="subject">
						subject
					</li>
					<li className="subject">
						subject
					</li>
				</ul>
			</div>
		);
	}
}