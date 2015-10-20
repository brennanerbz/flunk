import React, { Component, PropTypes } from 'react';

export default class Answer extends Component {
	static propTypes = {
		target: PropTypes.string,
		stem: PropTypes.string
	}

	fillInTheBlank(stem) {
		return (
			<div>
				<p className="diff_label">Fill in the blank:</p>
				<p>{stem}</p>
			</div>
		)
	}

	copyAnswer(target) {
		return (
			<div>
				<p className="diff_label">Copy answer:</p>
				<p>{target}</p>
			</div>
		)
	}

	render() {
		const { target, stem } = this.props;
		return (
			<div>
			{
				stem !== null
				? ::this.fillInTheBlank(stem)
				: ::this.copyAnswer(target)
			}
			</div>
		);
	}
}
