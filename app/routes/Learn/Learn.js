import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as learnactions from '../../actions/learn';
import * as setactions from '../../actions/usersets';

require('./Learn.scss');

import LearnCard from '../../components/LearnCard/LearnCard';
import LearnInput from '../../components/LearnInput/LearnInput';
import LearnHelp from '../../components/LearnHelp/LearnHelp';

@connect(state => ({
	is_fetching_learn: state.learn.is_fetching_learn,
	showCorrect: state.learn.show_correct,
	showCompletedSeq: state.learn.show_completed_seq,
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

	componentWillUnmount() {
		const { clearLearn } = this.props;
		clearLearn()
	}

	render() {
		const { newSeq, showCompletedSeq, showCorrect, skipToUnfinished, params} = this.props;
		return (
			<div className="no_sidenav_container learn_container">
				<div>
					<LearnCard trial={this.props.trial}/>
					<LearnInput {...this.props}/>
					{
						showCorrect
						? <a onClick={() => skipToUnfinished('next')}>Click to continue</a>
						: null
					}
					{
						showCompletedSeq
						? <a onClick={() => newSeq(1, params.id)}>New sequence</a>
						: null
					}
					<LearnHelp trial={this.props.trial}/>
				</div>
			 </div> 
		);
	}
}


// Always render the card, and then decide to render the cue in the component below



