import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';
import * as learnactions from '../../actions/learnv2';
import * as setactions from '../../actions/usersets';

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
		const { showCorrect, showCompletedSequence, isGrading } = this.props;
		if(event.which && showCompletedSequence) {
			this.props.newSequence(null)
			return;
		}
		if(event.which && showCorrect) {
			if(!this.handleArrowKeys(event)) {
				this.props.skipSlot()
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
		// console.log(showLearn)
		return (
			<div className="learn_page"
				 ref="learn_page"
				 id="learn_page">
				
				{
					showLearn
					? <div className="spinner_container">	
				 	  	<div className="loader spinner">
				 	    Loading...
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
							<div className="no_sidenav_container learn_container">
								<div>
									{
										current_slot !== undefined && trial !== undefined
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
										showCorrect 
										? <ShowCorrect correctMiniSequence={isShowingCompleteMiniseq} 
													   {...this.props}/>
										: null
									}
									{
										!showCompletedSequence && isShowingCompleteMiniseq 
										? <a className="link" 
										     onClick={() => this.props.completeMiniSequence()}>
										     Go to next mini sequence</a>
										: null
									}												
									{
										!showCorrect && !showCompletedSequence
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
										(!showCorrect && !showCompletedSequence) && (showHint && trial.augs !== null)
										? <Hint hints={trial.augs.length > 0 ? trial.augs : null} 
												{...this.props}/>
										: null
									}
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

