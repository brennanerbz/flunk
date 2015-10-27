import React, { Component, PropTypes } from 'react';

export default class SearchSetItem extends Component {
	static propTypes = {
	}

	render() {
		const set_icon = require('../../../assets/set_icon.png');
		return(
			<li className="search_set_item">
				<div className="set_icon_container">
					<img src={set_icon} className="set_icon" />
				</div>
				<div className="set_content">
					<h4 className="set_title">Stanford Psychology</h4>
					<span className="set_creator">by nathan_lomeli</span>
					<p className="set_purpose">Interesting stuff at the interaction of technology and psychology.
					</p>
					<span className="set_stats">113 items</span>
				</div>
			</li>
		);
	}
}