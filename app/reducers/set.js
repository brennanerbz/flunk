import _ from 'lodash';
import assign from 'lodash/object/assign';

import {
	REQUEST_SET,
	RECEIVE_SET_SUCCESS,
	RECEIVE_SET_FAILURE,

	REQUEST_CONTENT,
	REQUEST_ITEM,
	RECEIVE_CONTENT_SUCCESS,
	RECEIVE_ITEM_SUCCESS,
	RECEIVE_CONTENT_FAILURE,
	RECEIVE_ITEM_FAILURE,

	REQUEST_ASSIGNMENT,
	RECEIVE_ASSIGNMENT_SUCCESS,
	RECEIVE_ASSIGNMENT_FAILURE,
	HAS_NOT_STUDIED,

	UPDATE_ASSIGNMENT_SUCCESS,
	UPDATE_ASSIGNMENT_FAILURE,

	CLEAR_SET_SUCCESS,
	CLEAR_SET_FAILURE
} from '../actions/set';

const initial_setstate = {
	id: null,
	title: null,
	purpose: null,
	creator_username: null,
	creator_pic: null,
	member_count: null,
	item_count: null,
	items: [],
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
		case '':
			return;
		case '':
			return;
		default:
			return state;
	}
}