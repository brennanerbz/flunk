import React, { Component, PropTypes } from 'react';
import SetListItemView from '../Views/SetListItemView';

export default class SetListItemContainer extends Component {
	static propTypes = {
		assignment: PropTypes.object
	}

	state = {

	}

	// handle methods

	render() {
		let root_route;
		return(
			<SetListItemView 
				section={this.props.section}
				assignment={this.props.assignment}
				handleClick={() => {
					if(this.props.section == 'drafts') {
						root_route = 'createset'
					} else {
						root_route = 'set'
					}
					this.props.pushState(null, 
					`/${root_route}/${this.props.assignment.set.id}`
					)}
				}
				handleToggleSelect=""
				handleOpen=""
				handleDelete=""
				handleEdit=""
				handleCopy=""
				handleShare=""
			/>
		);
	}
}