import React, { Component, PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

export default class LearnCue extends Component {
	static propTypes = {
		cue: PropTypes.string
	}

	shouldComponentUpdate(nextProps) {
		return this.props.cue == nextProps.cue
	}

	render() {
		const { cue, current_slot } = this.props;
		return(
			// <ReactCSSTransitionGroup transitionName="" 
			// 					     transitionEnterTimeout={500} 
			// 					     transitionLeaveTimeout={500}>
			<div>
			{
				cue !== (undefined || null)
				? <p key={current_slot.id} className="cue">{cue}</p>
				: null
			}
			</div>
		 	// </ReactCSSTransitionGroup>
		);
	}
}