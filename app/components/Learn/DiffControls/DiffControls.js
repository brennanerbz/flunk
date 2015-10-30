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

	render() {
		const more = require('../../../assets/more_icon.png'),
			  trial_augs = this.props.trial !== undefined ? this.props.trial.augs : null,
			  slot_augs = this.props.trials !== undefined ? this.props.current_slot.augs : null	  
		return(
			<span className="diff_controls">
				<button className={classnames("button button-primary", 
						{"disabled": trial_augs !== null && trial_augs.length === 0 ? true : false})}
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
