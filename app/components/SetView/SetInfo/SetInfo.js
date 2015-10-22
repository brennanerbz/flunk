import React, { Component, PropTypes } from 'react';
import moment from 'moment';
require('./SetInfo.scss');
import SubSetActions from '../SetHeader/SubSetActions';

export default class SetInfo extends Component {
	static propTypes = {
	}

	renderSubjects(subjects) {
		let last_subject = subjects.slice(-1)[0]
		let subject_list = subjects.pop()
		subject_list = subjects.map((subject, i) => {
			return <span key={i} className="subject">{subject + ", "}</span>
		})
		return (
			<span className="subject">{subject_list} and {last_subject}</span>
		);
	}
	
 
	render() {
		const { set } = this.props;
		const info = require('../../../assets/set_details_blue.png')
		const author = set.author.split(" ")[0]
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
						<p className="info_purpose">{set.description}</p>
					</div>
					<div className="subject_list">
						<p className="info_header">Subjects</p>
						{
							::this.renderSubjects(set.subjects)
						}
					</div>
					<div className="supplemental_details">
						<p className="created_details">Created by {author} on {moment(set.creation).format("MMMM Do")}</p>
					</div>
				</div>
			</div>
		);
	}
}