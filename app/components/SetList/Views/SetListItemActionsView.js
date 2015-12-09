import React, { Component, PropTypes } from 'react';
import BubbleDropDown from '../../BubbleDropDown/BubbleDropDown';

export default class SetListItemActionsView extends Component {
	static propTypes = {
	}

	render() {
		return(
			<div className="more_actions">
				<img className="placeholder"/>
				<div className="more_actions_button">
					<button
						className="button outline"
						anchor_bottom={false}
						arrow_position="top"
						autoFocus={false}
						bubbleDropDownHidden={false}
						bubbleDropDownShown={false}
						position="fixed"
						show_arrow="true"
						vertical_displacement={0}
						horizontal_displacement={0}
					>
					</button>
				</div>
			</div>
		);
	}
}