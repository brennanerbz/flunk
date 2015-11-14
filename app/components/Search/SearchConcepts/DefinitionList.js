import React, { Component, PropTypes } from 'react';
import DefinitionItem from './DefinitionItem';

export default class DefinitionList extends Component {
	static propTypes = {
	}

	render() {
		const { definitions } = this.props;
		if(definitions == undefined || definitions.length == 0) return <div></div>
		let sliced_definitions = definitions.slice(0, 3),
			first_definition = sliced_definitions[0],
			subjects = first_definition.subjects;
		return( 
			<div className="definition_list_container">
				<ul className="definition_list">
					{
						sliced_definitions.map((x, i) => {
							return (
								<DefinitionItem solo={sliced_definitions.length === 1} index={i} key={i} content={x} {...this.props} />
							);
						})
					}
				</ul>
			</div>
		);
	}
}

