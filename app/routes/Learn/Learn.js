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
		const { fetchSeqs, params, sets} = this.props;
		const set = sets[params.id];
		fetchSeqs(set['creator_id'], set['id'], 'learn', 'mc')
	}

	renderLearn() {
		return (
			<div className="no_sidenav_container learn_container">
				<div className="">					
					<LearnCard {...this.props} loading={false} />
					<LearnInput />
					<LearnHelp />
			  	</div>
			</div>
		);
	}

	renderLoad() {
		return (
			<div className="no_sidenav_container learn_container">
				<div className="">					
					<LearnCard loading={true}/>
					<LearnInput />
			  	</div>
			</div>
		);
	}

	render() {
		const { is_fetching_trials } = this.props;
		return(
			!is_fetching_trials
			? ::this.renderLearn()
			: ::this.renderLoad()
		);
	}
}




