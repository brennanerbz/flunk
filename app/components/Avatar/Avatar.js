import React, { Component, PropTypes } from 'react';

export default class Avatar extends Component {
	static propTypes = {
		
	}

	render() {
		return(
			<button className="button button-borderless">
			<div className="avatar">
				<a className="link">
				<img src="https://cdn-images-1.medium.com/fit/c/72/72/0*Un7eHMAQh62QX1LO.jpg" className="avatar-img"/>
				</a>
			</div>
			</button>
		);
	}
}