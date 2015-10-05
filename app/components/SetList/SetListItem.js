import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

export default class SetListItem extends Component {
	static propTypes = {
	}

	render() {
		const set_icon = require('../../assets/set_icon.png'),
			  share_icon = require('../../assets/share_icon.png'),
			  more_icon = require('../../assets/more_icon.png');
		return(
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
		);
	}
}