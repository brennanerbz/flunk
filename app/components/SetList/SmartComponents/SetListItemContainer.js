import React, { Component, PropTypes } from 'react';
import SetListItemView from '../Views/SetListItemView';

export default class SetListItemContainer extends Component {
	static propTypes = {
		assignment: PropTypes.object
	}

	state = {
		hovering: false
	}

	// handle methods

	render() {
		let root_route;
		return(
			<SetListItemView 
				section={this.props.section}
				assignment={this.props.assignment}
				mouseOver={() => {
					this.setState({hovering: true})
				}}
				mouseLeft={() => {
					this.setState({hovering: false})
				}}
				mouseIsOver={this.state.hovering}
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
				handleShare={() => {

				}}
				handleLearn={() => {

				}}
				handleOpen={() => {
					
				}}
				handleEdit={() => {
					
				}}
				handleDelete={() => {
					
				}}
			/>
		);
	}
}