import React, { Component, PropTypes } from 'react';
import DefinitionItem from './DefinitionItem';

export default class DefinitionList extends Component {
	static propTypes = {
	}

	render() {
		return(
			<div className="definition_list_container">
				<ul className="definition_list">
					{
						Array.apply(null, Array(5)).map((x, i) => {
							return (
								<DefinitionItem key={i} content={i} {...this.props} />
							);
						})
					}
				</ul>
			</div>
		);
	}
}

