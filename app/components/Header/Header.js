import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import pushState from 'redux-router';
const styles = require('./Header.scss');

import Notifications from './Notifications/Notifications';
import SearchBox from './SearchBox/SearchBox';
import Avatar from '../Avatar/Avatar';


@connect(state => ({
	loc: state.router.location,
	sets: state.sets.items
}))
export default class Header extends Component {
	static propTypes = {
		loc: PropTypes.object
	}

	render() {
		const logo = require('./assets/FlunkLogo.png'),
			  { loc, sets } = this.props;
		let id = loc.pathname.replace(/\D/g,''),
			set = sets[id];
		return(
			<div>				
				<nav className={classnames({'header-bordered': String(loc.pathname) !== '/createset'},
										    'header header-top')}>
					<div className="container">
						<span className="header-block header-left float-left">
							<Link className="site-logo" to="/">						
									<img className="site-icon" src={logo} />
							</Link>
							<SearchBox {...this.props}/>							
						</span>
						{ set && loc.pathname.indexOf('/learn') !== -1 ? 
						<span className="set_name_wrapper">
							<h1 className="set_name">{set.name}</h1>
						</span> 
						: null } 
						<span className="header-block header-right">
							<div className="button-group">
								{ String(loc.pathname) !== '/createset' &&
									<Link className="button button-primary create-set-button" to="/createset">
										Create a study set					
									</Link>
								}
								<Notifications {...this.props}/>
								<Avatar/>								
							</div>
						</span>
					</div>
				</nav>
			</div>
		);
	}
}