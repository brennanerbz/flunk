import React, { Component, PropTypes } from 'react';

export default class SearchSetItem extends Component {
	static propTypes = {
	}

	renderPurpose(def, query) {
		if(def == null) return { __html: null }
		let holder,
			purpose;
		holder = def.replace(/ *\([^)]*\) */g, "").split(".")[0]
		purpose = holder.replace(new RegExp('(^|\\s)(' + query + ')(\\s|$)','ig'), '$1<b>$2</b>$3') + "."
		return {
			__html: purpose
		}
	}

	render() {
		let set_icon = require('../../../assets/set_icon.png'),
			  { set, pushState, query } = this.props;
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
					<p className="set_purpose" dangerouslySetInnerHTML={::this.renderPurpose(set.description, query)}></p>
					<span className="set_stats">{set.associations_count} items</span>
				</div>
			</li>
		);
	}
}