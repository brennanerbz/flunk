import React, { Component, PropTypes } from 'react';
import DefinitionItem from './DefinitionItem';

export default class DefinitionList extends Component {
	static propTypes = {
	}

	render() {
		const { definitions } = this.props;
		return( 
			<div className="definition_list_container">
				<ul className="definition_list">
					{
						definitions.map((x, i) => {
							return (
								<DefinitionItem 
									index={i} 
									key={i} 
									definiton={x}
									/>
							);
						})
					}
				</ul>
			</div>
		);
	}
}

