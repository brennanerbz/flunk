import React, { Component, PropTypes } from 'react';
import SetList from '../../SetList/SetList';

/*
@connect/dispatch
call /user/:id/studied
*/
export default class ProfileStudied extends Component {
	static propTypes = {
	}

	render() {
		let sets = this.props.studied_sets.filter(set => set.finalized !== null)
		return(
			<div>
				<SetList sets={sets} profile={true}/>
			</div>
		);
	}
}