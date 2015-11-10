import {
	SEARCH,
	REQUEST_ITEMS,
	RECEIVE_ITEMS_SUCCESS,
	RECEIVE_ITEMS_FAILURE,
	REQUEST_SETS,
	RECEIVE_SETS_SUCCESS,
	RECEIVE_SETS_FAILURE,
	REQUEST_USERS,
	RECEIVE_USERS_SUCCESS,
	RECEIVE_USERS_FAILURE
} from '../actions/search';

var initial_searchstate = {
	searching: false,
	items: null,
	sets: null,
	users: null
}

export default function search(state = initial_searchstate, action) {
	switch(action) {
		case SEARCH:
			return {
				...state,
				searching: true
			}
		case REQUEST_ITEMS:
			return {
				...state,
				searching: true
			}
		case RECEIVE_ITEMS_SUCCESS:
			return {
				...state,
				searching: false,
				items: action.items
			}
		case REQUEST_SETS:
			return {
				...state,
				searching: true
			}
		case RECEIVE_SETS_SUCCESS:
			return {
				...state,
				searching: false,
				sets: action.sets
			}
		case REQUEST_USERS:
			return {
				...state,
				searching: true
			}
		case RECEIVE_USERS_SUCCESS:
			return {
				...state,
				searching: false,
				users: action.users
			}
		case RECEIVE_ITEMS_FAILURE:
		case RECEIVE_SETS_FAILURE:
		case RECEIVE_USERS_FAILURE:
		default:
			return state;
	}
}












