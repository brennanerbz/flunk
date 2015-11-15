import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import classnames from 'classnames'; 
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { pushState } from 'redux-router';
const styles = require('./CreateSet.scss');

import * as createactions from '../../actions/createset';

/* Components */
import TermRows from '../../components/CreateSet/TermRows/TermRows';
import CreateSetHeader from '../../components/CreateSet/CreateSetHeader/CreateSetHeader';

@connect(state => ({
	/* Router state */
	router: state.router,
	loc: state.router.location,
	/* Transfer state */
	transfer: state.transfer,
	/* Flags */
	editing: state.createset.editing,
	isLoadingSet: state.createset.isLoadingSet,
	isCreatingSet: state.createset.isCreatingSet,
	isUpdatingSet: state.createset.isUpdatingSet,
	/* User */
	user: state.user.user,
	/* Normal state */
	state: state.createset,
	set: state.createset.set,
	assignment: state.createset.assignment,
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
	rows: state.createset.rows,
	flag: state.createset.flag,
	title_flag: state.createset.title_flag
	}),
	dispatch => ({
		...bindActionCreators({
			...createactions,
			pushState
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

	componentWillMount() {
		const { params, transfer, loadEditing } = this.props;
		if(Object.keys(params).length !== 0) loadEditing(params.id)
	}

	componentWillReceiveProps(nextProps) {
		// console.log(nextProps.loc)
	}

	componentDidUpdate() {

	}

	componentWillUnmount() {
		const { clearSet, reorderSet } = this.props;
		// TODO: create reorder fn()
		// reorderSet()
		setTimeout(() => { clearSet() }, 5)
	}	

	render() {
		const { isLoadingSet } = this.props;
		return(
			<div className="CreateSetPage no_sidenav_container">
			{
				isLoadingSet
				? null
				: 
				<div>
					<CreateSetHeader {...this.props}/>                 
					<div className="container">
						<div className="CreateSetPage-list">
						<TermRows {...this.props} />
					</div>
					</div>
				</div>
			}
			</div>
		);
	}
}