import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

export default class SearchTabs extends Component {
	static propTypes = {
	}

	render() {
		const { loc, query, pushState, changeTab } = this.props,
			    pathname = loc.pathname;
		return(
			<div className="tabs_container">
				<ul className="tabs_list">
					<li className={classnames("tab_item concepts_tab", 
								   			 {"active": pathname.indexOf('concepts') !== -1})}
						onClick={() => { 
							pushState(null, `/search/concepts/${query}`) 
							changeTab('concepts') 
						}}>
						Concepts
					</li>
					<li className={classnames("tab_item sets_tab", 
											 {"active": pathname.indexOf('sets') !== -1})}
						onClick={() => { 
							pushState(null, `/search/sets/${query}`)
							changeTab('sets') 
						}}>
						Sets
					</li>
					<li className={classnames("tab_item people_tab", 
											 {"active": pathname.indexOf('users') !== -1})}
						onClick={() => { 
							pushState(null, `/search/users/${query}`)
							changeTab('users') 
						}}>
						People
					</li>
				</ul>
			</div>
		);
	}
}

    // position: fixed;
    // line-height: 38px;
    // background-color: #fff;
    // z-index: 101;
    // width: 100%;