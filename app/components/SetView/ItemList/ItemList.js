import React, { Component, PropTypes } from 'react';
require('./ItemList.scss');
import Item from './Item';

export default class ItemList extends Component {
	static propTypes = {
	}

	renderEditLink(assignment, set, user) {
		if(assignment.permission == 'nonadmin') return true
		if(assignment.permission == 'admin' && set.creator_id == user.id) return true
	}

	render() {
		const { item_count, items, associations, assignment, pushState, set, user } = this.props;
		let sorted_asssociations = associations.sort((a, b) => {
			return a.order - b.order
		})
		return(
			<div className="item_list_container">
				<p className="item_count_label">Terms: <span className="item_count">{item_count}</span></p>
				{
					::this.renderEditLink(assignment, set, user) 
					?
					<a  className="item_actions"
					    onClick={() => pushState(null, `/createset/${set.id}`)}>
						Edit
					</a>
					: null
				}
				
				<ul className="item_list">
					{sorted_asssociations.map((asc, i) => {
						return <Item key={i} item={asc.item} {...this.props}/>
					})}
				</ul>
			</div>
		);
	}
}