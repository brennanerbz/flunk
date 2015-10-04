import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
require('./Home.scss');

export default class Home extends Component {
	static propTypes = {
		
	}

	render() {
		const set_icon = require('../../assets/set_icon.png');
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
				  <table className="set_table">
				    <tbody>
				      <tr className="set_item_row">
				      	<div className="set_item_content">
				        <th scope="row"><img className="home_set_icon" src={set_icon}/></th>
				        <td className="set_name"><a>Intro to psychology</a></td>
				        <td className="set_author">by Nathan Lomeli</td>
				        <td className="date_last_studied">1 hour ago</td>
				        </div>
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