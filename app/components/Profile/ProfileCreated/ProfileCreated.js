import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import SetList from '../../SetList/SetList';

/*
@connect/dispatch
call /user/:id/created
*/
export default class ProfileCreated extends Component {
	static propTypes = {
	}

	render() {
		let sets = this.props.created_sets
				   .filter(set => set.finalized !== null)
		return(
			<div>
			{
				sets.length == 0
				&&
				<h1 className="no_sets">{}</h1>
			}
			{
				sets.length > 0
				&&
				<SetList sets={sets} profile={true}/>
			}
			</div>
		);
	}
}