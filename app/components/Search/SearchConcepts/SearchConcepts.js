import React, { Component, PropTypes } from 'react';

import FactList from './FactList';

import ConceptHeader from './ConceptHeader';
import DefinitionList from './DefinitionList';

import ExampleItem from './ExampleItem';
import ExampleList from './ExampleList';

import RelatedList from './RelatedList';

import NullSearchResults from '../NullResults/NullSearchResults';

/* SCSS styles */
require('./SearchConcepts.scss');

export default class SearchConcepts extends Component {
	static propTypes = {
	}

	render() {
		const { definitions, examples, facts, related } = this.props;
		return(
			<div className="search_concept_container">
				{
					(definitions == null || definitions.length === 0) 
					&& (examples == null || examples.length === 0)
					&& (facts == null || facts.length === 0)
					?
					<NullSearchResults {...this.props}/>
					: null
				}
				{
					definitions !== null && definitions.length > 0
					?
					<div className="spotlight_search">
						<ConceptHeader {...this.props} />
						<DefinitionList {...this.props}/>
					</div>
					: null
				}
				{
					facts !== null && facts.length > 0
					&&
					<FactList facts={facts} />
				}
				{
					(examples !== null && examples.length > 0) &&  (definitions !== null && definitions.length > 0) 
					?
					<ExampleList {...this.props}/>
					: null
				}
				{
					related !== null && related.length > 0
					? <RelatedList {...this.props}/>
					: null
				}
			</div>
		);
	}
}