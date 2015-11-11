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
								<DefinitionItem index={i} key={i} content={x} {...this.props} />
							);
						})
					}
				</ul>
				<ul className="subject_list">
				{
					subjects !== null && subjects.length > 0
					?
					<div>
					<li className="subject_label">subjects:</li>
						{	
							first_definition.subjects.map((sub, i) => {
								return <li key={i} className="subject">{sub.name}</li>
							})
						}
					</div>
					: null
				}
					
				</ul>
			</div>
		);
	}
}

