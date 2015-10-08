import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../../actions/learnmod';

require('./Learn.scss');

import LearnCard from '../../components/LearnCard/LearnCard';
import LearnInput from '../../components/LearnInput/LearnInput';
import LearnHelp from '../../components/LearnHelp/LearnHelp';

@connect(state => ({
	curr_seq: state.learn.curr_seq,
	is_fetching_seq: state.learn.is_fetching_seq,
	sets: state.sets.set_items
	}),
	dispatch => ({
		...bindActionCreators({
			...actionCreators
		}, dispatch)
	})
)
export default class Learn extends Component {
	static propTypes = {
		params: PropTypes.object
	}

	componentWillMount() {
		const { fetchSeqs, params, curr_seq, sets } = this.props;
		const set = sets[params.id]
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