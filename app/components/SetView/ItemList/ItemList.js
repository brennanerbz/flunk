import React, { Component, PropTypes } from 'react';
require('./ItemList.scss');
import Item from './Item';

export default class ItemList extends Component {
	static propTypes = {
	}

	render() {
		const { set } = this.props;
		return(
			<div className="item_list_container">
				<p className="item_count_label">Items: <span className="item_count">{set.item_count}</span></p>
				<ul className="item_list">
					{set.items.map((item, i) => {
						return <Item key={i} item={item}/>
					})}
				</ul>
			</div>
		);
	}
}