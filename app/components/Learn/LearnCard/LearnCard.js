import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';
require('./LearnCard.scss');
import Controls from './LearnNavControls'
import Signs from './LearnSignPosting';
import LearnHelp from '../LearnHelp/LearnHelp';
import LearnInput from '../LearnInput/LearnInput';

export default class LearnCard extends Component {
	static propTypes = {
		
	}
	render() {
		const { showCorrect, 
				showCompletedSeq, 
				trial, 
				slots, 
				current_slot } = this.props;
		return(
			<div>
			 	<div className="learn_card">					
					<div className="">
						<div className="top_cue_container">
							{
								showCorrect
								? <h4 className="correct_label">
									Correct
								  </h4>
								: null
							}							
							<p className="cue">
							{	
								typeof current_slot.item.cue == undefined
								? null
								: current_slot.item.cue
							}
							</p>
							{
								showCorrect
								? null
								: <a className="dont_know_btn link"
							   		 onClick={console.log("TODO: link don\'t know to handleSubmit")}>
							  		 Don't know
								 </a>
							}						
						</div>
						<div className="help_divider">
							<hr className="separator"/>
							<i className="copy_only"/>
								<div className={classnames('help_divider_label')}>								
								</div> 
						</div>
						{
							!showCorrect && !showCompletedSeq
							? <LearnHelp {...this.props}/>
							: null
						}
						{
							showCorrect
							? null
							: <LearnInput {...this.props}/>
						}												
					</div>
				</div>
			</div>
		);
	}
}


// <h4 className="card-title">Card title</h4>