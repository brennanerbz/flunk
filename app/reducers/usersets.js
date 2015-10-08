import assign from 'lodash/object/assign';

import {
	REQUEST_SETS,
	RECEIVE_SETS_SUCCESS,
	RECEIVE_SETS_FAILURE
} from '../actions/usersets';

let init_state = {
	isFetching: false,
	set_list: [],
	set_items: {},
	sets: []
};

export default function sets(state = init_state, action) {
	switch(action.type) {
		case (REQUEST_SETS):
			return {
				...state,
				isFetching: true
			}
		case (RECEIVE_SETS_SUCCESS):
			const sets_obj = {};
			action.sets.forEach(set => { sets_obj[set.id] = set })
			return {
				...state,
				isFetching: false,
				set_list: action.sets.map(set => set.id),
				set_items: sets_obj,
				sets: action.sets
			}
		case (RECEIVE_SETS_FAILURE):
		default:
			return state;
	}
}






















