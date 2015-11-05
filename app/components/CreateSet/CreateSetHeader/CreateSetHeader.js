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
		const { createSet, 
				updateSet,
				id, // set_id
				title, 
				set,
				setTitleFlag } = this.props,
			    _title = this.state.title;
		setTitleFlag(true)
		if(id == null && _title.length > 2) {
			createSet(_title)
			return;
		}                                                                       
		if((set && title) !== null && _title !== title) {
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
			// TODO: createSequence()
		}
	}

	render() {
		const { saveSet, subjects } = this.props;
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
	              	{
	              		subjects !== undefined
	              		&& subjects !== null
	              		? subjects.map((subject, i) => {
	              			return <li key={i} className="subject"><p>{subject.name}</p></li>
	              		})
	              		: null
	              	}
	              	{
	              		subjects !== undefined
	              		&& subjects !== null
	              		&& subjects.length > 0
	              		? <span className="edit_link"><a className="link">edit</a></span>
	              		: null
	              	}
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


