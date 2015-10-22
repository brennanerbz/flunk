import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

/* Components */
import ProfilePic from '../../components/Profile/ProfilePic/ProfilePic';
import ProfileName from '../../components/Profile/ProfileName/ProfileName';
import ProfileTabs from '../../components/Profile/ProfileTabs/ProfileTabs';
import ProfileInfo from '../../components/Profile/ProfileInfo/ProfileInfo';
import SetList from '../../components/SetList/SetList';

/* SCSS */
require('./Profile.scss');

/*
@connect.....
*/
export default class Profile extends Component {
	static propTypes = {
	}

	render() {
		return(
			<div className="main_content profile_view">
				<div className="col-sm-9 col-md-8">
					<header className="profile_header">
						<ProfilePic/>
						<ProfileName/>
					</header>
					<nav className="profile_tabs">
						<ProfileTabs/>
					</nav>
					<article className="profile_setlist_container">
						<SetList profile={true}/>
					</article> 
				</div>
				<div className="col-md-4">
					<ProfileInfo className=""/>
				</div>
			</div>
		);
	}
}