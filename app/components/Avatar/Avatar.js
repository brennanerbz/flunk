import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
const styles = require('./Avatar.scss');

import BubbleDropdown from '../BubbleDropdown/BubbleDropdown';

export default class Avatar extends Component {
	static propTypes = {
		
	}

	state = {
		dropdown_active: false
	}

	computePos() {
		const node = this.refs.target;
		let pos = node.getComputedStyle()
		return pos;
	}

	render() {
		const { is_create_set, user, pushState } = this.props;
		return(
			<span ref="target" className={classnames('bubble_dropdown_target', {"active": this.state.active})}>
				<button style={{paddingLeft: '0'}} 
					 	className="button button-borderless button-outline"
					 	onClick={() => {
					 		this.setState({dropdown_active: !this.state.dropdown_active})
					 	}}
					 	>
					<div className={classnames(
						{'inline-avatar': is_create_set}
						)}>
						<a className="user_name">
							<img src="https://cdn-images-1.medium.com/fit/c/72/72/0*Un7eHMAQh62QX1LO.jpg" className="avatar-img"/>
							{ !is_create_set && <span className="">{user.username}</span> }
						</a>
					</div>
				</button>
				{
					this.state.dropdown_active
					&&
					<BubbleDropdown 
						parentStyle={::this.computePos}
					/>
				}
			</span>
		);
	}
}