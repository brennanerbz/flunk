import React, { Component, PropTypes } from 'react';
import moment from 'moment';

export default class RecentActivityContainer extends Component {
	static propTypes = {
		assignments: PropTypes.array,
		sets: PropTypes.array
	}

	render() {
		return( 
			<RecentActivityView {...this.props}/> 
		);
	}
}

export default class RecentActivityView extends Component {
	static propTypes = {	
		assignments: PropTypes.array,
		sets: PropTypes.array
	}

	render() {
		return(
			<div className="recents_view">
					<RecentActivitySectionView {...this.props}/>
			</div>
		);
	}
}

export default class RecentActivitySectionView extends Component {
	static propTypes = {
		assignments: PropTypes.array,
		sets: PropTypes.array
	}
	render() {
		const { assignments } = this.props;
		let drafts = [], 
			today = [], 
			yesterday = [], 
			thiswk = [], 
			lastwk = [], 
			twowkago = [], 
			threewkago = [], 
			month,
			months = [],
			assignment,
			study_date,
			today_date = moment().utc(),
			diff;
		for(var i = 0; i < assignments.length; i++) {
			assignment = assignments[i];
			if(assignment.set.finalized == null) {
				drafts.push(assignment)
				return;
			}
			study_date = moment.utc(assignment.studied)
			if(moment(today_date).isSame(study_date), 'day') {
				today.push(assignment)
				return;
			}
			diff = today_date.diff(study_date, 'days')
			if(diff === 1) {
				yesterday.push(assignment)
			} else if (1 < diff <= 6) {
				thiswk.push(assignment)
			} else if (6 < diff <= 13) {
				lastwk.push(assignment) 
			} else if (13 < diff <= 20) {
				twowkago.push(assignment)
			} else if (20 < diff <= 26) {
				threewkago.push(assignment)
			}
			
			if(!(moment(today_date).isSame(study_date), 'month')) {
				month = moment.month(study_date)
				months.push({
					month: month,
					assignment: assignment
				})
				return;
			}
		}
		if(months.length > 0) {
			months = months.reduce((months, m) => {
				months[m[0]] = months[m[0]] || []
				months[m[0]].push({
					assignment: m[1]
				})
			}, [])
		}
		return(
			<div className="recent_view_sections">
				<p>I wonder...</p>
			</div>
		);
	}
}









