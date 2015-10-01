import React, { Component, PropTypes } from 'react';

export default class SearchBox extends Component {
	static propTypes = {
	}

	render() {
		const searchIcon = require('../assets/SearchIcon.png');
		return(
			<div className="input-button-group predictive-search">
				<button className="button button-inline button-with-icon iconisInNav">
					<img className="search-icon svg-icon" src={searchIcon}></img>
				</button>
				<input className="text-input search-input input-rounded"
					   placeholder="Search"
				/>
				<a className="button button-primary create-set-button">
				Create a study set
				</a>
			</div>
		);
	}
}