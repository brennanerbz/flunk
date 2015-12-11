import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

import ViewerAvatar from '../Avatar/ViewerAvatar';
import SpriteDiv from '../Sprite/SpriteDiv';

require('./Dropdown.scss');
export default class BubbleDropdown extends Component {
	static propTypes = {
	}

	state = {
		dropdown_style: {
			display: 'inline-block',
			top: 0,
			left: 0
		}
	}

	hide() {
		const { hideDropdown } = this.props;
		$(document).click((event) => { 
		    if(!$(event.target).closest(this.refs.bubble).length) {
		        if($(this.refs.bubble).is(":visible")) {
		            hideDropdown()
		        }
		    }        
		})
	}

	componentDidMount() {
		this.computePos()
		window.addEventListener('click', ::this.hide)
	}

	componentWillUnmount() {
		window.removeEventListener('click', ::this.hide)
	}

	computePos() {
		const node = this.props.target_node;
		let parent_pos = node.getBoundingClientRect(),
			bubble_pos = this.refs.bubble.getBoundingClientRect()
		if(this.props.set_list_item) {
			this.setState({
				dropdown_style: {
					top: parent_pos.height + 10 + 'px',
					left: parent_pos.right - bubble_pos.right + 'px'
				}
			})
			return;
		}
		this.setState({
			dropdown_style: {
				top: parent_pos.height + 'px',
				left: parent_pos.right - bubble_pos.right + 'px'
			}
		})
	}

	render() {
		return(
			<div ref="bubble" style={this.state.dropdown_style} 
				className={classnames("bubble_dropdown", 
					{ 'header_menu': this.props.header_menu },
					{ 'top_right': this.props.header_menu || this.props.set_list_item },
					{ 'far_right': this.props.set_list_item }
				)}>
				<BubbleDropdownContents 
					anchor_bottom={false}
					arrow_position='top'
					show_arrow={true}
					{...this.props}
				/>
			</div>
		);
	}
}


class BubbleDropdownContents extends Component {
	static propTypes = {

	}

	state = {
		
	}

	renderSetDropdown() {
		let actions = ['Learn', 'Open', 'Edit', 'Delete']
		return(
			<ul className="set_actions_list">
				{
					actions.map(action => {
						return (
							<li className="set_action" key={action}>
								<a className="">
									<SpriteDiv
										name={action.toLowerCase()}
										text={action}
									/>
								</a>	
							</li>
						)
					})
				}
			</ul>
		)
	}

	renderAccountDropdown() {
		const { user } = this.props,
				defaultAvatar = require('../../assets/defaultAvatar.png')
		return (
			<div className="account_dropdown">
				<div className="title clickable"
					onClick={() => {
						this.props.pushState(null, `/profile/${user.id}`)
						this.props.hideDropdown()
					}}>
					<div className="avatar_container">
						<ViewerAvatar 
							defaultAvatar={defaultAvatar}
							photoUrl=""
							dimension={24}
						/>
					</div>
					<div className="name_container">
						<span className="name">
							{user.username}
						</span>
					</div>
				</div>
				<ul>
					<li className="divider">
					</li>
					<li className="first_standalone"
						onClick={() => {
							this.props.pushState(null, '/settings')
							this.props.hideDropdown()
						}}>
						<a className="standalone">
						Settings
						</a>
					</li>
					<li onClick={() => {
						this.props.logOut(this.props.pushState)
						this.props.hideDropdown()
					}}>
						<a className="standalone">
						Log out
						</a>
					</li>
				</ul>
			</div>
		)
	}

	render() {
		return(
			<div>
				{
					this.props.header_menu
					&& ::this.renderAccountDropdown()
				}
				{
					this.props.set_list_item
					&& ::this.renderSetDropdown()
				}
				{
					this.props.show_arrow
					&&
					<div>
						<div className="bubble_arrow_border"></div>
						<div className="bubble_arrow"></div>
					</div>
				}
			</div>
		);
	}
}