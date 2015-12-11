import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

import ViewerAvatar from '../Avatar/ViewerAvatar';

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

	componentDidMount() {
		this.computePos()
	}

	computePos() {
		const node = this.props.target_node;
		let parent_pos = node.getBoundingClientRect(),
			bubble_pos = this.refs.bubble.getBoundingClientRect()
		console.log(parent_pos)
		console.log(bubble_pos)
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
					{ 'top_right': this.props.header_menu }
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

	renderAccountDropdown() {
		return (
			<div className="account_dropdown">
				<div className="title">
					<div className="avatar_container clickable">
						<ViewerAvatar 
							defaultAvatar=""
							photoUrl=""
							dimension={24}
						/>
					</div>
				</div>
				<ul>
					<li className="first_standalone">
						<a className="standalone">
						Settings
						</a>
					</li>
					<li>
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