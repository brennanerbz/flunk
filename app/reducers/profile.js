import {
	REQUEST_PROFILE,
	RECEIVE_PROFILE_SUCCESS,
	RECEIVE_PROFILE_FAILURE,
	REQUEST_USERCREATED_SETS,
	RECEIVE_USERCREATED_SETS_SUCCESS,
	RECEIVE_USERCREATED_SETS_FAILURE,
	REQUEST_USERSTUDIED_SETS,
	RECEIVE_USERSTUDIED_SETS_SUCCESS,
	RECEIVE_USERSTUDIED_SETS_FAILURE,
	CLEAR_PROFILE
} from '../actions/profile';

const initial_profilestate = {
	isFetchingProfile: false,
	profile: {},
	username: '',
	full_name: '',
	user_pic: '',
	school: '',
	studied_sets: [],
	created_sets: [],
	studiedset_count: '',
	createdset_count: '',
	createditems_count: ''
}

export function profile(state = initial_profilestate, action) {
	switch(action.type) {
		case REQUEST_PROFILE:
			return {
				...state,
				isFetchingProfile: true
			}
		case RECEIVE_PROFILE_SUCCESS:
			let profile = action.profile;
			return {
				...state,
				profile: profile,
				username: profile.username,
				full_name: profile.firstname + " " + profile.lastname,
				user_pic: profile.pic_url,
				school: profile.school
				// TODO: find which route handles the stats, and create new actions/dispatchers for that 
			}
		case RECEIVE_USERCREATED_SETS_SUCCESS:
			return {
				...state,
				created_sets: action.created_sets
			}
		case RECEIVE_USERSTUDIED_SETS_SUCCESS:
			return {
				...state,
				studied_sets: action.studied_sets
			}
		case CLEAR_PROFILE:
			return {
				...state = initial_profilestate
			}
		case RECEIVE_PROFILE_FAILURE:
		case RECEIVE_USERCREATED_SETS_FAILURE:
		case RECEIVE_USERSTUDIED_SETS_FAILURE:
		default:
			return state;
	}
}