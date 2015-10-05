import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import moment from 'moment';
const styles = require('./SetList.scss');

import SetListItem from './SetListItem';

class DayDivider extends Component {
	render() {
		const last_studied = this.props.set.last_studied;
		const time_ago = moment(last_studied).fromNow()
		return (
			<div className="day_divider">
				<hr className="separator"/>
				<i className="copy_only"/>
				<div className="day_divider_label">
					{time_ago}
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
			{
				name: 'Intro to psychology',
				author: 'Brennan Erbeznik',
				last_studied: "2015-10-02 13:34:05.7000"
			},
			{
				name: 'Cognitive Science',
				author: 'Nathan Lomeli',
				last_studied: "2015-09-25 13:34:05.7000"
			},
			{
				name: 'Cognitive Science',
				author: 'Nathan Lomeli',
				last_studied: "2015-10-01 13:34:05.7000"
			}
		]
	}

	componentDidMount = () => {
		$("[data-toggle='tooltip']").tooltip({
			delay: { show: 400, hide: 50}
		})
	}

	renderSets = () => {
		let sets = this.state.sets;
		sets.sort((set1, set2) => {
			return (moment(set1.last_studied).isBefore(set2.last_studied)) ? 1 : -1
		})
		let rows = [];
		let last_date = null;
		sets.forEach(set => {
			const last_string = moment(set.last_studied).fromNow();
			if (last_string !== last_date) {
				rows.push(<DayDivider set={set} key={set.last_studied}/>)
			}
			rows.push(<SetListItem set={set} />);
			last_date = moment(set.last_studied).fromNow();
		});
		return rows;
	}

	render() {			
		return(
			<div>				
				<div className="sets_container">
					{this.renderSets()}
				</div>
			</div>
		);
	}
}


