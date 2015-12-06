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
		return(
			<SetListItemView 
				section={this.props.section}
				assignment={this.props.assignment}
				handleClick=""
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