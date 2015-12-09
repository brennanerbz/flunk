import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';


export default class ItemProgress extends Component {
	static propTypes = {
	}

	render() {
		return(
			<div className="progress">
				<span className="no_answers_yet">
					No answers yet
				</span>
			</div>
		);
	}
}