import React, { Component, PropTypes } from 'react';
import moment from 'moment';
require('./SetInfo.scss');
import SubSetActions from '../SetHeader/SubSetActions';

export default class SetInfo extends Component {
	static propTypes = {
	}

	renderSubjects(subjects) {
		if(subjects.length === 0) {
			return <span className="subject">No subjects listed</span>
		}
		let last_subject = subjects.slice(-1)[0]
		subjects.pop()
		let subject_list = subjects.map((subject, i) => {
			return <span key={'subject' + i} className="subject">{subject + ", "}</span>
		})
		return (
			<span className="subject">{subject_list} and {last_subject}</span>
		);
	}
	
 
	render() {
	const { purpose, 
			subjects, 
			doc, 
			creator_username } = this.props,
	 	    info = require('../../../assets/set_details_blue.png');
		return(
			<div className="set_info">
				<div className="section_header set_details">					
					<span className="section_icon">
						<img src={info} className="info_icon header_icon"/>
					</span>
					<span className="section_header_label">
						Set Details
					</span>
				</div>
				<div className="set_details">
					<div className="purpose">
						<p className="info_header">Purpose</p>
						<p className="info_purpose">
							{
								purpose !== null && purpose.length > 0
								? purpose
								: "No purpose given"
							}
						</p>
					</div>
					<div className="subject_list">
						<p className="info_header">Subjects</p>
						{
							::this.renderSubjects(subjects)
						}
					</div>
					<div className="supplemental_details">
						<p className="created_details">Created by {creator_username} on {moment(doc).format("MMMM Do")}</p>
					</div>
				</div>
			</div>
		);
	}
}