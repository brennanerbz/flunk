import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
require('./DiffControls.scss');

export default class DiffControls extends Component {
	static propTypes = {
	}

	componentDidMount() {		
		$('[data-toggle="tooltip"]').tooltip({
			delay: { show: 1000, hide: 50},
			template: '<div class="tooltip bottom_tool" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>'
		})
	}

	getHint() {
		console.log("hint coming...")
		this.props.hint()
	}

	shouldRenderHintButton() {
		const trial_hints  = this.props.trial !== undefined ? this.props.trial.augs : null,
			  slot_hints = this.props.current_slot !== undefined ? this.props.current_slot.augs : null,
			  current_hint = trial_hints !== null ? trial_hints[0] : '';
		if((trial_hints && slot_hints) !== null) {
			if(slot_hints.length === 0) {
				return true;
			}
			if(slot_hints.slice(-1)[0].indexOf(trial_hints[0]) !== -1) {
				return true;
			}
		}
	}

	render() {
		const more = require('../../../assets/more_icon.png'),
			  trial_augs = this.props.trial !== undefined ? this.props.trial.augs : null,
			  slot_augs = this.props.trials !== undefined ? this.props.current_slot.augs : null,
			  shouldshow = ::this.shouldRenderHintButton();  
		return(
			<span className="diff_controls">
				<button className={classnames("button button-primary", 
						{"disabled": shouldshow})}
					    onClick={::this.getHint}>Hint</button>
				<a className="toggle_btn"
				   ref="more_actions"				   
				   title="More actions"
				   data-toggle="tooltip" 
				   data-placement="bottom" >
					<i className="">
						<img className="diff_icon" src={more}/>
					</i>					
				</a>				
			</span>
		);
	}
}
