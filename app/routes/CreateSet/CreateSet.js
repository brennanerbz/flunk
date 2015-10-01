import React, { Component, PropTypes } from 'react';
import classnames from 'classnames'; 
const styles = require('./CreateSet.scss');

import TermRows from '../../components/TermRows/TermRows';
import CreateSetHeader from '../../components/CreateSetHeader/CreateSetHeader';

export default class CreateSetPage extends Component {
	static propTypes = {
		
	}
	static contextTypes = {
		
	}

	render() {
		return(
			<div className="CreateSetPage">
			  <CreateSetHeader/>                 
			  <div className="container CreateSetPage-container">
			    <div className="CreateSetPage-list">
			      <TermRows/>
			    </div>
			  </div>
			</div>
		);
	}
}