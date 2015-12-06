import React, { Component, PropTypes } from 'react';
import SetListItemContainer from '../SmartComponents/SetListItemContainer';

export default class SetListView extends Component {
	static propTypes = {
		assignments: PropTypes.array // section of assignments
	}

	render() {
		
		return(
			<ul className="set_list">
				{
					this.props.assignments.map((assignment, i) => {
						return <SetListItemContainer 
								section={this.props.section}
								key={i} 
								assignment={assignment}/>
					})
				}
			</ul>
		);
	}
}