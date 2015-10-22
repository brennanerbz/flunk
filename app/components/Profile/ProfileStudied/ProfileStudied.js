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
		return(
			<div>
				<SetList profile={true}/>
			</div>
		);
	}
}