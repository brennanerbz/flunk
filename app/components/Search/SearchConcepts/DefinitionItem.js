import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

export default class DefinitionItem extends Component {
	static propTypes = {
	}

	renderDef(def, term, query) {
		if(def == null) return {__html: null}
		def = def
		.replace(term, `<i>${term}</i>`)
		.replace(query, `<b>${query}</b>`) 
		return {
			__html: def
		}
	}

	render() {
		const { definition, index, query } = this.props;
		return(
			<li className={classnames("definition_item")}>
				<p className="definition"
				   dangerouslySetInnerHTML={
				   	::this.renderDef(
				   		definition.cue,
				   		definition.target,
				   		query
				   	)
				   }></p>
			</li>
		);
	}
}
