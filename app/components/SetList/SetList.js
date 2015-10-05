import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
const styles = require('./SetList.scss');

export default class SetList extends Component {
	static propTypes = {
		
	}

	componentDidMount = () => {
		$("[data-toggle='tooltip']").tooltip({
			delay: { show: 400, hide: 50}
		})
	}

	render() {
		const set_icon = require('../../assets/set_icon.png'),
			  share_icon = require('../../assets/share_icon.png'),
			  more_icon = require('../../assets/more_icon.png');
		return(
			<div>
				<div className="day_divider">
					<hr className="separator"/>
					<i className="copy_only"/>
					<div className="day_divider_label">
						Last studied
					</div>
				</div>
				<div className="sets_container">
			      	<div className="row set_row">	
				        <div className="col-sm-1 col-md-1 set_col row_icon">
				        	<img className="home_set_icon active" src={set_icon}/>
				        </div>
				        <div className="col-sm-5 col-md-5 set_col set_name">
				        	<span className="overflow_ellipsis"><a>Intro to biology</a></span>
				        </div>
				        <div className="col-sm-3 col-md-3 set_col set_author">
				        	<span className="overflow_ellipsis">by Brennan Erbeznik</span>
				        </div>
				        <div className="col-sm-2 col-md-2 set_col date_last_studied">
				        	<span className="overflow_ellipsis">1 hour ago</span>
				        </div>
				        <div className={classnames('actions')}>
				        	<button data-toggle="tooltip" title="Share" className="btn_icon btn_outline btn_square">
				        		<img className="icon" src={share_icon}/>
				        	</button>
				        	<button data-toggle="tooltip" title="More" className="btn_icon btn_outline btn_square">
				        		<img className="icon_awksize" src={more_icon}/>
				        	</button>
				        </div>
				    </div>
				    <div className="row set_row">	
				        <div className="col-sm-1 col-md-1 set_col row_icon">
				        	<img className="home_set_icon active" src={set_icon}/>
				        </div>
				        <div className="col-sm-5 col-md-5 set_col set_name">
				        	<span className="overflow_ellipsis"><a>Computer Science 101</a></span>
				        </div>
				        <div className="col-sm-3 col-md-3 set_col set_author">
				        	<span className="overflow_ellipsis">by Nathan Lomeli</span>
				        </div>
				        <div className="col-sm-2 col-md-2 set_col date_last_studied">
				        	<span className="overflow_ellipsis">7 hours ago</span>
				        </div>
				        <div className={classnames('actions')}>
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
		);
	}
}