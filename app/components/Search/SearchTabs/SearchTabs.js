import React, { Component, PropTypes } from 'react';

export default class SearchTabs extends Component {
	static propTypes = {
	}

	render() {
		return(
			<div className="tabs_container">
				<ul className="tabs_list">
					<li className="tab_item concepts_tab">
						Concepts
					</li>
					<li className="tab_item sets_tab">
						Sets
					</li>
					<li className="tab_item people_tab active">
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