import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

/* Parent Components */
import ProfilePic from '../../components/Profile/ProfilePic/ProfilePic';
import ProfileName from '../../components/Profile/ProfileName/ProfileName';
import ProfileTabs from '../../components/Profile/ProfileTabs/ProfileTabs';
import ProfileInfo from '../../components/Profile/ProfileInfo/ProfileInfo';

/* Child Components */
import ProfileCreated from '../../components/Profile/ProfileCreated/ProfileCreated';
import ProfileStudied from '../../components/Profile/ProfileStudied/ProfileStudied';

/* SCSS */
require('./Profile.scss');

/*
@connect.....
which route (created/studied) we're on, pass down the profile id to the child routes
the user object with picture, name, username, school, etc.
any stats related to the user
*/
/*
@dispatch
fetchUser(concurrent)
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
						{
							true
							? <ProfileCreated />
							: <ProfileStudied />
						}
					</article> 
				</div>
				<div className="col-md-4">
					<ProfileInfo className=""/>
				</div>
			</div>
		);
	}
}