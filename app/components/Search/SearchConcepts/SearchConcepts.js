import React, { Component, PropTypes } from 'react';
import ConceptHeader from './ConceptHeader';
import DefinitionList from './DefinitionList';

/* SCSS styles */
require('./SearchConcepts.scss');

export default class SearchConcepts extends Component {
	static propTypes = {
	}

	render() {
		return(
			<div className="search_concept_container">
				<ConceptHeader/>
				<DefinitionList/>
			</div>
		);
	}
}