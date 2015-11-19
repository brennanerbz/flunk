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
	title_flag: state.createset.title_flag,
	resizing: state.createset.resizing,
	/* New state */
	row_length: state.createset.row_length,
	rendered: state.createset.rendered
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
				unMountingCreate,
				deleted	 
				} = this.props;
				
		unMountingCreate()

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
		const { isLoadingSet, rendered } = this.props;
		return(
			<div className={classnames("CreateSetPage no_sidenav_container", {"rendering": !rendered })}>
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
					<CreateSetHeader 
						assignment={this.props.assignment}
						associations={this.props.associations}
						check_subjects={this.props.check_subjects}
						deleted={this.props.deleted}
						editing={this.props.editing}
						isLoadingSet={this.props.isLoadingSet}
						isUpdatingSet={this.props.isUpdatingSet}
						items={this.props.items}
						loadSetFlag={this.props.loadSetFlag}
						purpose={this.props.purpose}
						set={this.props.set}
						id={this.props.id}
						setTitleFlag={this.props.setTitleFlag}
						subjects={this.props.subjects}
						title={this.props.title}
						title_flag={this.props.title_flag}
						createAssignment={this.props.createAssignment}
						updateAssignment={this.props.updateAssignment}
						createSet={this.props.createSet}
						updateSet={this.props.updateSet}
						updateSetSubjects={this.props.updateSetSubjects}
						user={this.props.user}
						pushState={this.props.pushState}
					/>                 
					<div className="container">
						<div className="CreateSetPage-list">
							<TermRows
								addRow={this.props.addRow}
								assignment={this.props.assignment}
								associations={this.props.associations}
								check_subjects={this.props.check_subjects}
								createAssociation={this.props.createAssociation}
								updateAssociation={this.props.updateAssociation}
								createItem={this.props.createItem}
								updateItem={this.props.updateItem}
								deleteRow={this.props.deleteRow}
								flag={this.props.flag}
								items={this.props.items}
								resize={this.props.resize}
								resizing={this.props.resizing}
								rows={this.props.rows}
								row_length={this.props.row_length}
								setFlag={this.props.setFlag}
								finishedRendering={this.props.finishedRendering}
							/>
						</div>
					</div>
				</div>
			}
			</div>
		);
	}
}