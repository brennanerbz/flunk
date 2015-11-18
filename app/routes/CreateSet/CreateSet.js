import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import classnames from 'classnames'; 
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { pushState } from 'redux-router';
const styles = require('./CreateSet.scss');

import * as createactions from '../../actions/createset';
import * as transfer from '../../actions/transfer';

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
	deleted: state.createset.deleted,
	isLoadingSet: state.createset.isLoadingSet,
	isCreatingSet: state.createset.isCreatingSet,
	isUpdatingSet: state.createset.isUpdatingSet,
	check_subjects: state.createset.check_subjects,
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
			...transfer,
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

	subPoll = {}

	subjectPoll() {
		const { updateSetSubjects, check_subjects, set } = this.props;
		if(check_subjects && set !== null) {
			updateSetSubjects(undefined, set.id)
		}
	}

	componentWillMount() {
		const { params, transfer, loadEditing, loadSetFlag, pushState } = this.props;
		loadSetFlag()
		if(Object.keys(params).length !== 0) loadEditing(params.id, pushState) 
	}

	componentDidMount() {
		this.subPoll = setInterval(() => {
			::this.subjectPoll()
		}, 2500)
	}

	componentWillUnmount() {
		const { set, 
				updateSet, 
				clearSet, 
				assignment, 
				createAssignment,
				associations,
				reorder, 
				clearTransferState,
				deleted	 
				} = this.props;

		clearTransferState()

		if(set !== null) {
			if(assignment !== null && Object.keys(associations).length > 1) reorder()
			if(assignment == null && !deleted) {
				updateSet(set, {name: 'finalized', prop: null})
				createAssignment(set.id)
				if(associations !== (null)) {
					if(Object.keys(associations).length > 1) reorder()
				} 
			}
		}
		setTimeout(() => {
			clearSet()
		}, 50)

		clearInterval(this.subPoll)
	}	

	render() {
		const { isLoadingSet } = this.props;
		return(
			<div className="CreateSetPage no_sidenav_container">
			{
				isLoadingSet
				?
				<div className="big_spinner">
					<div className="sk-fading-circle">
					  <div className="sk-circle1 sk-circle"></div>
					  <div className="sk-circle2 sk-circle"></div>
					  <div className="sk-circle3 sk-circle"></div>
					  <div className="sk-circle4 sk-circle"></div>
					  <div className="sk-circle5 sk-circle"></div>
					  <div className="sk-circle6 sk-circle"></div>
					  <div className="sk-circle7 sk-circle"></div>
					  <div className="sk-circle8 sk-circle"></div>
					  <div className="sk-circle9 sk-circle"></div>
					  <div className="sk-circle10 sk-circle"></div>
					  <div className="sk-circle11 sk-circle"></div>
					  <div className="sk-circle12 sk-circle"></div>
					</div>
				</div>
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