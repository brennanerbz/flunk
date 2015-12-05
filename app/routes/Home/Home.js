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
						{
						isFetching
						&&
						<div className="big_spinner">
							<div className="sk-fading-circle">
							  <div className="sk-circle1 sk-circle"></div>
							  <div className="sk-circle2 sk-circle"></div>
							  <div className="sk-circle3 sk-circle"></div>
							  <div className="sk-circle4 sk-circle"></div>
							  <div className="sk-circle5 sk-circle"></div>
							  <div className="sk-circle6 sk-circle"></div>
							  <div className="sk-circle7 sk-circle"></div>
							  <div className="sk-circle8 sk-circle"></div>
							  <div className="sk-circle9 sk-circle"></div>
							  <div className="sk-circle10 sk-circle"></div>
							  <div className="sk-circle11 sk-circle"></div>
							  <div className="sk-circle12 sk-circle"></div>
							</div>
						</div>
						}
					</div>
					<div className="row">
						<div className="col-sm-12 col-md-10">	
							{
								typeof sets == undefined || sets.length === 0
								? null
								: <SetList {...this.props} />
							}									
						</div>					
					</div>	
				</div>
			</DocumentTitle>
		);
	}
}

// -- Supplemental activity feed 
// <div className="supplemental col-md-4 col-lg-3 remove_small">
// 	<ActivityList />
// 	<OnlineUserList />
// </div>	