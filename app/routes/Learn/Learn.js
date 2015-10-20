import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as learnactions from '../../actions/learn';
import * as setactions from '../../actions/usersets';

require('./Learn.scss');

/* Components */
import LearnCard from '../../components/LearnCard/LearnCard';
import ShowCorrect from '../../components/ShowCorrect/ShowCorrect';
import LearnInput from '../../components/LearnInput/LearnInput';
import LearnFeedback from '../../components/LearnFeedback/LearnFeedback';
import LearnHelp from '../../components/LearnHelp/LearnHelp';
import DiffControls from '../../components/DiffControls/DiffControls';
import Hint from '../../components/Hint/Hint';
import SeqControl from '../../components/LearnSeqControl/SeqControl';

@connect(state => ({
	is_fetching_learn: state.learn.is_fetching_learn,
	showCorrect: state.learn.show_correct,
	showCompletedSeq: state.learn.show_completed_seq,
	showFeedback: state.learn.show_feedback,
	slots: state.learn.queue_list,
	current_slot: state.learn.curr_q,
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
		const {loadSeq , params } = this.props;
		loadSeq(1, Number(params.id))
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
			if(this.props.current_slot.completion == 'None')
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
			this.props.goToUnfinished('next')
		}	
		if(event.which && showCompletedSeq) {
			this.props.newSeq(1, this.props.params.id)
		}	
	}

	render() {
		const { current_slot,
				slots,
				newSeq, 
				showCompletedSeq, 
				showCorrect, 
				showFeedback,
				goToUnfinished, 
				nextSlot,
				params} = this.props;
		return (
			<div className="learn_page">
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
							? <a onClick={() => newSeq(1, params.id)}>New sequence</a>
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

					</div>
				 </div> 
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


