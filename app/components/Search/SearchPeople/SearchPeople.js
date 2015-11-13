import React, { Component, PropTypes } from 'react';
import SearchPersonItem from './SearchPersonItem';
import NullSearchResults from '../NullResults/NullSearchResults';

require('./SearchPeople.scss');
export default class SearchPeople extends Component {
	static propTypes = {

	}

	render() {
		const { users, query, searching } = this.props;
		return(
			<div className="search_people_container">
				<ul className="people_list">
					{
						users !== null && users.length > 0
						?
						users.map((x, i) => {
							return <SearchPersonItem key={i} 
												     user={x} 
												     {...this.props}/>
						})
						: null
						
					}
					{
						users.length == 0  || users == undefined
						? <NullSearchResults {...this.props}/>
						: null
					}
				</ul>
			</div>
		);
	}
}