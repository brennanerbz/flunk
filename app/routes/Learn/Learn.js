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
	showLearn: state.learn.isFetchingLearn,
	showCorrect: state.learn.isShowingCorrect,
	showCompletedSeq: state.learn.isShowingCompletedSequence,
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

	componentWillMount() {
		console.log(this.props.showCorrect)
		const {fetchLearn, params } = this.props;
		fetchLearn(1, Number(params.id))
	}	

	componentDidMount() {
		window.addEventListener('keypress', ::this.handleKeyUp)
		window.addEventListener('keydown', ::this.handleArrowKeys)
	}

	componentWillUnmount() {
		const { clearLearn } = this.props;
		clearLearn()
		window.removeEventListener('keypress', ::this.handleKeyUp)
		window.removeEventListener('keydown', ::this.handleArrowKeys)
	}

	keyDownHandlers = {
		37() {
			this.props.nextSlot('prev')
		}, 

		39() {
			this.props.nextSlot('next')
		},

		40(event) {
			if(this.props.current_slot.completion == null)
				this.refs['learn_input'].handleSubmit(event)
		}
	}

	handleArrowKeys(event) {
		if (this.keyDownHandlers[event.which]) {
    		this.keyDownHandlers[event.which].call(this, event)    		
  		}
	}
	
	handleKeyUp(event) {	
		const { showCorrect, showCompletedSeq } = this.props;
		if(event.which && showCorrect) {
			this.props.skipSlot()
		}	
		if(event.which && showCompletedSeq) {
			this.props.newSequence(1, this.props.params.id)
		}	
	}

	render() {
		const { current_slot,
				slots,
				newSequence, 
				showLearn,
				showCompletedSeq, 
				showCorrect, 
				showFeedback,
				skipSlot, 
				nextSlot,
				params} = this.props;
		return (
			<div className="learn_page">
				{
					!showLearn
					? <div>
						<SeqControl {...this.props}/>
							<div className="no_sidenav_container learn_container"
								 onKeyPress={::this.handleKeyUp}
								 onKeyDown={::this.handleArrowKeys}>			 
								<div>
									<LearnCard slot={current_slot} 
											   slots={slots} 
											   skip={(dir) => nextSlot(dir)} 
											   trial={this.props.trial}
											   {...this.props}/>
									{
										showCorrect
										? <ShowCorrect {...this.props}/>
										: null
									}												
									{
										showCompletedSeq
										? <a onClick={() => newSequence(1, params.id)}>New sequence</a>
										: null
									}
									{
										!showCorrect && !showCompletedSeq
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
										!showCorrect && !showCompletedSeq
										? <Hint {...this.props} />
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


