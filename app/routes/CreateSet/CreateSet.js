import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import classnames from 'classnames'; 
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
const styles = require('./CreateSet.scss');

import * as createactions from '../../actions/createset';

/* Components */
import TermRows from '../../components/CreateSet/TermRows/TermRows';
import CreateSetHeader from '../../components/CreateSet/CreateSetHeader/CreateSetHeader';

@connect(state => ({
	/* Flags */
	isCreatingSet: state.createset.isCreatingSet,
	isUpdatingSet: state.createset.isUpdatingSet,
	/* Normal state */
	state: state.createset,
	set: state.createset.set,
	title: state.createset.title,
	id: state.createset.id,
	purpose: state.createset.purpose,
	subjects: state.createset.subjects,
	creator_id: state.createset.creator_id,
	creator_username: state.createset.creator_username,
	associations: state.createset.associations,
	items: state.createset.items,
	current_item: state.createset.current_item,
	current_association: state.createset.current_association,
	current_order_index: state.createset.current_order_index,
	term_choices: state.createset.term_choices,
	def_choices: state.createset.def_choices,
	}),
	dispatch => ({
		...bindActionCreators({
			...createactions
		}, dispatch)
	})
)
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
			<div className="CreateSetPage no_sidenav_container">
			  <CreateSetHeader {...this.props}/>                 
			  <div className="container">
			    <div className="CreateSetPage-list">
			      <TermRows {...this.props}/>
			    </div>
			  </div>
			</div>
		);
	}
}