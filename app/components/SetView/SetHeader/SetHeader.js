import React, { Component, PropTypes } from 'react';
require('./SetHeader.scss');

export default class SetHeader extends Component {
	static propTypes = {
	}

	render() {
		const image = require('../../../assets/set_profile_image.png');
		const { set } = this.props;
		return(
			<span className="set_header">
				<div className="inline_image">
					<a className="link"><img className="set_image" src={image}/></a>
				</div>
				<div className="page_header_wrapper header_info inline_info">
					<h1 className="page_header set_title">{set.title}</h1>
					<span><p className="set_author">{set.item_count} items by <a className="link">{set.author}</a></p></span>
				</div>
			</span>
		);
	}
}