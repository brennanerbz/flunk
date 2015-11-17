import React, { Component, PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

export default class LearnCue extends Component {
	static propTypes = {
		cue: PropTypes.string
	}

	shouldComponentUpdate(nextProps) {
		return this.props.cue == nextProps.cue
	}

	renderCue(cue, target) {
		if(cue == null) return { __html: null }
		if(cue.toLowerCase().indexOf(target.toLowerCase()) == 0) {
			cue = cue.replace(new RegExp('(^|\\s)(' + target + ')(\\s|$)','ig'), 'What is ')
			cue = cue.replace(cue.slice(-1)[0], '?').replace("is is", 'is')
		}
		if(cue.toLowerCase().indexOf(target.toLowerCase()) !== -1) {
			cue = cue.replace(new RegExp('(^|\\s)(' + target + ')(\\s|$)','ig'), '$1<b class="blurry_text">&nbsp;$2&nbsp;</b>$3')
		}
		return {
			__html: cue
		}
	}

	render() {
		const { cue, current_slot } = this.props;
		let target = current_slot.association.item.target;
		return(
			// <ReactCSSTransitionGroup transitionName="" 
			// 					     transitionEnterTimeout={500} 
			// 					     transitionLeaveTimeout={500}>
			<div>
			{
				cue !== (undefined || null)
				? <p key={current_slot.id} className="cue" dangerouslySetInnerHTML={::this.renderCue(cue, target)}></p>
				: null
			}
			</div>
		 	// </ReactCSSTransitionGroup>
		);
	}
}