import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as searchactions from '../../../actions/search'
import { pushState } from 'redux-router';

@connect(state => ({
	loc: state.router.location,
	searching: state.search.searching,
	term_name: state.search.term_name,
	query: state.search.query
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

	componentDidMount() {
		const { loc } = this.props,
				lastSlash = loc.pathname.lastIndexOf("/"),
				query = loc.pathname.slice(lastSlash, loc.length).replace("/", "")
		if(loc.pathname.indexOf('search') !== -1) this.setState({value: query});
	}

	componentWillReceiveProps(nextProps) {
		if(nextProps.loc.pathname.indexOf('search') == -1) { this.setState({value: ''}); return; }
		const { loc } = this.props,
				lastSlash = loc.pathname.lastIndexOf("/"),
				query = loc.pathname.slice(lastSlash, loc.length).replace("/", "").split("%20").map(word => word.replace("%20", "")).join(" ")
		if(loc.pathname.indexOf('search') !== -1) this.setState({value: query});
	}

	handleSearchInput(e) {
		const { searchItems, pushState } = this.props;
		this.setState({
			value: e.target.value
		});
	}

	handleSearchSubmit() {
		const { searchItems, searchSets, searchUsers, pushState, loc, requestSearch, term_name } = this.props,
			    value = this.state.value,
			    lastSlash = loc.pathname.lastIndexOf("/"),
			    query = loc.pathname.slice(lastSlash, loc.length).replace("/", "")
		if(query == value == term_name) return;
		pushState(null, `/search/concepts/${value}`)
	}

	render() {
		const { loc, searching } = this.props;
		const searchIcon = require('../assets/SearchIcon.png');
		return(
			<div className="input-button-group predictive-search">
				<button className="button button-inline button-with-icon iconisInNav search_button">
					{
						searching
						?
						<div className="sk-fading-circle">
						  <div className="sk-circle1 sk-circle"></div>
						  <div className="sk-circle2 sk-circle"></div>
						  <div className="sk-circle3 sk-circle"></div>
						  <div className="sk-circle4 sk-circle"></div>
						  <div className="sk-circle5 sk-circle"></div>
						  <div className="sk-circle6 sk-circle"></div>
						  <div className="sk-circle7 sk-circle"></div>
						  <div className="sk-circle8 sk-circle"></div>
						  <div className="sk-circle9 sk-circle"></div>
						  <div className="sk-circle10 sk-circle"></div>
						  <div className="sk-circle11 sk-circle"></div>
						  <div className="sk-circle12 sk-circle"></div>
						</div>
						: null
					}
					{
						!searching
						?
						<img className="search-icon svg-icon" src={searchIcon}></img>
						: null
					}
				</button>
				<input className="text-input search-input input-rounded"
					   placeholder="Search"
					   value={this.state.value}
					   onChange={::this.handleSearchInput}
					   onKeyDown={(e) => { if(e.which === 13) { ::this.handleSearchSubmit() } } }
				/>										
			</div>
		);
	}
}