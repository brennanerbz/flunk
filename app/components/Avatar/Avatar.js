import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
const styles = require('./Avatar.scss');

export default class Avatar extends Component {
	static propTypes = {
		
	}

	render() {
		const { is_create_set } = this.props;
		return(
			<span className={classnames({'avatar-table': is_create_set})}>
			<button className="button button-borderless">
			<div className={classnames(
				{'inline-avatar': is_create_set}
				)}>
				<a className="link">
				<img src="https://cdn-images-1.medium.com/fit/c/72/72/0*Un7eHMAQh62QX1LO.jpg" className="avatar-img"/>
				</a>
			</div>
			</button>
			{ is_create_set &&
				<div className="inline-profile">
					<a className="link link-profile">
					Brennan Erbeznik
					</a>
					<span className="profile-supplemental">
					Draft
					</span>
				</div>
			}
			</span>
		);
	}
}