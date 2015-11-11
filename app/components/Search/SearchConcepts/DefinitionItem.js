import React, { Component, PropTypes } from 'react';

export default class DefinitionItem extends Component {
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

// <p className="def_index">{index + 1}</p>