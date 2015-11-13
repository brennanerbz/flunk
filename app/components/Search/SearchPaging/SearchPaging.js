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

	prevPage() {
		console.log("page backward")
	}

	nextPage() {
		console.log("page backward")
	}

	render() {
		const back_active = require('../../../assets/chevron_left_active.png'),
			  next_active = require('../../../assets/chevron_right_active.png'),
			  back_disabled = require('../../../assets/chevron_left_disabled.png'),
			  next_disabled = require('../../../assets/chevron_right_disabled.png')
		return(
			<div className="search_paging">
				<a className={classnames("page_backward")}
				   onMouseOver={() => this.setState({back_hover: true})}
				   onMouseLeave={() => this.setState({back_hover: false})}
				   onClick={() => ::this.prevPage()}>
					<span className={classnames({"underline": this.state.back_hover})}>Previous</span>
					<img src={back_active} className={classnames("left previous", { "disabled": false } )}/>
				</a>
				
				<span className="page_text">Page 1 of 14</span>

				<a className={classnames("page_forward")}
				   onMouseOver={() => this.setState({next_hover: true})}
				   onMouseLeave={() => this.setState({next_hover: false})}
				   onClick={() => ::this.nextPage()}>
					<img src={next_active} className={classnames("right forward",  { "disabled": false } )}/>
					<span className={classnames({"underline": this.state.next_hover})}>Next</span>
				</a>
			</div>
		);
	}
}
