import React, { Component, PropTypes } from 'react';
import ConceptHeader from './ConceptHeader';
import DefinitionList from './DefinitionList';

import ExampleItem from './ExampleItem';
import ExampleList from './ExampleList';

import RelatedList from './RelatedList';

import NullSearchResults from './NullSearchResults';

/* SCSS styles */
require('./SearchConcepts.scss');

export default class SearchConcepts extends Component {
	static propTypes = {
	}

	state = {
		render_definitions: true,
		render_examples: true,
		render_related: true
	}

	componentWillMount() {
		const { definitions, examples, related } = this.props;
		if(definitions == undefined || definitions.length == 0) this.setState({ render_definitions: false });
		if(examples == undefined || examples.length == 0) this.setState({ render_examples: false });
		if(related == undefined || related.length == 0) this.setState({ render_related: false });
	}

	componentWillReceiveProps() {
		const { definitions, examples, related } = this.props;
		if(definitions == undefined || definitions.length == 0) this.setState({ render_definitions: false });
		if(examples == undefined || examples.length == 0) this.setState({ render_examples: false });
		if(related == undefined || related.length == 0) this.setState({ render_related: false });
	}

	render() {
		const { definitions, examples } = this.props;
		return(
			<div className="search_concept_container">
				{
					!this.state.render_definitions && !this.render_examples
					?
					<NullSearchResults {...this.props}/>
					: null
				}
				{
					this.state.render_definitions
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
					this.state.render_examples && this.state.render_definitions
					?
					<ExampleList {...this.props}/>
					: null
				}
				{
					this.state.render_examples && !this.state.render_definitions
					? 
					<div>
						<div className="spotlight_search">
							<ExampleItem content={examples[0]} solo={true} {...this.props}/>
						</div>
						<ExampleList solo={true} {...this.props}/>
					</div>
					: null
				}
				{
					this.state.render_related
					? <RelatedList {...this.props}/>
					: null
				}
			</div>
		);
	}
}