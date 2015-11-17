import React, { Component, PropTypes } from 'react';
require('./ErrorPage.scss')

export default class ErrorPage extends Component {
	static propTypes = {
	}

	render() {
		return(
			<div className="">
				<div className="error_page">
					<h1 className="error">404</h1>
					<h1 className="not_found">Not found.</h1>
					<p className="head error_message">
						Looks like something went wrong!
					</p>
					<p className="error_message">
						We can't find the page you're looking for. Head back <a className="link">home.</a>
					</p>
				</div>
			</div>
		);
	}
}