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
		let rows = [];
		let last_time_ago = null, finalized = true;
		sorted_sets.forEach((set, i) => {
			if(set.finalized !== finalized) {
				rows.push(<DayDivider set={set}
									  draft={true}
									  key={'draft' + set.id + i}
									  {...this.props}/>)
			}
			else if (set.time_ago !== last_time_ago) {
				rows.push(<DayDivider set={set}
									  studied={true} 
					                  key={'day' + set.id + i}
					                  {...this.props}/>)
			}
			if(set.finalized !== null) {
				rows.push(<SetListItem set={set}
									   draft={false}							   
									   setActiveRow={this.setActiveRow}
									   activeRow={this.state.activeRow}
									   key={'item' + set.id + i}/>)
			} else {
				rows.push(<SetListItem set={set}
									   draft={true}							   
									   setActiveRow={this.setActiveRow}
									   activeRow={this.state.activeRow}
									   key={'item' + set.id + i}/>)
			}
			finalized = set.finalized
			last_time_ago = set.time_ago;
		})
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
		const { set, draft, studied } = this.props	
		return (
			<div className={classnames("day_divider", {'profile_divider': this.props.profile})}>
				<hr className="separator"/>
				<i className="copy_only"/>
					<div className="day_divider_label">
						{
							studied
							? set.time_ago
							: null
						}
						{
							draft
							? 'In progress'
							: null
						}
					</div> 
			</div>
		);
	}
}





