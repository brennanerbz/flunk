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

	// static fillStore(redux, props) {
	// 	return redux.dispatch(loadLearnMode(props.params.id))
	// }

	componentWillMount() {
		const {loadSeq , params } = this.props;
		loadSeq(1, params.id)
	}

	// Replace 1 with the currentUser ID from state

	componentWillUnmount() {
		const { clearLearn } = this.props;
		clearLearn()
	}

	render() {
		return (
			<div className="no_sidenav_container learn_container">
				<div>
					<LearnCard trial={this.props.trial}/>
					<LearnInput/>
					<LearnHelp/>
				</div>
			 </div> 
		);
	}
}


// Always render the card, and then decide to render the cue in the component below



