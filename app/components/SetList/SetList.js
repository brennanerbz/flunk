import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import moment from 'moment';
import assign from 'lodash/object/assign';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

const styles = require('./SetList.scss');

import SetListItem from './SetListItem';

export default class SetList extends Component {
	static propTypes = {
		sets: PropTypes.array
	}

	state = {
		activeRow: 0
	}

	setActiveRow = (id) => {
		this.setState({
			activeRow: id
		});
	}	

	renderSets(sets) {		
		var sorted_sets = sets.map((set) => {
		    const date = moment(set['creation']),
		    	  today = moment(),
		     	  date_month = moment(set['creation']).format('MMMM'),
		    	  today_month = moment().format('MMMM'),
		    	  diff = today.diff(date, 'days');

		    if (diff > 30 && today_month !== date_month) {		    	
		        return assign({}, set, {time_ago: date_month})
		    } else if (diff <= 7) {
		        return assign({}, set, {time_ago: 'Last studied'})
		    } else if (diff > 7 && diff < 14) {		    	
		        return assign({}, set, {time_ago: 'Last week'})
		    } else if (diff >= 14 && diff <= 21) {
		        return assign({}, set, {time_ago: '2 weeks ago'})
		    } else if (diff >= 21) {
		        return assign({}, set, {time_ago: '3 weeks ago'})
		    }
		})
		let rows = [], _sets = [], finalized_sets = sorted_sets.filter(set => set.finalized == null)
		sorted_sets = sorted_sets.filter(set => set.finalized !== null)
		_sets = finalized_sets.concat(sorted_sets)
		console.log(_sets)
		let last_time_ago = null, finalized = null;
		for(var i = 0; i < _sets.length; i++) {
			console.log(_sets[i])
			console.log(finalized)
			if(_sets[i].finalized !== finalized) {
				rows.push(<DayDivider set={_sets[i]}
									  studyDivider={true}
									  key={'draft' + i}
									  {...this.props}/>)
			}
			else if (_sets[i].time_ago !== last_time_ago) {
				rows.push(<DayDivider set={_sets[i]}
									  draftDivider={true} 
					                  key={'day' + i}
					                  {...this.props}/>)
			}
			if(_sets[i].finalized !== null) {
				rows.push(<SetListItem set={_sets[i]}
									   draft={false}							   
									   setActiveRow={this.setActiveRow}
									   activeRow={this.state.activeRow}
									   key={'item' + i}/>)
			} else {
				rows.push(<SetListItem set={_sets[i]}
									   draft={true}							   
									   setActiveRow={this.setActiveRow}
									   activeRow={this.state.activeRow}
									   key={'item' + i}/>)
			}
			finalized = _sets[i].finalized
			last_time_ago = _sets[i].time_ago;
		}
		// _sets.forEach((set, i) => {
			
		// })
		// let draft_rows = [],
		// 	rendered_rows = [],
		// 	draft_index;
		// for(var i = 0; i < rows.length; i++) {
		// 	if(rows[i].props.draft) {
		// 		draft_rows.push(rows[i])
		// 	}
		// 	if(rows[i].props.draftDivider) {
		// 		draft_index = i;
		// 	}
		// }
		// draft_rows.unshift(rows[draft_index])
		// rows = rows.filter(row => !row.props.draft && !row.props.draftDivider)
		// rendered_rows.push(draft_rows)
		// rendered_rows.push(rows)
		return rows;
	}


	render() {	
		const { sets, isFetching } = this.props;
		sets.sort((set1, set2) => {
			return (moment(set1.creation).isBefore(set2.creation)) ? 1 : -1
		})		
		return(
			<div>				
				<div className="sets_container">
					{
						isFetching || typeof sets == undefined || sets.length === 0

						? null

						: ::this.renderSets(sets)
					}
				</div>
			</div>
		);
	}
}

class DayDivider extends Component { 
	render() {
		const { set, draftDivider, studyDivider } = this.props	
		return (
			<div className={classnames("day_divider", {'profile_divider': this.props.profile})}>
				<hr className="separator"/>
				<i className="copy_only"/>
					<div className="day_divider_label">
						{
							studyDivider
							? set.time_ago
							: null
						}
						{
							draftDivider
							? 'In progress'
							: null
						}
					</div> 
			</div>
		);
	}
}





