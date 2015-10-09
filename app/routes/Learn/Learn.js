import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as learnactions from '../../actions/learnmod';
import * as setactions from '../../actions/usersets';

require('./Learn.scss');

import LearnCard from '../../components/LearnCard/LearnCard';
import LearnInput from '../../components/LearnInput/LearnInput';
import LearnHelp from '../../components/LearnHelp/LearnHelp';

@connect(state => ({
	is_fetching_trials: state.learn.trials.is_fetching_trials,
	latest_trial: state.learn.trials.latest_trial,
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

	// static fillStore(redux, props) {
	// 	return redux.dispatch(loadLearnMode(props.params.id))
	// }

	componentWillMount() {
		const { loadLearnMode, params, sets} = this.props;
		const set = sets[params.id];
		loadLearnMode(set)
	}

	componentWillUnmount() {
		const { clearTrial } = this.props;
		clearTrial()
	}

	render() {
		return (
			<div className="no_sidenav_container learn_container">
				<div>
					<LearnCard cue={this.props.latest_trial['cue']} {...this.props}/>
					<LearnInput/>
					<LearnHelp/>
				</div>
			 </div> 
		);
	}
}


// Always render the card, and then decide to render the cue in the component below



