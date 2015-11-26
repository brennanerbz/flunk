import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { pushState } from 'redux-router';
const styles = require('./Header.scss');

import Notifications from './Notifications/Notifications';
import SearchBox from './SearchBox/SearchBox';
import Avatar from '../Avatar/Avatar';
import Menu from '../Menu/Menu';


@connect(state => ({
	loc: state.router.location,
	sets: state.sets.sets,
	user: state.user.user,
	logged_in: state.user.logged_in,
	current_sequence: state.learn.current_sequence,
	learn_set: state.learn.current_sequence.set,
	set_id: state.learn.current_sequence.set_id,
	isFetching: state.sets.isFetchingAssignments,
	fetchingLearn: state.learn.isFetchingLearn,
	current_sequence: state.learn.current_sequence
	}),
	dispatch => ({
		...bindActionCreators({
			pushState
		}, dispatch)
	})
)
export default class Header extends Component {
	static propTypes = {
		loc: PropTypes.object
	}

	state = {
		isSetMenuOpen: false,
		choices: ['Go to set', 'Edit', 'Privacy settings', 'Mode']
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
		// console.log(choice)
	}

	render() {
		const logo = require('./assets/FlunkLogo.png'),
			  mini_logo = require('../../assets/color_hash.png'),
			  create_icon = require('../../assets/create_new_pencil.png'),
			  dropdown_icon = require('../../assets/dropdown_arrow.png'),
			  { loc, 
			  	sets, 
			  	isFetching, 
			  	current_sequence, 
			  	fetchingLearn,
			  	learn_set,
			  	set_id,
			  	pushState,
			  	logged_in
			  } = this.props;
		let id = loc.pathname.replace(/\D/g,''),
			set = sets[id];
		return(
			<div>
			{
				loc.pathname.indexOf('sign-in') !== -1
				? null
				:
				<div className="header_positioner">
					<div className={classnames("header_container", 
						{'no_border': loc.pathname.indexOf('createset') !== -1 ? true : false })}>				
						<div className='header'>
							{ 
								isFetching || fetchingLearn
								? null
								// ? <span className="loading_line"></span>
								: null
							}
							<div className="header_logo">
								<Link className="site-logo" to="/">						
										<img className={classnames("site_icon")} 
											 src={logo} />
								</Link>
							</div>
							<div className="header_content">
								{
									loc.pathname.indexOf('/createset') !== -1
									? null
									: <SearchBox {...this.props}/>
								}
								{
									loc.pathname.indexOf('/learn') !== -1 || loc.pathname.indexOf('/createset') !==  -1
									? null
									: <button className="create_set_btn_group"
											  onClick={() => { 
											  	pushState(null, '/createset') 
											  }}>
											<img className="create_icon" src={create_icon}/>
											<Link className="button create-set-button button-outline" to="">
															Create a study set					
											</Link>	
									  </button>
								}
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
							</div>
							<div className="header_user">
								<div className="button-group">
									<button className="button upload_button">Upload</button>
									{
										logged_in
										?
										<Avatar {...this.props}/>
										: <button className="button sign_in_button"
										 		  onClick={() => pushState(null, '/sign-in')}>
										 		  Sign in
										 </button>	
									}
								</div>
							</div>
						</div>
					</div>
				</div>
				}
			</div>
		);
	}
}


// {  
// 	loc.pathname.indexOf('/learn') !== -1 || loc.pathname == '/createset'
// 	? null 									
// 	: 
// 	<span>										
// 		<Notifications {...this.props}/>	
// 	</span>						
// }

// <Menu learn={true}
// 	  bounding={true}
// 	  isOpen={this.state.isSetMenuOpen}
// 	  side='left'
// 	  rect={::this.findSetMenuPos}
// 	  choices={this.state.choices}
// 	  onSelect={(choice) => ::this.handleSelect(choice)} />