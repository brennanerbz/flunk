import React, { Component, PropTypes } from 'react';
import ConceptHeader from './ConceptHeader';
import DefinitionList from './DefinitionList';

import ExampleList from './ExampleList';

/* SCSS styles */
require('./SearchConcepts.scss');

export default class SearchConcepts extends Component {
	static propTypes = {
	}

	render() {
		const { items } = this.props;
		return(
			<div className="search_concept_container">
				<div className="spotlight_search">
					{
						items !== undefined 
						?
						<ConceptHeader {...this.props} />
						: null
					}
					<DefinitionList {...this.props}/>
				</div>
				<ExampleList {...this.props}/>
			</div>
		);
	}
}