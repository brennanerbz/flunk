import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import classnames from 'classnames';
import { Link } from 'react-router';

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
	items: state.search.items,
	sets: state.search.sets,
	user: state.search.users
	}),
	dispatch => ({
		...bindActionCreators({
			...searchactions
		}, dispatch)
	})
)
export default class Search extends Component {
	static propTypes = {
	}

	render() {
		const { query } = this.props.params,
			  { loc } = this.props;
		console.log(query)
		console.log(loc)
		return(
			<div className="search_page">
				<nav className="search_tabs">
					<SearchTabs {...this.props}/>
				</nav>
				<article className={classnames("search_content", "no_sidenav_container", {'sets_page': true})}>
					{
						loc.pathname.indexOf('concepts') !== -1
						? <SearchConcepts {...this.props}/>
						: null
					}
					{
						loc.pathname.indexOf('sets') !== -1
						? <SearchSets {...this.props}/>
						: null
					}
					{
						loc.pathname.indexOf('users') !== -1
						? <SearchPeople {...this.props}/>
						: null
					}
				</article>
			</div>
		);
	}
}