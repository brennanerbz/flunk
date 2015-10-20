import React, { Component, PropTypes } from 'react';

export default class Item extends Component {
	static propTypes = {
	}

	renderTarget(target) {
		let new_target = target.charAt(0).toUpperCase() + target.slice(1)
		return (
			<a className="item_target link">{new_target}</a>
		)
	}

	renderCue(cue) {
		let new_cue = cue.charAt(0).toUpperCase() + cue.slice(1)
		return (
			<p className="item_cue">{new_cue}</p>
		);
	}

	render() {
		const { item } = this.props;
		return(
			<li>
				{::this.renderTarget(item.target)}
				{::this.renderCue(item.cue)}
			</li>
		);
	}
}

