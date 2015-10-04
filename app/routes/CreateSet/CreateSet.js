import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import classnames from 'classnames'; 
import { connect } from 'react-redux';
const styles = require('./CreateSet.scss');

import TermRows from '../../components/CreateSet/TermRows/TermRows';
import CreateSetHeader from '../../components/CreateSet/CreateSetHeader/CreateSetHeader';

export default class CreateSetPage extends Component {
	constructor(props, context) {
		super(props, context)
	}
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