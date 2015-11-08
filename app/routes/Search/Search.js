import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import classnames from 'classnames';
import { Link } from 'react-router';

/*Components*/
import SearchTabs from '../../components/Search/SearchTabs/SearchTabs';

/* Child Components */
import SearchConcepts from '../../components/Search/SearchConcepts/SearchConcepts';
import SearchSets from '../../components/Search/SearchSets/SearchSets';
import SearchPeople from '../../components/Search/SearchPeople/SearchPeople';

/* SCSS Styles */
require('./Search.scss');

export default class Search extends Component {
	static propTypes = {
	}

	render() {
		return(
			<div className="search_page">
				<nav className="search_tabs">
					<SearchTabs/>
				</nav>
				<article className={classnames("search_content", "no_sidenav_container", {'sets_page': true})}>
					{
						true
						? <SearchConcepts/>
						: null
					}
					{
						false
						? <SearchSets />
						: null
					}
					{
						false
						? <SearchPeople />
						: null
					}
				</article>
			</div>
		);
	}
}