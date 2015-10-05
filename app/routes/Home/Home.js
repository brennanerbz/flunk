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
			  more_icon = require('../../assets/more_icon.png');
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
				  <table className="table">
				    <tbody>
				      <tr className="set_item_row"
				      	  onMouseOver={this.setActiveRow}
				      	  onMouseLeave={this.removeActiveRow}>
				        <td className="row_icon"><img className="home_set_icon active" src={set_icon}/></td>
				        <td className="set_name"><a>Intro to psychology</a></td>
				        <td className="set_author">by Nathan Lomeli</td>
				        <td className="date_last_studied">1 hour ago</td>
				        <td className={classnames('actions', {'active': this.state.active_set_row === 1})}>
				        	<button data-toggle="tooltip" title="Share" className="btn_icon btn_outline btn_square">
				        		<img className="icon" src={share_icon}/>
				        	</button>
				        	<button data-toggle="tooltip" title="More" className="btn_icon btn_outline btn_square">
				        		<img className="icon_awksize" src={more_icon}/>
				        	</button>
				        </td>      
				      </tr>
				      <tr className="set_item_row">
				        <td className="row_icon"><img className="home_set_icon" src={set_icon}/></td>
				        <td className="set_name"><a>Intro to psychology</a></td>
				        <td className="set_author">by Nathan Lomeli</td>
				        <td className="date_last_studied">1 hour ago</td>
				        <td className={classnames('actions', {'active': this.state.active_set_row === 2})}>
				        	<button className="btn_icon btn_outline btn_square">A</button>
				        </td> 	        
				      </tr>					      
				    </tbody>
				  </table>				  
				  </div>
				  <div className="supplemental col-md-3 remove_small">.col-xs-6 .col-md-4</div>
				</div>				
			</div>
		);
	}
}

