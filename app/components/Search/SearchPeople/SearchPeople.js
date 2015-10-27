import React, { Component, PropTypes } from 'react';
import SearchPersonItem from './SearchPersonItem';

require('./SearchPeople.scss');
export default class SearchPeople extends Component {
	static propTypes = {

	}

	render() {
		return(
			<div className="search_people_container">
				<ul className="people_list">
					{
						Array.apply(null, Array(5)).map((x, i) => {
							return <SearchPersonItem/>
						})
					}
				</ul>
			</div>
		);
	}
}