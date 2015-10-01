import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import pushState from 'redux-router';
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
			<div>
				<nav className="header header-bordered header-top">
					<div className="container">
						<div className="header-block header-left float-left">
							<Link className="site-logo" to="/">						
									<img className="site-icon" src={logo} />					
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
			</div>
		);
	}
}