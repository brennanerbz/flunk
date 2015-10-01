import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
const styles = require('./Header.scss');

import Notifications from './Notifications/Notifications';
import SearchBox from './SearchBox/SearchBox';
import Avatar from '../Avatar/Avatar';

export default class Header extends Component {
	static propTypes = {
		
	}

	render() {
		const logo = require('./assets/FlunkLogo.png');
	
		return(
			<nav className="header header-bordered header-top">
				<div className="container">
					<div className="header-block header-left float-left">
						<Link to="/">
							<a className="site-logo">
								<img className="site-icon" src={logo} />
							</a>
						</Link>
						<SearchBox/>
					</div>
					<div className="header-block header-right float-right">
						<div className="button-group">
							<Notifications/>
							<Avatar/>
						</div>
					</div>
				</div>
			</nav>
		);
	}
}