import React, { Component, PropTypes } from 'react';
import classnames from 'classnames'; 
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { saveTitle,
	     savePurpose, 
	     saveSet } from '../../../actions/createset';

import CreateSetTitle from './CreateSetTitle';
import CreateSetPurpose from './CreateSetPurpose';
import ButtonGroup from './ButtonGroup';

import Avatar from '../../Avatar/Avatar';

@connect(
	state => (state),
	dispatch => bindActionCreators({
				saveTitle, 
				savePurpose,
				saveSet}, dispatch)
)
export default class CreateSetHeader extends Component {
	static propTypes = {
		isTitleFocused: PropTypes.bool,
		lastSavedTimestamp: PropTypes.number,
		onPublish: PropTypes.func,
		set: PropTypes.object,
		setLuid: PropTypes.number,
		hasFocusedInput: PropTypes.bool
	}

	constructor(props) {
		super(props);
		this.state = {
			title: '',
			purpose: ''
		}
	}

	handleTitleChange = (e) => {
		const title = e.target.value;
		this.setState({
			title: title
		});
	}
	handleTitleBlur = () => {
		const { saveTitle } = this.props;
		const title = this.state.title;
		saveTitle(title)
	}
	handlePurposeChange = (e) => {
		const purpose = e.target.value;
		this.setState({
			purpose: purpose
		});
	}
	handlePurposeBlur = () => {
		const { savePurpose } = this.props;
		const purpose = this.state.purpose;
		savePurpose(purpose);
	}
	render() {
		const { saveSet } = this.props;
		return(
			<div className="CreateSetHeader"> 
	          <div className="container CreateSetHeader-container">
	            <div className="CreateSetHeader-wrapper">
	              <Avatar/>
	              <CreateSetTitle	              	
	              	autoFocus={true}
	              	indexForTab={1}
	              	placeholder="Set title"
	              	onBlur={this.handleTitleBlur}
	              	onChange={this.handleTitleChange}
	              	onFocus={this.handleTitleFocus}
	              />
	              <CreateSetPurpose
	              	indexForTab={2}
	              	placeholder="Optional purpose"
	              	onBlur={this.handlePurposeBlur}
	              	onChange={this.handlePurposeChange}
	              	onFocus={this.handlePurposeFocus}
	              />             
	            </div>
	            <ButtonGroup onSave={() => saveSet()}
	            />	                        
	          </div>	              
	        </div>
		)
	}
}