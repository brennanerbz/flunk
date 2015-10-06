import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../../actions/learnset';

import LearnCard from '../../components/LearnCard/LearnCard';
import LearnInput from '../../components/LearnInput/LearnInput';
import LearnHelp from '../../components/LearnHelp/LearnHelp';

@connect(state => ({
	set: state.sets.set
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
		const { set } = this.props;
		return(
			<div className="main_content">
				{ set ?

				( 
				<div>
					<div className="page_header_wrapper">
						<h1 className="page_header">{set.name}</h1>
					</div> 
					<LearnCard />
					<LearnInput />
					<LearnHelp />
				</div>

				)

				: null }	

			</div>
		);
	}
}