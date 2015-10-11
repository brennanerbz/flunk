import React, { Component, PropTypes } from 'react';

export default class Hint extends Component {
	static propTypes = {
		hint: PropTypes.string
	}
	render() {
		const { hint } = this.props;
		return (
			<div>
				<p>
					{hint}
				</p>
			</div>
		);
	}
}
