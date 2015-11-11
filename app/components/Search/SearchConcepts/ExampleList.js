import React, { Component, PropTypes } from 'react';
import ExampleItem from './ExampleItem';

export default class ExampleList extends Component {
	static propTypes = {
	}

	render() {
		const { items } = this.props; // TODO: soon to be in-context-example
		let sliced_items = items.slice(0, 3),
			item = sliced_items[0]
		return(
			<div className="example_list_container">
				<ul className="example_list">
					{
						sliced_items.map((x, i) => {
							return (
								<ExampleItem index={i} key={i} content={x} {...this.props} />
							);
						})
					}
				</ul>
			</div>
		)
	}
}