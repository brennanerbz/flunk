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

/* SCSS Styles */
require('./Search.scss');

@connect(state => ({
	loc: state.router.location,
	searching: state.search.searching,
	query: state.search.query,
	items: state.search.items,
	term: state.search.term,
	definitions: state.search.definitions,
	examples: state.search.examples,
	related: state.search.related,
	sets: state.search.sets,
	users: state.search.users
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
		if(loc.pathname.indexOf('concepts') !== -1 && items == null) searchItems(params.query);
		if(loc.pathname.indexOf('sets') !== -1 && items == null) searchSets(params.query);
		if(loc.pathname.indexOf('users') !== -1 && items == null) searchUsers(params.query);
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
		let pathname = loc.pathname;
		if(params.query !== nextProps.params.query 
			&& !searching 
			&& pathname.indexOf('concepts') !== -1)  { 
			searchItems(nextProps.params.query) 
			return;
		} 
		if(params.query !== nextProps.params.query 
			&& !searching 
			&& pathname.indexOf('sets') !== -1)  { 
			searchSets(nextProps.params.query) 
			return;
		}
		if(params.query !== nextProps.params.query 
			&& !searching 
			&& pathname.indexOf('users') !== -1)  { 
			searchUsers(nextProps.params.query)
			return;
		}
	}

	componentWillUnmount() {
		this.props.clearSearch()
	}


	render() {
		const { query } = this.props.params,
			  { loc, searching, items } = this.props;
		return(
			<div className="search_page">
				<nav className="search_tabs">
					<SearchTabs {...this.props}/>
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
				</article>
			</div>
		);
	}
}