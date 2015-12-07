import React, { Component, PropTypes } from 'react';
import ExampleItem from './ExampleItem';

export default class ExampleList extends Component {
	static propTypes = {
	}

	state = {
	}

	render() {
		const { examples } = this.props;
		return(
			<div className="concept_result_container">
				<p className="example_label">Examples:</p>
				<ul className="example_list">
					{
						examples.map((x, i) => {
							return (
								<ExampleItem 
									index={i} 
									key={i} 
									example={x}
								/>
							);
						})
					}
				</ul>
			</div>
		)
	}
}