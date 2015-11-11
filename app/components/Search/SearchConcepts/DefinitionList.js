import React, { Component, PropTypes } from 'react';
import DefinitionItem from './DefinitionItem';

export default class DefinitionList extends Component {
	static propTypes = {
	}

	render() {
		const { items } = this.props;
		let sliced_items = items.slice(0, 3),
			item = sliced_items[0]
		return(
			<div className="definition_list_container">
				<ul className="definition_list">
					{
						sliced_items.map((x, i) => {
							return (
								<DefinitionItem index={i} key={i} content={x} {...this.props} />
							);
						})
					}
				</ul>
				<ul className="subject_list">
					<li className="subject_label">subjects:</li>
					{
						item.subjects.map((sub, i) => {
							return <li key={i} className="subject">{sub.name}</li>
						})
					}
				</ul>
			</div>
		);
	}
}

