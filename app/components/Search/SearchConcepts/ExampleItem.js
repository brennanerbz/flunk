import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

export default class ExampleItem extends Component {
	static propTypes = {
	}

	state = {
		should_render: true
	}

	renderExample(example, term) {
		example = example.replace(new RegExp('(^|\\s)(' + term + ')(\\s|$)','ig'), '$1<b>$2</b>$3')
		return {
			__html: example
		}
	}

	render() {
		const { content, index, solo } = this.props;
		return(
			<div>
				{	
					content !== null 
					? 
					<li className={classnames("definition_item", { "only_child": solo } )}>
						<p className="definition" 
						   dangerouslySetInnerHTML={::this.renderExample(content.cue, content.target)}></p>
					</li>
					: null
				}
			</div>
		);
	}
}

// { 
// 	!solo
// 	?
// 	<span className="source">{content.creator.username}</span>
// 	: null
// }