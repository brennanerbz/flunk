import React, { Component, PropTypes } from 'react';

import ConceptHeader from './ConceptHeader';
import DefinitionList from './DefinitionList';
import FactList from './FactList';
import ExampleList from './ExampleList';


export default class ItemSectionContainer extends Component {
	static propTypes = {
	}

	state = {
		term: null,
		subjects: null,
		definitions: [],
		facts: [],
		examples: []
	}

	componentDidMount() {
		const { section } = this.props;
		this.setState({
			term: section[0].item.target,
			subjects: section[0].item.subjects
		})
		let item;
		section.forEach(i => {
			item = i.item;
			if(item.type == 'definition') {
				this.setState({
					definitions: this.state.definitions.push(item)
				})
			}
			if(item.type == 'fact') {
				this.setState({
					facts: this.state.facts.push(item)
				})
			}
			if(item.type == 'example') {
				this.setState({
					examples: this.state.examples.push(item)
				})
			}
		})
	}

	render() {
		return(
			<div className="item_section_container">
				{
					this.state.term !== null
					&&
					<ConceptHeader 
						subjects={this.state.subjects}
						term={this.state.term}
					/>
				}
				{
					this.state.definitions.length > 0
					&&
					<DefinitionList 
						definitions={definitions}
						query={this.props.query}
						term={this.state.term}/>
				}
				{
					this.state.facts.length > 0
					&&
					<FactList 
						facts={facts}
						query={this.props.query}
						term={this.state.term}/>
				}
				{
					this.state.examples.length > 0
					&&
					<ExampleList 
						examples={examples}
						query={this.props.query}
						term={this.state.term}/>
				}
			</div>
		);
	}
}