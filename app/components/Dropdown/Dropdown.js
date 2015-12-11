import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

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
				className={classnames("bubble_dropdown", {
					'header_menu': this.props.header_menu
				})}>
				<BubbleDropdownContents 
					anchor_bottom={false}
					arrow_position='top'
					show_arrow={true}
					parent_style={this.state.parent_style}
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

	render() {
		return(
			<div>
				<h1>Bubble</h1>
			</div>
		);
	}
}