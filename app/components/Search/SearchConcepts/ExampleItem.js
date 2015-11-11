import React, { Component, PropTypes } from 'react';

export default class ExampleItem extends Component {
	static propTypes = {
	}

	state = {
		should_render: true
	}

	componentDidMount() {
		if(this.props.content.cue.indexOf(this.props.content.target) == -1) { 
			this.setState({ should_render: false });
			this.props.emptyExamples()
		}
	}

	renderExample(example, term) {
		let index = example.indexOf(term),
			beg_example,
			end_example;
		if(index !== -1) {
			beg_example = example.replace(term, "").slice(0, index),
			end_example = example.replace(term, "").slice(index += term.length)
		} else {
			return;
		}
		return(
			<p className="definition">{beg_example}<b>{term}</b>{end_example}</p>
		)
	}

	render() {
		const { content, index } = this.props;
		return(
			<div>
				{	
					this.state.should_render
					? 
					<li className="definition_item">
						{ ::this.renderExample(content.cue, content.target) }
					</li>
					: null
				}
			</div>
		);
	}
}