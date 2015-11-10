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
			purpose: '',
			subjects: '',
			subject_editor_open: false
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
			updateSet(set, {name: "title", prop: _title})
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

	updateSubjects() {
		const { set, updateSetSubjects } = this.props;
		let subjects = this.state.subjects;
		if(subjects == undefined) {
			this.setState({ subject_editor_open: false});
			return;
		}
		subjects = subjects.trim().split(",").map(sub => sub.replace(" ", "").trim()).join("|")
		this.setState({subjects: subjects, subject_editor_open: false})
		// TODO: call and update the set subjects
		// updateSetSubjects(subjects)
	}

	render() {
		const { saveSet, subjects } = this.props;
		let subject_names = [];
		subjects.forEach(sub => subject_names.push(sub.name))
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
	              		&& !this.state.subject_editor_open
	              		? subjects.map((subject, i) => {
	              			return <li key={i} className="subject"><p>{subject.name}</p></li>
	              		})
	              		: null
	              	}
	              	{
	              		subjects !== undefined
	              		&& subjects !== null
	              		&& subjects.length > 0
	              		&& !this.state.subject_editor_open
	              		? <span className="edit_link" 
	              				onClick={() => this.setState({subject_editor_open: true})}>
	              				<a className="link">edit</a>
	              		  </span>
	              		: null
	              	}
	              </ul> 
	              {
	              	this.state.subject_editor_open
	              	?
					<div className="subject_editor">
						<label htmlFor="subject_text" 
							   className="tiny_bottom_margin mini subtle_silver">
						Edit subjects
						</label>
						<textarea id="subject_text" 
								  name="subject_text" 
								  className="subject_text"
								  defaultValue={subjects !== null ? subject_names : null} 
								  onChange={(event) => this.setState({ subjects: event.target.value })}
								  autoFocus={true}/>
						<div className="button_group">
							<button className="button button-outline button-small"
									onClick={() => {
										this.setState({
											subjects: subject_names,
											subject_editor_open: false
										});
									}}
									>Cancel
							</button>
							<button className="button button-primary button-small"
									onClick={() => ::this.updateSubjects()}
									>Done
							</button>
						</div>
					</div>
					: null
	              }
	            </div>
	            <ButtonGroup onSave={::this.handleSave}
	            		     {...this.props}
	            />	                        
	          </div>	              
	        </div>
		)
	}
}


