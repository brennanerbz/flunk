import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';
import * as learnactions from '../../actions/learnv2';
import * as setactions from '../../actions/usersets';

import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

require('./Learn.scss');

/* Components */
import LearnCard from '../../components/Learn/LearnCard/LearnCard';
import ShowCorrect from '../../components/Learn/ShowCorrect/ShowCorrect';
import LearnInput from '../../components/Learn/LearnInput/LearnInput';
import LearnFeedback from '../../components/Learn/LearnFeedback/LearnFeedback';
import LearnHelp from '../../components/Learn/LearnHelp/LearnHelp';
import DiffControls from '../../components/Learn/DiffControls/DiffControls';
import Hint from '../../components/Learn/Hint/Hint';
import SeqControl from '../../components/Learn/LearnSeqControl/SeqControl';
import RoundSummary from '../../components/Learn/RoundSummary/RoundSummary';
import SequenceSummary from '../../components/Learn/SequenceSummary/SequenceSummary';

@connect(state => ({
	slot_index: state.learn.slot_index,
	miniseqs: state.learn.miniseqs,
	current_miniseq: state.learn.current_miniseq,
	cmi: state.learn.current_miniseq_index,
	isShowingCompleteMiniseq: state.learn.isShowingCompleteMiniseq,
	isUpdatingState: state.learn.isUpdatingState,

	showHint: state.learn.isShowingHint,
	isGrading: state.learn.isGrading,
	isFetchingTrials: state.learn.isFetchingTrials,
	showLearn: state.learn.isFetchingLearn,
	showCorrect: state.learn.isShowingCorrect,
	showCompletedSequence: state.learn.isShowingCompletedSequence,
	showFeedback: state.learn.isShowingFeedback,
	slots: state.learn.slots,
	current_slot: state.learn.current_slot,
	current_trial: state.learn.current_trial,
	trial: state.learn.trial,
	sets: state.sets.set_items
	}),
	dispatch => ({
		...bindActionCreators({
			...learnactions,
			...setactions
		}, dispatch)
	})
)
export default class Learn extends Component {
	static propTypes = {
		params: PropTypes.object
	}

	state = {
		flag: false,
		start: null,
		inputvalue: ''
	}

	componentWillMount() {
		const {fetchLearn, params } = this.props;
		fetchLearn(1, Number(params.id))
	}	

	componentDidMount() {
		$(window).on('keyup', ::this.handleKeyUp)
		
	}

	componentWillReceiveProps(nextProps){
		if(this.props.current_slot.id !== nextProps.current_slot.id) {
			this.setState({
				inputvalue: ''
			});
		}
	}

	componentWillUnmount() {
		$(window).off('keyup')
		const { clearLearn } = this.props;
		clearLearn()
	}

	keyDownHandlers = {
		37(event) {
			this.props.nextSlot('prev')
			return true;
		}, 

		39(event) {
			this.props.nextSlot('next')
			return true;
		},

		40(event) {
			if(!this.props.current_slot.completed) {
				this.refs.learn_card.sendEvent(event)
				return true;
			}
		},
		13(event) {
			const { current_slot, current_trial, isGrading, skipSlot } = this.props;
			var now, start, diff, difftwo;
			if(current_slot.format == 'copy' && this.state.inputvalue.length === 0) {
				now = new Date()
				now = (now).toISOString().replace("T", " ").replace("Z", "")
				start = (current_trial.start)
				diff = (moment(now).diff(start))
				if(diff > 1500) {
					skipSlot()
				}
				return;
			}			
			if(!current_slot.completed) {
				this.refs.learn_card.sendEvent(event)
				return true;
			}
			if(!isGrading && current_slot.completed) {
				skipSlot()
				return true;
			}
		}
	}

	handleArrowKeys(event) {
		if (this.keyDownHandlers[event.which]) {
    		return this.keyDownHandlers[event.which].call(this, event);
  		}
	}

	
	handleKeyUp(event) {
		const { showCorrect, 
			 	showCompletedSequence, 
			 	isGrading,
			 	isShowingCompleteMiniseq,
			 	newSequence,
			 	completeMiniSequence,
			 	skipSlot } = this.props;
		if(event.which && isShowingCompleteMiniseq) {
			completeMiniSequence()
			return;
		}
		if(event.which && showCompletedSequence) {
			newSequence(null)
			return;
		}
		if(event.which && showCorrect) {
			if(!this.handleArrowKeys(event)) {
				skipSlot()
				return;
			}
			return;
		}
		this.handleArrowKeys(event)
	}

	updateStateWithUserResponse(value) {
		this.setState({
			inputvalue: value
		});
	}

	handleUserResponse(response) {
		const { updateTrial } = this.props;
		updateTrial(response)
 	}

 	handleHint(event) {
 		const hint = {type: "hint"} 
 		this.refs.learn_card.sendEvent(event, hint)
 	}

 	handleGetHint(response) {
 		this.props.hint(response)
 	}

