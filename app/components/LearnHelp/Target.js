import React, { Component, PropTypes } from 'react';

export default class Answer extends Component {
	static propTypes = {
		target: PropTypes.string,
		stem: PropTypes.string
	}

	render() {
		const { target, stem } = this.props;
		return (
			<div>
			{
				stem !== null
				? <p>{stem}</p>
				: <p>{target}</p>
			}
			</div>
		);
	}
}
