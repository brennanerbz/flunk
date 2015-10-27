import React, { Component, PropTypes } from 'react';
import SearchSetItem from './SearchSetItem';

/* SCSS Styles */
require('./SearchSets.scss');

export default class SearchSets extends Component {
	static propTypes = {
	}

	render() {
		return(
			<div className="search_sets_container">
				<ul className="sets_list">
					{
						Array.apply(null, Array(5)).map((x, i) => {
							return <SearchSetItem key={i}/>
						})
					}
				</ul>
			</div>
		);
	}
}