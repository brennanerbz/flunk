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
	sets: state.sets.set_items,
	isFetching: state.sets.isFetching,
	fetchingLearn: state.learn.is_fetching_learn
}))
export default class Header extends Component {
	static propTypes = {
		loc: PropTypes.object
	}

	renderFetchProgress() {
		return (
			<span className="loading_line"></span>
		);
	}


	render() {
		const logo = require('./assets/FlunkLogo.png'),
			  create_icon = require('../../assets/add_circle_icon.png'),
			  { loc, sets, isFetching, fetchingLearn} = this.props;
		let id = loc.pathname.replace(/\D/g,''),
			set = sets[id];
		return(
			<div>				
				<nav className={
					classnames({'header-bordered': 
							    loc.pathname == '/createset' ? false
							    : true },
								'header header-top')}>
					{ 
						isFetching || fetchingLearn
						? ::this.renderFetchProgress()
						: null
					}
					
					<div className="container">
						<span className="header-block header-left float-left">
							<Link className="site-logo" to="/">						
									<img className="site-icon" src={logo} />
							</Link>
							<SearchBox {...this.props}/>
							<button className="create_set_btn_group">
								<img className="create_icon" src={create_icon}/>
								<Link className="button create-set-button" to="/createset">
												Create a study set					
								</Link>	
							</button>						
						</span>
						{ set && loc.pathname.indexOf('/learn') !== -1 ? 
						<span className="set_name_wrapper overflow_ellipsis">
							<h1 className="set_name">{set.name}</h1>
						</span> 
						: null } 
						<span className="header-block header-right">
							<div className="button-group">
								{  
									loc.pathname.indexOf('/learn') !== -1 || loc.pathname == '/createset'
									? null 									
									: 
									<span>										
										<Notifications {...this.props}/>	
									</span>						
								}
								<Avatar/>								
							</div>
						</span>
					</div>
				</nav>
			</div>
		);
	}
}