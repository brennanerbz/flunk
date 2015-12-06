import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
const styles = require('./Avatar.scss');

export default class Avatar extends Component {
	static propTypes = {
		
	}

	render() {
		const { is_create_set, user, pushState } = this.props;
		return(
			<span className={classnames({'avatar-table': is_create_set})}>
			<button style={{paddingLeft: '0'}} className="button button-borderless button-outline">
			<div className={classnames(
				{'inline-avatar': is_create_set}
				)}>
				<a className="user_name" 
				   onClick={() => pushState(null, `/profile/${user.id}`)}>
					<img src="https://cdn-images-1.medium.com/fit/c/72/72/0*Un7eHMAQh62QX1LO.jpg" className="avatar-img"/>
					{ !is_create_set && <span className="">{user.username}</span> }
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