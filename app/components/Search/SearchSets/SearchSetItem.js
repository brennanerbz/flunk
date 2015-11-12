import React, { Component, PropTypes } from 'react';

export default class SearchSetItem extends Component {
	static propTypes = {
	}

	render() {
		const set_icon = require('../../../assets/set_icon.png'),
			  { set, pushState } = this.props;
		return(
			<li className="search_set_item">
				<div className="set_icon_container" onClick={() => pushState(null, `/set/${set.id}`)}>
					<img src={set_icon} className="set_icon" />
				</div>
				<div className="set_content">
					<h4 className="set_title"
						onClick={() => pushState(null, `/set/${set.id}`)}>{set.title}</h4>
					<a className="set_creator"
					   onClick={() => pushState(null, `/profile/${set.creator_id}`)}>by {set.creator.username}</a>
					<p className="set_purpose">
						{
							set.description !== null
							? set.description.replace(/ *\([^)]*\) */g, "").split(".")[0] + "."
							: null
						}
					</p>
					<span className="set_stats">{set.associations_count} items</span>
				</div>
			</li>
		);
	}
}