import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import classnames from 'classnames';
import { Link } from 'react-router';
import { pushState } from 'redux-router';
require('./Home.scss');

import * as actionCreators from '../../actions/usersets';

import SetList from '../../components/SetList/SetList';
import ActivityList from '../../components/ActivityList/ActivityList';
import OnlineUserList from '../../components/OnlineUserList/OnlineUserList';

@connect(state => ({
	sets: state.sets.sets,
	isFetching: state.sets.isFetchingAssignments
	}), 
	dispatch => ({
		...bindActionCreators({
			...actionCreators,
			pushState,
		}, dispatch)
	})
)
export default class Home extends Component {
	static propTypes = {
		
	}

	intervalPoll = {}

	componentWillMount() {
		this.props.fetchAssignments(1)
	}	

	assignmentPoll() {
		const { pollAssignments } = this.props;
		pollAssignments(1)
	}

	componentDidMount() {
		this.intervalPoll = setInterval(() => {
			::this.assignmentPoll(1)
		}, 2500)
	}

	componentWillUnmount() {
		clearInterval(this.intervalPoll)
	}
	
	render() {	
		const { sets, isFetching } = this.props;	 
		return(
			<div className="main_content">
				<div className="page_header_wrapper">
					{
					!isFetching
					? <h1 className="page_header">Home</h1>
					: <div><span className="page_header loading_label"></span>
				 	  <span className="loading"><span>.</span><span>.</span><span>.</span></span></div>
					}
				</div>
				<div className="row">
					<div className="col-sm-12 col-md-11 col-lg-12">	
						{
							typeof sets == undefined || sets.length === 0
							? null
							: <SetList {...this.props} />
						}									
					</div>					
				</div>	
			</div>
		);
	}
}

// -- Supplemental activity feed 
// <div className="supplemental col-md-4 col-lg-3 remove_small">
// 	<ActivityList />
// 	<OnlineUserList />
// </div>	