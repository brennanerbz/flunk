import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

export default class ConceptHeader extends Component {
	static propTypes = {
	}

	render() {
		// debugger
		const { term } = this.props;
		let term_name, subjects, subs = [], tag_icon = require('../../../assets/tag.png');
		if(term == undefined) return;
		term_name = term.target;
		subjects = term.subjects.slice(0, 3);
		subs;
	subjects.forEach(sub => {
		subs.push("#" + sub.name.toLowerCase())
	})
	return(
			<div className={classnames("concept_header", { "subjects": subjects.length > 0 })}>
				<h4 className="search_query">{term_name}</h4>
				{
					subjects !== null && subjects.length > 0
					?
					<ul className="subject_list">
						{
							subs.map((sub, i)=> {
								return (
									<li key={i} className="subject_item">{sub}</li>
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