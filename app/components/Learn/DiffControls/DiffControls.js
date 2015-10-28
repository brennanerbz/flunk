import React, { Component, PropTypes } from 'react';
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

	render() {
		const more = require('../../../assets/more_icon.png');		  
		return(
			<span className="diff_controls">
				<button className="button button-primary">Hint</button>
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
