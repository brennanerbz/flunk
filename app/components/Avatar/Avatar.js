import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
const styles = require('./Avatar.scss');

import ViewerAvatar from './ViewerAvatar';
import BubbleDropdown from '../Dropdown/Dropdown';

export default class Avatar extends Component {
	static propTypes = {
		
	}

	state = {
		dropdown_active: false,
	}
	
	render() {
		const { is_create_set, user, pushState } = this.props,
			defaultAvatar = require('../../assets/defaultAvatar.png');
		return(
			<span style={{position: 'relative'}} className={classnames({"active": this.state.active})}>
				<button style={{paddingLeft: '0'}} 
						ref="target" 
					 	className="button button-borderless button-outline"
					 	onClick={() => {
					 		this.setState({dropdown_active: !this.state.dropdown_active})
					 	}}
					 	>
					<div className={classnames(
						{'inline-avatar': is_create_set}
						)}>
						<a className="user_name">
							<ViewerAvatar 
								defaultAvatar={defaultAvatar} 
								dimension={32} 
								photoUrl="" />

							{ !is_create_set
							 && <span className="">
							 {user.username}</span> }
							 
						</a>
					</div>
				</button>
				{
					this.state.dropdown_active
					&&
					<BubbleDropdown 
						target_node={this.refs.target}
						header_menu={true}
					/>
				}
			</span>
		);
	}
}