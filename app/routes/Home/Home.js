import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import { Link } from 'react-router';
require('./Home.scss');

import SetList from '../../components/SetList/SetList';
import ActivityList from '../../components/ActivityList/ActivityList';
import OnlineUserList from '../../components/OnlineUserList/OnlineUserList';

export default class Home extends Component {
	static propTypes = {
		
	}	
	
	render() {		
		return(
			<div className="main_content">
				<div className="page_header_wrapper">
					<h1 className="page_header">Home</h1>
				</div>
				<div className="row">
					<div className="col-sm-12 col-md-7 col-lg-9">					
						<SetList />
					</div>
					<div className="supplemental col-md-4 col-lg-3 remove_small">
						<ActivityList />
						<OnlineUserList />
					</div>	
				</div>	
			</div>
		);
	}
}

