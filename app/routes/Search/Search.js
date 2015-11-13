import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import classnames from 'classnames';
import { Link } from 'react-router';
import { pushState } from 'redux-router';

import * as searchactions from '../../actions/search';

/*Components*/
import SearchTabs from '../../components/Search/SearchTabs/SearchTabs';

/* Child Components */
import SearchConcepts from '../../components/Search/SearchConcepts/SearchConcepts';
import SearchSets from '../../components/Search/SearchSets/SearchSets';
import SearchPeople from '../../components/Search/SearchPeople/SearchPeople';
import SearchPaging from '../../components/Search/SearchPaging/SearchPaging';

/* SCSS Styles */
require('./Search.scss');

@connect(state => ({
	loc: state.router.location,
	searching: state.search.searching,
	noResults: state.search.noResults,
	query: state.search.query,
	items: state.search.items,
	term: state.search.term,
	definitions: state.search.definitions,
	examples: state.search.examples,
	related: state.search.related,
	sets: state.search.sets,
	users: state.search.users,
	/* Pagination state */
	item_page: state.search.item_page,
	item_page_prev_index: state.search.item_page_prev_index,
	item_page_next_index: state.search.item_page_next_index,
	set_page: state.search.set_page,
	set_page_prev_index: state.search.set_page_prev_index,
	set_page_next_index: state.search.set_page_next_index,
	user_page: state.search.user_page,
	user_page_prev_index: state.search.user_page_prev_index,
	user_page_next_index: state.search.user_page_next_index
	}),
	dispatch => ({
		...bindActionCreators({
			...searchactions,
			pushState
		}, dispatch)
	})
)
export default class Search extends Component {
	static propTypes = {
	}

	state = {
		current_tab: 'sets'
	}

	componentWillMount() {
		const { loc, 
				params,
				searching, 
				items, 
				sets, 
				users,
				searchItems,
				searchSets,
				searchUsers } = this.props;
		let index = params.query.indexOf('&'),
			query,
			page_index;
		if(index !== -1) {
			page_index = params.query
			.substring(params.query.indexOf('start') + 6);
			query = params.query.substring(0, index)
		} 
		else query = params.query;
		query = query.toLowerCase().trim()
		if(loc.pathname.indexOf('concepts') !== -1 && items == null) { 
			searchItems(query, page_index);
			this.setState({current_tab: 'concepts'});
		}
		if(loc.pathname.indexOf('sets') !== -1 && items == null) {
			searchSets(query, page_index);
			this.setState({current_tab: 'sets'});
		} 
		if(loc.pathname.indexOf('users') !== -1 && items == null) {
			searchUsers(query, page_index);
			this.setState({current_tab: 'users'});
		} 
	}

	componentWillReceiveProps(nextProps) {
		const { loc, 
				params,
				searching, 
				term,
				query,
				items, 
				sets, 
				users,
				searchItems,
				searchSets,
				searchUsers } = this.props;
		let pathname = loc.pathname,
			next_pathname = nextProps.loc.pathname,
			index = nextProps.params.query.indexOf('&'),
			next_query,
			page_index;
		if(index !== -1) {
			next_query = nextProps.params.query.substring(0, nextProps.params.query.indexOf('&')),
			page_index = nextProps.params.query.substring(nextProps.params.query.indexOf('start') + 6);
		} else {
			next_query = nextProps.params.query
		}
		next_query = next_query.toLowerCase().trim()
		if((params.query !== next_query || pathname !== next_pathname)
			&& !searching 
			&& next_pathname.indexOf('concepts') !== -1) {
			searchItems(next_query, page_index) 
			return;
		} 
		if((params.query !== next_query || pathname !== next_pathname)
			&& !searching 
			&& next_pathname.indexOf('sets') !== -1)  { 
			searchSets(next_query, page_index) 
			return;
		}
		if((params.query !== next_query || pathname !== next_pathname)
			&& !searching 
			&& next_pathname.indexOf('users') !== -1)  { 
			searchUsers(next_query, page_index)
			return;
		}
	}

	componentWillUnmount() {
		this.props.clearSearch()
	}


	render() {
		const { query } = this.props.params,
			  { loc, searching, items, noResults } = this.props;
		return(
			<div className="search_page">
				<nav className="search_tabs">
					<SearchTabs changeTab={(tab) => this.setState({current_tab: tab})} {...this.props}/>
				</nav>
				<article className={classnames("search_content", "no_sidenav_container", {'sets_page': true})}>
					{
						loc.pathname.indexOf('concepts') !== -1 && !searching && items !== null
						? <SearchConcepts query={query} {...this.props}/>
						: null
					}
					{
						loc.pathname.indexOf('sets') !== -1
						? <SearchSets query={query} {...this.props}/>
						: null
					}
					{
						loc.pathname.indexOf('users') !== -1
						? <SearchPeople query={query} {...this.props}/>
						: null
					}
					{
						!searching && !noResults
						? <SearchPaging tab={this.state.current_tab} {...this.props}/>
						: null
					}
				</article>
			</div>
		);
	}
}