import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { pushState } from 'redux-router';
import DocumentTitle from 'react-document-title';


import * as profileactions from '../../actions/profile';

/* Parent Components */
import ProfilePic from '../../components/Profile/ProfilePic/ProfilePic';
import ProfileName from '../../components/Profile/ProfileName/ProfileName';
import ProfileTabs from '../../components/Profile/ProfileTabs/ProfileTabs';
import ProfileInfo from '../../components/Profile/ProfileInfo/ProfileInfo';

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
@connect( state => ({
	isFetchingProfile: state.profile.isFetchingProfile,
	sets: state.sets.sets,
	profilestate: state.profile,
	username: state.profile.username,
	full_name: state.profile.full_name,
	school: state.profile.school,
	studied_sets: state.profile.studied_sets,
	created_sets: state.profile.created_sets,
	studiedset_count: state.profile.studiedset_count,
	createdset_count: state.profile.createdset_count
	}),
	dispatch => ({
		...bindActionCreators({
			...profileactions,
			pushState
		}, dispatch)
	})
)
export default class Profile extends Component {
	static propTypes = {
	}

	state = {
		current_tab: ''
	}

	componentWillMount() {
		let {
			fetchProfilePage,
			params
		} = this.props;
		fetchProfilePage(params.id)
	}

	componentWillReceiveProps(nextProps) {
		const { params, fetchProfilePage } = this.props;
		if(params.id !== nextProps.params.id) {
			fetchProfilePage(nextProps.params.id)
		}
	}

	componentWillUnmount() {
		let { clearProfile } = this.props;
		clearProfile()
	}

	render() {
		const { school, pushState, params, isFetchingProfile } = this.props;
		var profileChildrenWithProps = React.Children.map(this.props.children, (child) => {
			return React.cloneElement(child, {
				...this.props
			})
		})
		return(
			<DocumentTitle title={`${this.props.username} | Ace`}>
				<div className="main_content profile_view">
					{
						isFetchingProfile
						?
						<div className="big_spinner">
							<div className="sk-fading-circle">
							  <div className="sk-circle1 sk-circle"></div>
							  <div className="sk-circle2 sk-circle"></div>
							  <div className="sk-circle3 sk-circle"></div>
							  <div className="sk-circle4 sk-circle"></div>
							  <div className="sk-circle5 sk-circle"></div>
							  <div className="sk-circle6 sk-circle"></div>
							  <div className="sk-circle7 sk-circle"></div>
							  <div className="sk-circle8 sk-circle"></div>
							  <div className="sk-circle9 sk-circle"></div>
							  <div className="sk-circle10 sk-circle"></div>
							  <div className="sk-circle11 sk-circle"></div>
							  <div className="sk-circle12 sk-circle"></div>
							</div>
						</div>
						:
						<div className={classnames({'col-sm-11 col-md-11': school == undefined},
												   {'col-sm-9 col-md-8': school !== undefined})}>
							<header className="profile_header">
								<ProfilePic/>
								<ProfileName {...this.props}/>
							</header>
							<nav className="profile_tabs">
								<ProfileTabs tab={this.state.current_tab}
										     changeTabs={(tab) => { 
										     	this.setState({current_tab: tab})
										     	pushState(null, `/profile/${params.id}/${tab}`)
										     }}/>
							</nav>
							<article className="profile_setlist_container">
								{ profileChildrenWithProps }
							</article> 
						</div>
					}
				</div>
			</DocumentTitle>
		);
	}
}

// {
// 	school !== undefined
// 	? <div className="col-md-4">
// 	  	<ProfileInfo className=""/>
// 	  </div>
// 	: null
// }