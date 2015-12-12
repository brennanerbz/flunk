import React, { Component, PropTypes } from 'react';
import SetListItemView from '../Views/SetListItemView';
import Modal from '../../Modal/modal';

export default class SetListItemContainer extends Component {
	static propTypes = {
		assignment: PropTypes.object
	}

	state = {
		hovering: false,
		modal_type: null,
		modal_is_open: false
	}

	// handle methods

	render() {
		let root_route;
		return(
			<div>
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
						this.setState({
							modal_type: 'share',
							modal_is_open: true
						})
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
				<Modal 
					open={this.state.modal_is_open}
					closeModal={() => {this.setState({modal_is_open: false})}}
					type={this.state.modal_type}
					set={this.props.assignment.set}
				/>
			</div>
		);
	}
}