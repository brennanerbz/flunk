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
		const { showCorrect, showCompletedSeq, trial, slots, current_slot } = this.props;
		return(
			<div>
			 	<div className="learn_card">					
					<div className="">
						<p className="cue">
						{	
							typeof trial['cue'] == 'undefined'
							? null
							: trial['cue']
						}
						</p>
						<div className="help_divider">
							<hr className="separator"/>
							<i className="copy_only"/>
								<div className={classnames('help_divider_label', {'correct_answer': trial.difficulty == 'copy'})}>
									{ 
										trial.difficulty == 'mc' || trial.difficulty == 'nonemc'
										? "Multiple Choice"
										: null
									}
									{
										trial.difficulty == 'stem'
										? "Fill in the blank"
										: null
									}
									{
										trial.difficulty == 'copy' || trial.difficulty == 'peek'
										? 'Correct answer'
										: null
									}
								</div> 
						</div>
						{
							!showCorrect && !showCompletedSeq
							? <LearnHelp {...this.props}/>
							: null
						}						
						<LearnInput {...this.props}/>
					</div>
				</div>
			</div>
		);
	}
}


// <h4 className="card-title">Card title</h4>