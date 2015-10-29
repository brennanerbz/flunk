import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
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
	isGrading: state.learn.isGrading,
	isFetchingTrials: state.learn.isFetchingTrials,
	showLearn: state.learn.isFetchingLearn,
	showCorrect: state.learn.isShowingCorrect,
	showCompletedSequence: state.learn.isShowingCompletedSequence,
	showFeedback: state.learn.isShowingFeedback,
	slots: state.learn.slots,
	current_slot: state.learn.current_slot,
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
		flag: false
	}

	componentWillMount() {
		const {fetchLearn, params } = this.props;
		fetchLearn(1, Number(params.id))
	}	

	componentDidMount() {
		window.addEventListener('keyup', ::this.handleKeyUp)
	}

	componentWillUnmount() {
		const { clearLearn } = this.props;
		clearLearn()
		window.removeEventListener('keyup', ::this.handleKeyUp)
	}


	keyDownHandlers = {
		37(event) {
			event.preventDefault()
			this.props.nextSlot('prev')
			return true;
		}, 

		39(event) {
			event.preventDefault()
			this.props.nextSlot('next')
			return true;
		},

		40(event) {
			event.preventDefault()
			if(!this.props.current_slot.completed) {
				this.refs.learn_card.sendEvent(event)
				return true;
			}
		},
		13(event) {
			event.preventDefault()
			const { current_slot, isGrading, skipSlot } = this.props;
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
  		} else {
  			return false;
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

	render() {
		const { current_slot,
				slots,
				newSequence, 
				isFetchingTrials,
				showLearn,
				showCompletedSequence, 
				showCorrect, 
				showFeedback,
				skipSlot, 
				nextSlot,
				params} = this.props;
		return (
			<div className="learn_page">
				{
					!showLearn && slots !== undefined
					? <div>
						<SeqControl {...this.props}/>
							<div className="no_sidenav_container learn_container"
								 onKeyUp={::this.handleKeyUp}>
								<div>
									{
										current_slot !== undefined || !isFetchingTrials
										? <LearnCard 
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
										? <ShowCorrect {...this.props}/>
										: null
									}												
									{
										!showCorrect && !showCompletedSequence
										? <DiffControls />
										: null
									}
									{
										showFeedback
										? null
										// ? <LearnFeedback slot={current_slot} trial={this.props.trial} />	
										: null
									}
									{
										!showCorrect && !showCompletedSequence && current_slot !== undefined
										? <Hint hints={current_slot.augs !== undefined ? current_slot.augs : null} {...this.props} />
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


// Always render the card, and then decide to render the cue in the component below
// {
// 	showCorrect
// 	? <a onClick={() => goToUnfinished('next')}>Click to continue</a>
// 	: null
// }


