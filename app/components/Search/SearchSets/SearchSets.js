import React, { Component, PropTypes } from 'react';
import SearchSetItem from './SearchSetItem';

/* SCSS Styles */
require('./SearchSets.scss');

export default class SearchSets extends Component {
	static propTypes = {
	}

	render() {
		const { query, sets } = this.props; 
		return(
			<div className="search_sets_container">
			 {
			 	sets !== null
			 	?
			 	<ul className="sets_list">
			 		{
			 			sets.map((x, i) => {
			 				return <SearchSetItem key={i} set={x} key={i} {...this.props}/>
			 			})
			 		}
			 	</ul>
			 	: null
			 }
			</div>
		);
	}
}