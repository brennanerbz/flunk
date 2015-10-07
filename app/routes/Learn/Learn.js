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
	sequences: state.sets.sequences
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

	componentDidMount() {
		this.props.fetchSet(this.props.params.id)				
	}

	render() {
		const { set, sequences } = this.props;
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