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

@connect(state => ({
	loc: state.router.location,
	isFetching: state.setView.isFetchingSet,
	set: state.setView.set,
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
		const { params, fetchSet } = this.props;
		fetchSet(params.id)
	}

	componentWillReceiveProps(nextProps) {
		if(this.props.params.id !== nextProps.params.id) {
			this.props.clearSet()
			this.props.fetchSet(nextProps.params.id)
		}
	}

	componentWillUnmount() {
		const { clearSet, transfer } = this.props;
		transfer()
		clearSet()
	}

	render() {
		const { isFetching, associations } = this.props;
		return(
			<div className="set_view main_content">
				{
					!isFetching
					? <div className="row">
						<div className="col-sm-9 col-md-8 col-lg-8">
							<SetHeader {...this.props} />						
							<ItemList {...this.props}/>	
						</div>
						<div className="col-md-4 col-lg-4">
							<SetInfo {...this.props}/>
						</div>
					</div>
					: null
				}
			</div>
		);
	}
}

// <QuickPractice set={set}  />


