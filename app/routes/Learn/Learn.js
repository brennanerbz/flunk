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
	curr_seq: state.learn.seqs.curr_seq,
	is_fetching_seq: state.learn.seqs.is_fetching_seq,
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
		const { fetchSeqs, fetchSets, params, curr_seq, sets} = this.props;
		if (Object.getOwnPropertyNames(sets).length === 0 || sets == null ) { fetchSets() }
		const set = sets[params.id];
		if (Object.getOwnPropertyNames(curr_seq).length === 0 || curr_seq == null) {
			fetchSeqs(set['creator_id'], set['id'], 'learn', 'mc')
		}
		
	}

	componentWillUnmount() {
		const { clearSeq } = this.props;
		clearSeq()
	}

	render() {
		const { curr_seq, is_fetching_seq } = this.props;
		return(
			<div className="no_sidenav_container learn_container">
				{ 
					is_fetching_seq && !curr_seq
					?  <p>Loading...</p>
					: <div className="">					
						<LearnCard {...this.props} />
						<LearnInput />
						<LearnHelp />
					  </div>
				}
			</div>
		);
	}
}