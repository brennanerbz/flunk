import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

export default class ExampleItem extends Component {
	static propTypes = {
	}

	state = {
	}

	renderExample(ex, term, query) {
		if(ex == null) return {__html: null}
		ex = ex
		.replace(term, `<i>${term}</i>`)
		.replace(query, `<b>${query}</b>`) 
		return {
			__html: ex
		}
	}

	render() {
		const { example, index, query } = this.props;
		return(
			<li className={classnames("example_item")}>
				<p className="example"
				   dangerouslySetInnerHTML={
				   	::this.renderExample(
				   		definition.cue,
				   		definition.target,
				   		query
				   	)
				   }></p>
			</li>
		);
	}
}

