import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
require('./SearchPaging.scss');

export default class SearchPaging extends Component {
	static propTypes = {
	}

	state = {
		back_hover: false,
		next_hover: true
	}

	prevPage(pushState, tab, query, index) {
		pushState(null, `/search/${tab}/${query}&start=${index}`)
		console.log('page backward')
	}

	nextPage(pushState, tab, query, index) {
		pushState(null, `/search/${tab}/${query}&start=${index}`)
		console.log("page forward")
	}

	render() {
		const back_active = require('../../../assets/chevron_left_active.png'),
			  next_active = require('../../../assets/chevron_right_active.png'),
			  back_disabled = require('../../../assets/chevron_left_disabled.png'),
			  next_disabled = require('../../../assets/chevron_right_disabled.png'),
			  {
			  	pushState,
			  	tab,
			  	query,
			  	item_page,
			  	item_page_prev_index,
			  	item_page_next_index,
			  	set_page,
			  	set_page_prev_index,
			  	set_page_next_index,
			  	user_page,
			  	user_page_prev_index,
			  	user_page_next_index
			  } = this.props;
		let page, prev_index, next_index;
		switch(tab) {
			case 'concepts':
				page = item_page
				prev_index = item_page_prev_index
				next_index = item_page_next_index
				break;
			case 'sets':
				page = set_page
				prev_index = set_page_prev_index
				next_index = set_page_next_index
				break;
			case 'users':
				page = user_page
				prev_index = set_page_prev_index
				next_index = user_page_next_index
				break;
			default:
				break;
		}
		return(
			<div className="search_paging">
				<a className={classnames("page_backward")}
				   onMouseOver={() => this.setState({back_hover: true})}
				   onMouseLeave={() => this.setState({back_hover: false})}
				   onClick={() => ::this.prevPage(pushState, tab, query, prev_index)}>
					<span className={classnames({"underline": this.state.back_hover})}>
						Previous
					</span>
					<img src={back_active} className={classnames("left previous", { "disabled": false } )}/>
				</a>
				
				<span className="page_text">Page {page}</span>

				<a className={classnames("page_forward")}
				   onMouseOver={() => this.setState({next_hover: true})}
				   onMouseLeave={() => this.setState({next_hover: false})}
				   onClick={() => ::this.nextPage(pushState, tab, query, next_index)}>
					<img src={next_active} 
						 className={classnames("right forward",  { "disabled": false } )}/>
					<span className={classnames({"underline": this.state.next_hover})}>
						Next
					</span>
				</a>
			</div>
		);
	}
}

// TODO: need results count to compute total # of pages
