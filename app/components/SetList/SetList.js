import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import moment from 'moment';
import assign from 'lodash/object/assign';

const styles = require('./SetList.scss');

import SetListItem from './SetListItem';

class DayDivider extends Component { 
	render() {
		const set = this.props.set;		
		return (
			<div className="day_divider">
				<hr className="separator"/>
				<i className="copy_only"/>
					<div className="day_divider_label">
						{set.time_ago}
					</div> 
			</div>
		);
	}
}

export default class SetList extends Component {
	static propTypes = {
		
	}

	state = {
		sets: [
			{	id: 1,
				name: 'An Introduction to Computer Science',
				author: 'Brennan Erbeznik',
				last_studied: "2015-10-02 13:34:05.7000"
			},
			{
				id: 2,
				name: 'Functional Programming',
				author: 'Nathan Lomeli',
				last_studied: "2015-09-25 13:34:05.7000"
			},
			{
				id: 3,
				name: 'React.js Essentials',
				author: 'Benjamin Franklin',
				last_studied: "2015-08-01 13:34:05.7000"
			},
			{
				id: 4,
				name: 'Redux & React basics',
				author: 'Larry Page',
				last_studied: "2015-10-01 13:34:05.7000"
			},
			{
				id: 6,
				name: 'React for designers',
				author: 'Nathan Lomeli',
				last_studied: "2015-10-05 09:34:05.7000"
			},
			{
				id: 7,
				name: 'Javascript in Analogies',
				author: 'Benjamin Franklin',
				last_studied: "2015-08-01 13:34:05.7000"
			},
			{
				id: 8,
				name: 'Flux Architecture',
				author: 'Alex Wyllie',
				last_studied: "2015-08-05 13:34:05.7000"
			},
			{
				id: 9,
				name: 'Biology Chapter 8 Vocab',
				author: 'Nathan Lomeli',
				last_studied: "2015-08-20 09:34:05.7000"
			},
			{
				id: 10,
				name: 'React Facebook Tutorial',
				author: 'Alex Wyllie',
				last_studied: "2015-10-02 13:34:05.7000"
			},
			{
				id: 11,
				name: 'Flux Basics',
				author: 'Alex Wyllie',
				last_studied: "2015-10-03 13:34:05.7000"
			},
			{
				id: 12,
				name: 'Behavioral Genetics',
				author: 'Alex Wyllie',
				last_studied: "2015-10-04 13:34:05.7000"
			}
		], 
		activeRow: 0
	}

	setActiveRow = (id) => {
		this.setState({
			activeRow: id
		});
	}	

	renderSets = (sets) => {		
		var sorted_sets = sets.map((set) => {
		    const date = moment(set['last_studied']);
		    const today = moment();
		    const date_month = moment(set['last_studied']).format('MMMM');
		    const today_month = moment().format('MMMM');
		    let diff = today.diff(date, 'days');

		    if (diff > 30 && today_month !== date_month) {
		        return assign({}, set, {time_ago: date_month})
		    } else if (diff <= 7) {
		        return assign({}, set, {time_ago: 'Last studied'})
		    } else if (diff > 7 && diff < 14) {
		        return assign({}, set, {time_ago: 'Last week'})
		    } else if (diff > 14 && diff < 21) {
		        return assign({}, set, {time_ago: '2 weeks ago'})
		    } else if (diff > 21) {
		        return assign({}, set, {time_ago: '3 weeks ago'})
		    }
		})
		let rows = [];
		let last_time_ago = null;
		sorted_sets.forEach((set, i) => {
			if (set.time_ago !== last_time_ago) {
				rows.push(<DayDivider set={set} 
					                  key={String(set.laststudied) + String(i)}/>)
			}
			rows.push(<SetListItem set={set}
								   setActiveRow={this.setActiveRow}
								   activeRow={this.state.activeRow}
								   key={String(set.last_studied) + String(i)}/>)
			last_time_ago = set.time_ago;
		})
		return rows;
	}


	render() {	
		let sets = this.state.sets;
		sets.sort((set1, set2) => {
			return (moment(set1.last_studied).isBefore(set2.last_studied)) ? 1 : -1
		})		
		return(
			<div>				
				<div className="sets_container">
					{this.renderSets(sets)}
				</div>
			</div>
		);
	}
}


