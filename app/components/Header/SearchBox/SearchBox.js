import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as searchactions from '../../../actions/search'
import { pushState } from 'redux-router';

@connect(state => ({
	searching: state.search.searching
	}),
	dispatch => ({
		...bindActionCreators({
			...searchactions,
			pushState
		}, dispatch)
	})
)
export default class SearchBox extends Component {
	static propTypes = {
	}
	state = {
		value: ''
	}

	componentDidUpdate = () => {
		// console.log(this.props.loc.pathname)
	}

	handleSearchInput(e) {
		// console.log(e.target.value)
		this.setState({
			value: e.target.value
		});
	}

	handleSearchSubmit() {
		const { searchItems, searchSets, searchUsers, pushState } = this.props,
			    value = this.state.value;
		searchItems(value)
		pushState(null, `/search/concepts/${value}`)
	}

	render() {
		const { loc } = this.props;
		const searchIcon = require('../assets/SearchIcon.png');
		return(
			<div className="input-button-group predictive-search">
				<button className="button button-inline button-with-icon iconisInNav search_button">
					<img className="search-icon svg-icon" src={searchIcon}></img>
				</button>
				<input className="text-input search-input input-rounded"
					   placeholder="Search"
					   onChange={::this.handleSearchInput}
					   onKeyDown={(e) => { if(e.which === 13) { ::this.handleSearchSubmit() } } }
				/>										
			</div>
		);
	}
}