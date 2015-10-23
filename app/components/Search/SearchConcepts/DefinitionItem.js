import React, { Component, PropTypes } from 'react';

export default class DefinitionItem extends Component {
	static propTypes = {
	}

	render() {
		const { content } = this.props;
		return(
			<li className="definition_item">	
				<p className="definition">{content} is an almond-shape set of neurons shown to play a key role in the processsing of emotions, the amygdala forms part of the limbic system. </p>
				<span className="source">Source</span>
			</li>
		);
	}
}