import React, { Component, PropTypes } from 'react';
import classnames from 'classnames'; 
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

/* Child Components */
import CreateSetTitle from './CreateSetTitle';
import CreateSetPurpose from './CreateSetPurpose';
import ButtonGroup from './ButtonGroup';
import Avatar from '../../Avatar/Avatar';

export default class CreateSetHeader extends Component {
	static propTypes = {
		
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
		const { saveTitle, 
				createSet, 
				updateSet,
				id, // set_id
				title, 
				set } = this.props,
			    _title = this.state.title;
		if(id == null && _title.length > 2) {
			createSet(_title)
			return;
		}
		if((set && title) !== null) {
			updateSet({name: "title", prop: _title})
			return;
		}
	}
	handleSave() {
		const { createSet,
				createAssignment,
			    title,
			    items,
			    set } = this.props;
		if((title || set) == null) {
			console.log("Need at least one item or a title!")
			// TODO: add error div for incomplete set_page
			return;
		}
		if(set !== null) {
			createAssignment(set.id, 'admin')
		}
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
	            <ButtonGroup onSave={::this.handleSave}
	            		     {...this.props}
	            />	                        
	          </div>	              
	        </div>
		)
	}
}


