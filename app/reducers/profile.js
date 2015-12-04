import {
	REQUEST_PROFILE,
	RECEIVE_PROFILE_SUCCESS,
	RECEIVE_PROFILE_FAILURE,
	REQUEST_USER_ASSIGNMENTS,
	RECEIVE_USER_ASSIGNMENTS_SUCCESS,
	RECEIVE_USER_ASSIGNMENTS_FAILURE,
	CLEAR_PROFILE
} from '../actions/profile';

const initial_profilestate = {
	isFetchingProfile: false,
	user: {},
	id: '',
	username: '',
	full_name: '',
	profile_pic: '',
	school: '',
	assignments: [],
	studied_sets: [],
	created_sets: [],
	studiedset_count: 0,
	createdset_count: 0,
	createditems_count: 0
}

export default function profile(state = initial_profilestate, action) {
	switch(action.type) {
		case REQUEST_PROFILE:
			return {
				...state,
				isFetchingProfile: true
			}
		case RECEIVE_PROFILE_SUCCESS:
			let user = action.user;
			return {
				...state,
				user: user,
				id: user.id,
				username: user.username,
				full_name: user.first_name + " " + user.last_name,
				user_pic: user.profile_picture,
				school: user.school !== null ? user.school : null
				// TODO: when stat routes are up, use them
			}
		case RECEIVE_USER_ASSIGNMENTS_SUCCESS:
			let studied = [],
				created = [],
				_user = action.user,
				assignments = action.assignments;
			assignments.forEach(assig => {
				studied.push(assig.set)
			});
			assignments.filter(assig => {
				return assig.set.creator_id === _user.id
				}).forEach(assign => {
					created.push(assign.set)
				})
			studied = studied.filter(set => set.finalized !== null)
			created = created.filter(set => set.finalized !== null)
			return {
				...state,
				isFetchingProfile: false,
				assignments: assignments,
				studied_sets: studied,
				studiedset_count: studied.length - 1,
				created_sets: created,
				createdset_count: created.length - 1
			}
		case CLEAR_PROFILE:
			return {
				...state = initial_profilestate
			}
		case RECEIVE_PROFILE_FAILURE:
		case RECEIVE_USER_ASSIGNMENTS_FAILURE:
		default:
			return state;
	}
}