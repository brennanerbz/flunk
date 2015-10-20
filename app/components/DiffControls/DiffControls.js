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
		const related = require('../../assets/related_terms.png'),
			  mc = require('../../assets/multiple_choice.png'),
			  true_false = require('../../assets/true_false.png'),
			  fill_blank = require('../../assets/fill_blank.png'),
			  copy_answer = require('../../assets/copy_answer.png');
		return(
			<span className="diff_controls">
				<button className="button button-primary">Hint</button>				
						
				<a className="toggle_btn"
				   ref="multiple_choice"				   
				   title="Multiple choice"
				   data-toggle="tooltip" 
				   data-placement="bottom" >
					<i className="">
						<img className="diff_icon multiple_choice" src={mc}/>
					</i>					
				</a>
				<a className="toggle_btn"
				   title="True or False"
				   data-toggle="tooltip" 
				   data-placement="bottom">
					<i className="">
						<img className="diff_icon true_false" src={true_false}/>
					</i>					
				</a>		
				<a className="toggle_btn"
				   title="Fill in the blank"
				   data-toggle="tooltip" 
				   data-placement="bottom">
					<i className="">
						<img className="diff_icon fill_blank" src={fill_blank}/>
					</i>					
				</a>
				<a className="toggle_btn"
				   title="Copy answer"
				   data-toggle="tooltip" 
				   data-placement="bottom">
					<i className="">
						<img className="diff_icon copy_answer" src={copy_answer}/>
					</i>					
				</a>
			</span>
		);
	}
}

// <a className="toggle_btn">
// 	<i className="">
// 		<img className="diff_icon related_terms" src={related}/>
// 	</i>					
// </a>