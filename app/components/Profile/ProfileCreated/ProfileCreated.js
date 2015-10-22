import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import SetList from '../../components/SetList/SetList';


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
				<SetList profile={true}/>
			</div>
		);
	}
}