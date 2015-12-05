import React, { Component, PropTypes } from 'react';
import moment from 'moment';

import SetListView from '../Views/SetListView';

export default class SetListContainer extends Component {
	static propTypes = {
		assignments: PropTypes.array,
		sets: PropTypes.array
	}

	state = {
		assignments: null,
		sets: null
	}

	componentDidMount() {
		this.setState({
			assignments: this.props.assignments,
			sets: this.props.sets
		});
	}

	render() {
		return(
			<div className="recent_view">
				<SetListSections {...this.props}/>
			</div>
		);
	}
}

export default class SetListSections extends Component {
	static propTypes = {
	}

	renderSection(arr) {
		return (
			arr.length > 0
			&&
			<li className="recent_section">
				<h1 className="recent_section_title">{arr.charAt(0).toUpperCase() + arr.slice(1)}</h1>
				<SetListView assignments={arr} />
			</li>
		)
	}

	render() {
		const { assignments } = this.props;
		let sections = {
			drafts: [],
			yesterday: [],
			this_week: [],
			last_week: [],
			two_weeks_ago: [],
			three_weeks_ago: [],
			months: []
		},
			month,
			assignment,
			study_date,
			today_date = moment().utc(),
			diff;
		for(var i = 0; i < assignments.length; i++) {
			assignment = assignments[i];
			if(assignment.set.finalized == null) {
				sections.drafts.push(assignment)
				return;
			}
			study_date = moment.utc(assignment.studied)
			if(moment(today_date).isSame(study_date), 'day') {
				sections.today.push(assignment)
				return;
			}
			diff = today_date.diff(study_date, 'days')
			if(diff === 1) {
				sections.yesterday.push(assignment)
			} else if (1 < diff <= 6) {
				sections.this_week.push(assignment)
			} else if (6 < diff <= 13) {
				sections.last_week.push(assignment) 
			} else if (13 < diff <= 20) {
				sections.two_weeks_ago.push(assignment)
			} else if (20 < diff <= 26) {
				sections.three_weeks_ago.push(assignment)
			}
			
			if(!(moment(today_date).isSame(study_date), 'month')) {
				month = moment.month(study_date)
				section.months.push({
					month: month,
					assignment: assignment
				})
				return;
			}
		}
		if(section.months.length > 0) {
			section.months = section.months.reduce((months, m) => {
				months[m[0]] = months[m[0]] || []
				months[m[0]].push({
					assignment: m[1]
				})
			}, [])
		}
		console.log(sections)
		return(
			<ul className="recent_view_sections">				
				{
					::this.renderSection(arr)
				}
			</ul>
		);
	}
}