	render() {
		const { current_slot,
				current_trial,
				slots,
				newSequence, 
				isFetchingTrials,
				showLearn,
				showCompletedSequence, 
				isShowingCompleteMiniseq,
				showCorrect, 
				showFeedback,
				showHint,
				skipSlot, 
				nextSlot,
				trial,
				params} = this.props;
		let debug_trial = []
		for(var prop in current_trial) {
			debug_trial.push(prop + ": " + current_trial[prop])
		}
		return (
			<div className="learn_page"
				 ref="learn_page"
				 id="learn_page">
				
				{
					showLearn
					? <div className="spinner_container">	
				 	  	  <div className="big_spinner learn">
				 	  	  	<div className="sk-fading-circle">
				 	  	  	  <div className="sk-circle1 sk-circle"></div>
				 	  	  	  <div className="sk-circle2 sk-circle"></div>
				 	  	  	  <div className="sk-circle3 sk-circle"></div>
				 	  	  	  <div className="sk-circle4 sk-circle"></div>
				 	  	  	  <div className="sk-circle5 sk-circle"></div>
				 	  	  	  <div className="sk-circle6 sk-circle"></div>
				 	  	  	  <div className="sk-circle7 sk-circle"></div>
				 	  	  	  <div className="sk-circle8 sk-circle"></div>
				 	  	  	  <div className="sk-circle9 sk-circle"></div>
				 	  	  	  <div className="sk-circle10 sk-circle"></div>
				 	  	  	  <div className="sk-circle11 sk-circle"></div>
				 	  	  	  <div className="sk-circle12 sk-circle"></div>
				 	  	  	</div>
				 	  	  </div>
				 	    <span className="loading_label">Loading</span>
				 	    <span className="loading"><span>.</span><span>.</span><span>.</span></span>
			 	      </div>
			 	    : null
				}
								 
				 {
					!showLearn && slots !== undefined
					? <div>
						<SeqControl {...this.props}/>
							<div className={classnames("no_sidenav_container learn_container", 
										   {"round_summary": isShowingCompleteMiniseq})}>
								<div>
									{
										current_slot !== undefined 
										&& trial !== undefined 
										&& !isShowingCompleteMiniseq
										&& !showCompletedSequence
										? <LearnCard 
											   updateValue={(value) => ::this.updateStateWithUserResponse(value)}
											   submitAnswer={(response) => ::this.handleUserResponse(response)}
											   getHint={(response) => ::this.handleGetHint(response)}
											   ref="learn_card"
											   slot={current_slot !== undefined ? current_slot : null} 
											   slots={slots} 
											   trial={this.props.trial}
											   cue={current_slot !== undefined ? current_slot.item.cue : null}
											   {...this.props}/>
										: null
									}
									{
										showCorrect && !isShowingCompleteMiniseq && !showCompletedSequence
										? <ShowCorrect correctMiniSequence={isShowingCompleteMiniseq} 
													   {...this.props}/>
										: null
									}
									{
										showCompletedSequence
										? <SequenceSummary {...this.props}/>
										: null
									}
									{
										isShowingCompleteMiniseq && !showCompletedSequence
										? <ReactCSSTransitionGroup transitionName="fade_in" 
								     							   transitionEnterTimeout={500} 
								     							   transitionLeaveTimeout={500}>
											<RoundSummary {...this.props}/>
										  </ReactCSSTransitionGroup>
										: null
									}
									{
										!showCompletedSequence && isShowingCompleteMiniseq 
										? <a className="link continue_link" 
										     onClick={() => this.props.completeMiniSequence()}>
										     Press any key to continue to next round</a>
										: null
									}												
									{
										!showCorrect && !showCompletedSequence && !isShowingCompleteMiniseq 
										? <DiffControls getHint={::this.handleHint} {...this.props} />
										: null
									}
									{
										showFeedback
										? null
										// ? <LearnFeedback slot={current_slot} trial={this.props.trial} />	
										: null
									}
									{
										(!showCorrect 
										&& !showCompletedSequence || !isShowingCompleteMiniseq) 
										&& (showHint && trial.augs !== null) 
										? <Hint hints={trial.augs.length > 0 ? trial.augs : null} 
												{...this.props}/>
										: null
									}
									<div style={{
										height: '200px',
										position: 'absolute',
										top: '100px',
										right: '0',
										display: 'table'
									}}>
										<div style={{display: 'table-cell'}}>
											{ 
												debug_trial.map((row, i) => {
													if(i < (debug_trial.length - 1) / 2) {
														return (
															<p style={{
																fontSize: '13px',
																margin: '0'
															}}	
															   key={i}>{row}</p>
														)
													}
													
												}) 
											}
										</div>
										<div style={{ display: 'table-cell'}}>
											{ 
												debug_trial.map((row, i) => {
													if(i > (debug_trial.length - 1) / 2) {
														return (
															<p style={{
																fontSize: '13px',
																margin: '0'
															}}	
															   key={i}>{row}</p>
														)
													}
													
												}) 
											}
										</div>

									</div>
									<div className="feedback">
										<a className="feedback_link">Feedback</a>
									</div>
								</div>
							 </div> 
						 </div>
					: null
				}
			</div>
		);
	}
}

