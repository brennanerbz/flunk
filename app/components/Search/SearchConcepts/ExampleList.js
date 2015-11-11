import React, { Component, PropTypes } from 'react';
import ExampleItem from './ExampleItem';

export default class ExampleList extends Component {
	static propTypes = {
	}

	state = {
		should_render_list: true
	}

	componentWillMount() {
		const { examples, solo } = this.props; // TODO: soon to be in-context-example
		let sliced_examples, example;
		if(solo) {
			sliced_examples = examples.slice(1, 4)
		} else {
			sliced_examples = examples.slice(0, 3)
		}
		if(sliced_examples == undefined || sliced_examples.length == 0) this.setState({should_render_list: false});
	}

	render() {
		const { examples, solo } = this.props; // TODO: soon to be in-context-example
		let sliced_examples, example;
		if(solo) {
			sliced_examples = examples.slice(1, 4)
		} else {
			sliced_examples = examples.slice(0, 3)
		}
		return(
			<div className="example_list_container">
				{
					this.state.should_render_list
					?
					<div>
						<p className="example_label">Examples:</p>
						<ul className="example_list">
							{
								sliced_examples.map((x, i) => {
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