import _ from 'lodash';
import assign from 'lodash/object/assign';

import {
	RECEIVE_SETVIEW_SUCCESS,

	REQUEST_SET,
	RECEIVE_SET_SUCCESS,
	RECEIVE_SET_FAILURE,

	REQUEST_ASSOCIATIONS,
	RECEIVE_ASSOCIATIONS_SUCCESS,	
	RECEIVE_ASSOCIATIONS_FAILURE,

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
	isFetchingSet: false,
	set: {},
	assignment: {},
	id: null,
	title: null,
	purpose: null,
	creator_username: null,
	creator_pic: null,
	member_count: null,
	item_count: null,
	associations: [],
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

export default function setView(state = initial_setstate, action) {
	switch(action.type) {
		case REQUEST_SET:
			return {
				...state,
				isFetchingSet: true
			}

		case RECEIVE_SET_SUCCESS:
			let set = action.set,
				subjects = [];
			set.subjects.forEach(sub => subjects.push(sub.name))
			return {
				...state,
				set: set,
				id: set.id,
				title: set.title,
				purpose: set.description,
				doc: set.creation,
				creator_username: set.creator.username,
				creator_pic: set.creator.profile_picture,
				subjects: subjects
			}
		case RECEIVE_ASSOCIATIONS_SUCCESS:
			let items = [];
			action.associations.forEach(acc => {
				items.push(acc.item)
			})
			return {
				...state,
				associations: action.associations,
				items: items,
				item_count: items.length,
				isFetchingSet: false
			}
		case RECEIVE_ASSIGNMENT_SUCCESS:
			let assignment = action.assignment,
				_associations = [],
				_items = [];
			assignment.set.associations.associations.forEach(asc => { 
				_associations.push(asc) 
				_items.push(asc.item)
			})
			console.log(_associations)
			return {
				...state,
				assignment: assignment,
				associations: _associations,
				items: _items,
				item_count: _items.length,
				isFetchingSet: false
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
		case RECEIVE_ASSOCIATIONS_FAILURE:
		case RECEIVE_ASSIGNMENT_FAILURE:
		case UPDATE_ASSIGNMENT_FAILURE:
		default:
			return state;
	}
}