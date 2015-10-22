import _ from 'lodash';
import assign from 'lodash/object/assign';

import {
	RECEIVE_SETVIEW_SUCCESS,

	REQUEST_SET,
	RECEIVE_SET_SUCCESS,
	RECEIVE_SET_FAILURE,

	REQUEST_CONTENT,
	RECEIVE_CONTENT_SUCCESS,	
	RECEIVE_CONTENT_FAILURE,

	RECEIVE_ITEMS_SUCCESS,
	RECEIVE_ITEMS_FAILURE,

	REQUEST_ITEM,
	RECEIVE_ITEM_SUCCESS,
	RECEIVE_ITEM_FAILURE,

	REQUEST_ASSIGNMENT,
	RECEIVE_ASSIGNMENT_SUCCESS,
	RECEIVE_ASSIGNMENT_FAILURE,
	HAS_NOT_STUDIED,

	UPDATE_ASSIGNMENT_SUCCESS,
	UPDATE_ASSIGNMENT_FAILURE,

	CLEAR_SET
} from '../actions/set';

const initial_setstate = {
	set: {},
	isFetchingSet: false,
	id: null,
	title: null,
	purpose: null,
	creator_username: null,
	creator_pic: null,
	member_count: null,
	item_count: null,
	items_from_append: [],
	items_from_whole: [],
	subjects: [],
	doc: null,
	has_studied: null,
	default_diff: 'Beginner',
	url_link: null,
	editability: null,
	searchable: null,
	user_privacy: {},
	last_slot: {} // TODO: EVENTUALLY, DISPLAY LAST_SLOT
}

export function set(state = initial_setstate, action) {
	switch(action.type) {
		case REQUEST_SET:
			return {
				...state,
				isFetchingSet: true
			}

		case RECEIVE_SET_SUCCESS:
			let set = action.set;
			return {
				...state,
				set: set,
				id: set.id,
				title: set.title,
				purpose: set.purpose,
				doc: set.doc,
				creator_username: set.creator.username,
				creator_pic: set.creator.user_pic,
				member_count: set.member_count,
				item_count: set.item_count,
				subjects: set.subjects
			}
		case RECEIVE_ITEMS_SUCCESS: // 1) Competing reducer TODO: CHOOSE ONE
			return {
				...state,
				items_from_whole: action.item_list
			}
		case RECEIVE_ITEM_SUCCESS: // 2) Competing reducer TODO: CHOOSE ONE
			return {
				...state,
				items_from_append: state.items_from_append.concat(action.item)
			}
		case RECEIVE_ASSIGNMENT_SUCCESS:
			let assignment = action.assignment;
			return {
				...state,
				has_studied: true,
				default_diff: assignment.default_diff, // TODO: LOOK UP OFFICIAL API KEYS
				user_privacy: assignment.privacy
			}
		case HAS_NOT_STUDIED:
			return {
				...state,
				has_studied: false
			}
		case RECEIVE_SETVIEW_SUCCESS:
			return {
				...state,
				isFetchingSet: false
			}
		case CLEAR_SET:
			return {
				...state = initial_setstate
			}
		case RECEIVE_SET_FAILURE:
		case RECEIVE_CONTENT_FAILURE:
		case RECEIVE_ITEMS_FAILURE:
		case RECEIVE_ITEM_FAILURE:
		case RECEIVE_ASSIGNMENT_FAILURE:
		case UPDATE_ASSIGNMENT_FAILURE:
		default:
			return state;
	}
}