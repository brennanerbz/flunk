import React, { Component, PropTypes } from 'react';
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
		const { definitions, examples, related } = this.props;
		return(
			<div className="search_concept_container">
				{
					(definitions == null || definitions.length === 0) && (examples == null || examples.length === 0)
					?
					<NullSearchResults {...this.props}/>
					: null
				}
				{
					definitions !== null && definitions.length > 0
					?
					<div className="spotlight_search">
						{
							definitions !== undefined 
							?
							<ConceptHeader {...this.props} />
							: null
						}
						<DefinitionList {...this.props}/>
					</div>
					: null
				}
				{
					(examples !== null && examples.length > 0) &&  (definitions !== null && definitions.length > 0) 
					?
					<ExampleList {...this.props}/>
					: null
				}
				{
					(examples !== null && examples.length > 0) && (definitions == null || definitions.length === 0)
					? 
					<div>
						<div className="spotlight_search">
							<ExampleItem content={examples[0]} solo={true} {...this.props}/>
						</div>
						<ExampleList spotlight={true} {...this.props}/>
					</div>
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