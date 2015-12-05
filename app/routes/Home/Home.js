import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import classnames from 'classnames';
import { Link } from 'react-router';
import { pushState } from 'redux-router';
import DocumentTitle from 'react-document-title';
require('./Home.scss');

import * as actionCreators from '../../actions/usersets';
import * as transferActions from '../../actions/transfer';

import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import SetList from '../../components/SetList/SetList';

/* Smart wrapper container for Recent Set List */
import RecentActivityContainer from '../../components/SetList/SmartComponents/RecentActivityContainer';

@connect(state => ({
	assignments: state.sets.assignments,
	sets: state.sets.sets,
	isFetching: state.sets.isFetchingAssignments
	}), 
	dispatch => ({
		...bindActionCreators({
			...actionCreators,
			...transferActions,
			pushState,
		}, dispatch)
	})
)
export default class Home extends Component {
	static propTypes = {
		
	}

	componentWillMount() {
		this.props.clearTransferState()
		this.props.fetchAssignments(1)
	}	

	componentDidMount() {
		setTimeout(() => {
			this.props.pollAssignments(1)
		}, 1000)
	}
	
	render() {	
		const { sets, isFetching } = this.props;	 
		return(
			<DocumentTitle title="Learn more, work less">
				<div className="main_content">
					<div className="page_header_wrapper">
						{ isFetching && <LoadingSpinner />}
					</div>
					{ 
						!isFetching
						&& <RecentActivityContainer {...this.props}/> 
					}
				</div>
			</DocumentTitle>
		);
	}
}

/*
<div className="row">
	<div className="col-sm-12 col-md-10">	
		{
			sets !== undefined 
			&& sets.length !== 0
			&& <SetList {...this.props} />
		}
	</div>					
</div>

/*
import ActivityList from '../../components/ActivityList/ActivityList';
import OnlineUserList from '../../components/OnlineUserList/OnlineUserList';
-- Supplemental activity feed 
<div className="supplemental col-md-4 col-lg-3 remove_small">
	<ActivityList />
	<OnlineUserList />
</div>	
*/
