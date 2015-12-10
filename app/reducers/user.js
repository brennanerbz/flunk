import {
	REQUEST_USER,
	RECEIVE_USER_SUCCESS,
	RECEIVE_USER_FAILURE,
	CREATE_USER_SUCCESS,
	CREATE_USER_FAILURE
} from '../actions/user';

var _userinitialstate = {
	isFetchingUser: false,
	user: {},
	logged_in: false
}
export default function user(state = _userinitialstate, action) {
	switch(action.type) {
		case REQUEST_USER:
			return {
				...state,
				isFetchingUser: true
			}
		case RECEIVE_USER_SUCCESS:
			return {
				...state,
				isFetchingUser: false,
				user: action.user,
				logged_in: true
			}
		case CREATE_USER_SUCCESS:
			return {
				...state,
				isFetchingUser: false,
				user: action.new_user,
				logged_in: true
			}
		case RECEIVE_USER_FAILURE:
			return {
				...state,
				isFetchingUser: false,
				logged_in: false
			}
		case CREATE_USER_FAILURE:
		default:
			return state;
	}
}