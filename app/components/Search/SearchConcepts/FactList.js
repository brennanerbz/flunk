import React, { Component, PropTypes } from 'react';
import FactListItem from './FactListItem';

export default class FactList extends Component {
	static propTypes = {
		facts: PropTypes.array
	}

	render() {
		const { facts } = this.props;
		return(
			<div className="concept_result_container">
				<h2>Facts:</h2>
				<ul className="fact_list">
					{
						facts.map((fact, i) => {
							return <FactListItem key={i} fact={fact} />
						})
					}
				</ul>
			</div>
		);
	}
}