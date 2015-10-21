import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import classnames from 'classnames';
import { Link } from 'react-router';
require('./Home.scss');

import * as actionCreators from '../../actions/usersets';

import SetList from '../../components/SetList/SetList';
import ActivityList from '../../components/ActivityList/ActivityList';
import OnlineUserList from '../../components/OnlineUserList/OnlineUserList';

@connect(state => ({
	sets: state.sets.set_list.map(id => state.sets.set_items[id])
	}), 
	dispatch => ({
		...bindActionCreators({
			...actionCreators
		}, dispatch)
	})
)
export default class Home extends Component {
	static propTypes = {
		
	}

	componentWillMount() {
		this.props.fetchSets()
	}	
	
	render() {	
		const { sets } = this.props;	 
		return(
			<div className="main_content">
				<div className="page_header_wrapper">
					<h1 className="page_header">Home</h1>
				</div>
				<div className="row">
					<div className="col-sm-12 col-md-11 col-lg-12">	
						{
							typeof sets == undefined || sets.length === 0
							? null
							: <SetList />
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