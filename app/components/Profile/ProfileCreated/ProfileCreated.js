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
		return(
			<div>
				<SetList sets={this.props.created_sets} profile={true}/>
			</div>
		);
	}
}