import React, { Component, PropTypes } from 'react';

export default class Hint extends Component {
	static propTypes = {
		hint: PropTypes.string
	}
	render() {
		const { hint } = this.props;
		return (
			<div>
				<div>
					<p className="diff_label">Hint:</p>
					<p className="hint">{hint}</p>
					<p className="hint_source">Source</p>
				</div>
			</div>
		);
	}
}
