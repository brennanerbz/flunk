import React, { Component, PropTypes } from 'react';

export default class ConceptHeader extends Component {
	static propTypes = {
	}

	render() {
		// debugger
		const { term } = this.props;
		let term_name, subjects, tag_icon = require('../../../assets/tag.png');
		if(term == undefined) return;
		term_name = term.target;
		subjects = term.subjects;
		return(
			<div className="concept_header">
				<h4 className="search_query">{term_name}</h4>
				{
					subjects !== null
					?
					<ul className="subject_list">
						<img src={tag_icon} className="icon"/>
						{
							subjects.map((sub, i)=> {
								return (
									<li key={i} className="subject_item">{sub.name}</li>
								)
							})
						}
					</ul>
				: null
				}
			</div>
		);
	}
}