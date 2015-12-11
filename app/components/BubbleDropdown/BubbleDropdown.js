import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

export default class BubbleDropdown extends Component {
	static propTypes = {
	}

	componentDidMount() {
		const { parentStyle } = this.props;
		let style = parentStyle()
		console.log(style)
	}

	render() {
		return(
			<div className="bubble_dropdown_container">
				<BubbleDropdownContents 
					anchor_bottom={false}
					arrow_position='top'
					show_arrow={true}
					target_node=""
				/>
			</div>
		);
	}
}

class BubbleDropdownContents extends Component {
	static propTypes = {

	}

	state = {
		dropdown_style: {
			display: 'inline-block',
			top: 0,
			left: 0
		}
	}

	render() {
		return(
			<div className={classnames("bubble_dropdown")}>
				<h1>Bubble</h1>
			</div>
		);
	}
}