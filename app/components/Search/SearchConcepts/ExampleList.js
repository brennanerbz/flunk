import React, { Component, PropTypes } from 'react';
import ExampleItem from './ExampleItem';

export default class ExampleList extends Component {
	static propTypes = {
	}

	state = {
		should_render_list: true
	}

	render() {
		const { items } = this.props; // TODO: soon to be in-context-example
		let sliced_items = items.slice(0, 3),
			item = sliced_items[0]
		return(
			<div className="example_list_container">
				{
					this.state.should_render_list
					?
					<div>
						<p className="example_label">Examples:</p>
						<ul className="example_list">
							{
								sliced_items.map((x, i) => {
									return (
										<ExampleItem index={i} 
													 key={i} 
													 content={x}
													 {...this.props} />
									);
								})
							}
						</ul>
					</div>
					: null
				}
				
			</div>
		)
	}
}