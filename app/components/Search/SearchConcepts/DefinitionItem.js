import React, { Component, PropTypes } from 'react';

export default class DefinitionItem extends Component {
	static propTypes = {
	}

	renderDef(def, target) {
		let index = def.indexOf(target),
			beg_example,
			end_example;
		if(index !== -1) {
			beg_example = def.replace(target, "").slice(0, index),
			end_example = def.replace(target, "").slice(index += target.length)
		} else {
			return;
		}
		return(
			<p className="definition">{beg_example}<b>{target}</b>{end_example}</p>
		)
	}

	render() {
		const { content, index } = this.props;
		return(
			<li className="definition_item">
				{::this.renderDef(content.cue, content.target)}
				<span className="source">{content.creator.username}</span>
			</li>
		);
	}
}

// <p className="def_index">{index + 1}</p>