import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../../actions/learnset';

require('./Learn.scss');

import LearnCard from '../../components/LearnCard/LearnCard';
import LearnInput from '../../components/LearnInput/LearnInput';
import LearnHelp from '../../components/LearnHelp/LearnHelp';

@connect(state => ({
	set: state.sets.set,
	sequence: state.sets.sequence
	}),
	dispatch => ({
		...bindActionCreators({
			...actionCreators
		}, dispatch)
	})
)
export default class Learn extends Component {
	static propTypes = {
		params: PropTypes.object,
		sets: PropTypes.object
	}

	componentWillMount() {
		const { sequence } = this.props;
		this.props.fetchSet(this.props.params.id)
		this.props.getQueues(sequence.id)
		// call the queues/trials to hydrate the children components				
	}

	render() {
		const { set, sequence } = this.props;
		return(
			<div className="no_sidenav_container learn_container">
				{ set ?

				( 
				<div className="">					
					<LearnCard {...this.props} />
					<LearnInput />
					<LearnHelp />
				</div>

				)

				: null }	

			</div>
		);
	}
}