import React, { Component, PropTypes } from 'react';

export default class ExampleItem extends Component {
	static propTypes = {
	}

	render() {
		const { content, index } = this.props;
		return(
			<li className="definition_item">
				<p className="definition">{content.cue}</p>
				<span className="source">{content.creator.username}</span>
			</li>
		);
	}
}