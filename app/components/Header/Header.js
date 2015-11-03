import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import pushState from 'redux-router';
const styles = require('./Header.scss');

import Notifications from './Notifications/Notifications';
import SearchBox from './SearchBox/SearchBox';
import Avatar from '../Avatar/Avatar';
import Menu from '../Menu/Menu';


@connect(state => ({
	loc: state.router.location,
	sets: state.sets.sets,
	current_sequence: state.learn.current_sequence,
	learn_set: state.learn.current_sequence.set,
	set_id: state.learn.current_sequence.set_id,
	isFetching: state.sets.isFetchingAssignments,
	fetchingLearn: state.learn.isFetchingLearn,
	current_sequence: state.learn.current_sequence
}))
export default class Header extends Component {
	static propTypes = {
		loc: PropTypes.object
	}

	state = {
		isSetMenuOpen: false,
		choices: ['Go to set', 'Edit', 'Privacy settings', 'Mode']
	}

	renderFetchProgress() {
		return (
			<span className="loading_line"></span>
		);
	}

	openSetMenu() {
		let open = this.state.isSetMenuOpen;
		if(open) {
			this.setState({
				isSetMenuOpen: false
			});
			return;
		}
		this.setState({
			isSetMenuOpen: true
		});
	}

	closeSetMenu() {
		this.setState({
			isSetMenuOpen: false
		});
	}

	findSetMenuPos() {
		let node = this.refs['set_name'];
		const new_rect = node.getBoundingClientRect()
		const rect = window.getComputedStyle(node)
		return new_rect;
	}

	handleSelect(choice) {
		console.log(choice)
	}

	render() {
		const logo = require('./assets/FlunkLogo.png'),
			  create_icon = require('../../assets/create_new_pencil.png'),
			  dropdown_icon = require('../../assets/dropdown_arrow.png'),
			  { loc, 
			  	sets, 
			  	isFetching, 
			  	current_sequence, 
			  	fetchingLearn,
			  	learn_set,
			  	set_id
			  } = this.props;
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
							
							{
								loc.pathname.indexOf('/learn') !== -1 || loc.pathname.indexOf('/createset') !==  -1
								? null
								: <button className="create_set_btn_group">
										<img className="create_icon" src={create_icon}/>
										<Link className="button create-set-button button-outline" to="/createset">
														Create a study set					
										</Link>	
								  </button>
							}
						</span>
						{ !fetchingLearn && loc.pathname.indexOf('/learn') !== -1 ? 
						<span className="open_set_container set_name_wrapper"
						      ref="set_name_wrapper">
								<Link to={`/set/${set_id}`} className="open_set_btn"
										// onClick={::this.openSetMenu}
									    // onBlur={::this.closeSetMenu}
									    ref="open_set_btn">
										<h1 className="set_name"
											ref="set_name"><span className="set_hash">#</span>{learn_set.title.toLowerCase()}</h1>
										<span>
											<img className="dropdown_menu_icon icon" 
											 src={dropdown_icon}/>
										</span>
								</Link>
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


// <Menu learn={true}
// 	  bounding={true}
// 	  isOpen={this.state.isSetMenuOpen}
// 	  side='left'
// 	  rect={::this.findSetMenuPos}
// 	  choices={this.state.choices}
// 	  onSelect={(choice) => ::this.handleSelect(choice)} />