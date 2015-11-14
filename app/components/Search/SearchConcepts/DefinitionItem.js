import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

export default class DefinitionItem extends Component {
	static propTypes = {
	}

	renderDef(def, term) {
		if(def == null) return {__html: null}
		def = def.replace(new RegExp('(^|\\s)(' + term + ')(\\s|$)','ig'), '$1<b>$2</b>$3') 
		return {
			__html: def
		}
	}

	render() {
		const { content, index, solo } = this.props;
		return(
			<li className={classnames("definition_item", 
							 {"only_child": solo})}>
				<p className="definition"
				   dangerouslySetInnerHTML={::this.renderDef(content.cue, content.target)}></p>
				<span className="source">{content.creator.username}</span>
			</li>
		);
	}
}

// <p className="def_index">{index + 1}</p>