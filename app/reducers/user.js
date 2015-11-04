import {
	REQUEST_USER,
	RECEIVE_USER_SUCCESS,
	RECEIVE_USER_FAILURE
} from '../actions/user';

var _userinitialstate = {
	isFetchingUser: false,
	user: {}
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
				user: action.user
			}
		default:
			return state;
	}
}