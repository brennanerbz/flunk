import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import classnames from 'classnames';
import { pushState } from 'redux-router';
require('./Set.scss')

import * as setactions from '../../actions/set';
import * as transfer from '../../actions/transfer';

/* Components */
import SetHeader from '../../components/SetView/SetHeader/SetHeader';
import SetInfo from '../../components/SetView/SetInfo/SetInfo';
import ItemList from '../../components/SetView/ItemList/ItemList';
import QuickPractice from '../../components/SetView/QuickPractice/QuickPractice';
import Tabs from '../../components/SetView/Tabs/Tabs';

@connect(state => ({
	loc: state.router.location,
	user: state.user.user,
	isFetching: state.setView.isFetchingSet,
	set: state.setView.set,
	assignment: state.setView.assignment,
	creator_id: state.setView.set.creator_id,
	creator_username: state.setView.creator_username,
	title: state.setView.title,
	id: state.setView.id,
	purpose: state.setView.purpose,
	item_count: state.setView.item_count,
	subjects: state.setView.subjects,
	doc: state.setView.doc,
	associations: state.setView.associations,
	items: state.setView.items
	}),
	dispatch => ({
		...bindActionCreators({
			...setactions,
			...transfer,
			pushState
		}, dispatch)
	})
)
export default class Set extends Component {
	static propTypes = {
		params: PropTypes.object
	}

	componentWillMount() {
		const { params, fetchSet, fetchAssociations } = this.props;
		fetchSet(params.id)
		fetchAssociations(params.id)
	}

	componentWillReceiveProps(nextProps) {
		if(this.props.params.id !== nextProps.params.id) {
			this.props.clearSetView()
			this.props.fetchSet(nextProps.params.id)
			this.props.fetchAssociations(nextProps.params.id)
		}
	}

	componentWillUnmount() {
		const { clearSetView, transfer } = this.props;
		transfer()
		clearSetView()
	}

	render() {
		const { isFetching, associations } = this.props;
		return(
			<div className="set_view main_content">
				{
					!isFetching
					? <div className="row">
						<div className="col-sm-9 col-md-8 col-lg-8">
							<SetHeader 
								assignment={this.props.assignment}
								creator_id={this.props.creator_id}
								creator_username={this.props.creator_username} 
								id={this.props.id}
								item_count={this.props.item_count}
								set={this.props.set}
								title={this.props.title}
								user={this.props.user}
								pushState={this.props.pushState}
							/>		
							<Tabs />				
							<ItemList
								assignment={this.props.assignment}
								associations={this.props.associations}
								id={this.props.id}
								item_count={this.props.item_count}
								items={this.props.items}
								set={this.props.set} 
								pushState={this.props.pushState}
							/>	
						</div>
						<div className="col-md-4 col-lg-4">
							<SetInfo 
								assignment={this.props.assignment}
								creator_id={this.props.creator_id}
								creator_username={this.props.creator_username} 
								id={this.props.id}
								doc={this.props.doc}
								item_count={this.props.item_count}
								purpose={this.props.purpose}
								subjects={this.props.subjects}
								pushState={this.props.pushState}
							/>
						</div>
					</div>
					: 
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
				}
			</div>
		);
	}
}

// <QuickPractice set={set}  />


