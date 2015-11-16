import React, { Component, PropTypes } from 'react';
require('./ItemList.scss');
import Item from './Item';

export default class ItemList extends Component {
	static propTypes = {
	}

	render() {
		const { item_count, items, associations, pushState, set } = this.props;
		let sorted_asssociations = associations.sort((a, b) => {
			return a.order - b.order
		})
		return(
			<div className="item_list_container">
				<p className="item_count_label">Terms: <span className="item_count">{item_count}</span></p>
				<a className="item_actions"
				   onClick={() => pushState(null, `/createset/${set.id}`)}>Edit</a>
				<ul className="item_list">
					{sorted_asssociations.map((asc, i) => {
						return <Item key={i} item={asc.item}/>
					})}
				</ul>
			</div>
		);
	}
}