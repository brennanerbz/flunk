import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import { Link } from 'react-router';
require('./Home.scss');

export default class Home extends Component {
	static propTypes = {
		
	}
	constructor(props) {
		super(props);
		this.state = {
			active_set_row: 0
		}
	}

	setActiveRow = () => {
		this.setState({
			active_set_row: 1
		});
	}

	removeActiveRow = () => {
		this.setState({
			active_set_row: 0
		});
	}
	componentDidMount = () => {
		$("[data-toggle='tooltip']").tooltip({
			delay: { show: 400, hide: 50}
		})
	}

	render() {
		const set_icon = require('../../assets/set_icon.png'),
			  share_icon = require('../../assets/share_icon.png'),
			  more_icon = require('../../assets/more_icon.png'),
			  practice_icon = require('../../assets/practice_icon_blue.png'),
			  activity_icon = require('../../assets/activity_icon_blue.png'),
			  online_icon = require('../../assets/profile_icon_green.png');
		return(
			<div className="main_content home_container">
				<div className="page_header_wrapper">
					<h1 className="page_header">Home</h1>
				</div>
				<div className="row home_content">
				  <div className="col-sm-9 col-md-9 home_table">
				  <div className="day_divider">
				  	<hr className="separator"/>
				  	<i className="copy_only"/>
				  	<div className="day_divider_label">
				  		Last studied
				  	</div>
				  	<i className="copy_only"/>
				  </div>
				  <div className="sets_container">
				      	<div className="row set_row"
				      	  	 onMouseOver={this.setActiveRow}
				      	  	 onMouseLeave={this.removeActiveRow}>	
					        <div className="col-md-1 set_col row_icon">
					        	<img className="home_set_icon active" src={set_icon}/>
					        </div>
					        <div className="col-md-5 set_col set_name">
					        	<span className="overflow_ellipsis"><a>Intro to biology</a></span>
					        </div>
					        <div className="col-md-3 set_col set_author">
					        	<span className="overflow_ellipsis">by Brennan Erbeznik</span>
					        </div>
					        <div className="col-md-2 set_col date_last_studied">
					        	<span className="overflow_ellipsis">1 hour ago</span>
					        </div>
					        <div className={classnames('actions', {'active': this.state.active_set_row === 1})}>
					        	<button data-toggle="tooltip" title="Share" className="btn_icon btn_outline btn_square">
					        		<img className="icon" src={share_icon}/>
					        	</button>
					        	<button data-toggle="tooltip" title="More" className="btn_icon btn_outline btn_square">
					        		<img className="icon_awksize" src={more_icon}/>
					        	</button>
					        </div>
					    </div>
					    <div className="row set_row"
				      	  	 onMouseOver={this.setActiveRow}
				      	  	 onMouseLeave={this.removeActiveRow}>	
					        <div className="col-md-1 set_col row_icon">
					        	<img className="home_set_icon active" src={set_icon}/>
					        </div>
					        <div className="col-md-5 set_col set_name">
					        	<span className="overflow_ellipsis"><a>Computer Science 101</a></span>
					        </div>
					        <div className="col-md-3 set_col set_author">
					        	<span className="overflow_ellipsis">by Nathan Lomeli</span>
					        </div>
					        <div className="col-md-2 set_col date_last_studied">
					        	<span className="overflow_ellipsis">7 hours ago</span>
					        </div>
					        <div className={classnames('actions', {'active': this.state.active_set_row === 1})}>
					        	<button data-toggle="tooltip" title="Share" className="btn_icon btn_outline btn_square">
					        		<img className="icon" src={share_icon}/>
					        	</button>
					        	<button data-toggle="tooltip" title="More" className="btn_icon btn_outline btn_square">
					        		<img className="icon_awksize" src={more_icon}/>
					        	</button>
					        </div>
					    </div>         			 				  				  
				  </div>		  
				</div>	
					<div className="home_feed supplemental col-md-3 remove_small">
					<div className="section_header">
						<span className="section_icon"><img src={activity_icon} className="header_icon"/></span>
						<span className="section_header_label">Activity</span>
					</div>
					<ul className="activity_list">
						<li>
							<span className="activity_item">
								<div className="activity_action">
									<a><img src={practice_icon} className="activity_icon"/></a>
								</div>
								<div className="activity_message">
									<div className="message_content">Brennan Erbeznik practiced <a className="link">Intro to Psychology</a></div>
									<span className="message_datetime">4 hours ago</span>
								</div>
							</span>
						</li>
					</ul>
					<div className="section_header">
						<span className="section_icon"><img src={online_icon} className="header_icon"/></span>
						<span className="section_header_label">Online</span>
					</div>
					<ul className="activity_list">
						<li>
							<span className="activity_item">
								<div className="activity_action">
									<a><img src={practice_icon} className="activity_icon"/></a>
								</div>
								<div className="activity_message">
									<div className="message_content">Brennan Erbeznik practiced <a className="link">Intro to Psychology</a></div>
									<span className="message_datetime">4 hours ago</span>
								</div>
							</span>
						</li>
					</ul>
					</div>			
				</div>			
			</div>
		);
	}
}

