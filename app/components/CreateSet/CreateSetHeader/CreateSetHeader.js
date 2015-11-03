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
	render() {
		const { saveSet } = this.props;
		return(
			<div className="CreateSetHeader"> 
	          <div className="container CreateSetHeader-container">	
	            <div className="CreateSetHeader-wrapper">	              
	              <CreateSetTitle	              	
	              	autoFocus={true}
	              	indexForTab={1}
	              	placeholder="Untitled"
	              	onBlur={this.handleTitleBlur}
	              	onChange={this.handleTitleChange}
	              	onFocus={this.handleTitleFocus}
	              />
	              <ul className="subject_list">
	              	<li className="subject">
	              		<p>psychology</p>
	              	</li>
	              </ul>
	            </div>
	            <ButtonGroup onSave={() => saveSet()}
	            />	                        
	          </div>	              
	        </div>
		)
	}
}


// <CreateSetPurpose
// 	indexForTab={2}
// 	placeholder="Purpose (optional)"
// 	onBlur={this.handlePurposeBlur}
// 	onChange={this.handlePurposeChange}
// 	onFocus={this.handlePurposeFocus}
// />
// 
// 
// <div className="create_avatar">
	// <a className="link">
		// <img src="https://cdn-images-1.medium.com/fit/c/72/72/0*Un7eHMAQh62QX1LO.jpg" className="avatar-img"/>	          		
	// </a>
// </div> 

