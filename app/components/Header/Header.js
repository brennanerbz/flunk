import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
const styles = require('./Header.scss');

export default class Header extends Component {
	static propTypes = {
		
	}

	render() {
		const logo = require('./FlunkLogo.png');
		const searchIcon = require('./SearchIcon.png');
		return(
			<nav className="header header-bordered header-top">
				<div className="container">
					<div className="header-block header-left float-left">
						<Link to="/">
							<a className="site-logo">
								<img className="site-icon" src={logo} />
							</a>
						</Link>
						<div className="input-button-group predictive-search">
							<button className="button button-inline button-with-icon iconisInNav">
								<img className="search-icon svg-icon" src={searchIcon}></img>
							</button>
							<input className="text-input search-input input-rounded"
								   placeholder="Search"
							/>
							<a className="button button-primary create-set-button">
							Create a study set
							</a>
						</div>
					</div>
					<div className="header-block header-right float-right">
						<div className="button-group">
						</div>
					</div>
				</div>
			</nav>
		);
	}
}