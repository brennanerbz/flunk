import {
	SEARCH,
	CLEAR,
	CLEAR_PAGES,
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
	searchFlag: false,
	noResults: false,
	query: '',
	items: null,
	item_page: 0,
	item_page_prev_index: 0,
	item_page_next_index: 0,
	term: null,
	term_name: null,
	definitions: null,
	examples: null,
	related: null,
	sets: null,
	set_page: 0,
	set_page_prev_index: 0,
	set_page_next_index: 0,
	users: null,
	user_page: 0,
	user_page_next_index: 0,
	user_page_next_index: 0
}

export default function search(state = initial_searchstate, action) {
	switch(action.type) {
		case SEARCH:
			return {
				...state,
				searching: true,
				searchFlag: true,
				noResults: false
			}
		case REQUEST_ITEMS:
			return {
				...state,
				// searching: true
			}
		case RECEIVE_ITEMS_SUCCESS:
			let term = {}, definitions = [], examples = [], related = [], items = action.items, query = action.query;
			items.forEach((item, i) => { 
				if (item.target == query && item.cue.indexOf(query) == -1) definitions.push(item)
				if (item.target == query && item.cue.indexOf(query) !== -1) examples.push(item)
				if (item.target !== query) related.push(item)
			})
			if(definitions !== undefined && definitions[0] !== undefined) term = definitions[0]
			else if (examples !== undefined && examples[0] !== undefined) term = examples[0]
			else term = null
			return {
				...state,
				searching: false,
				searchFlag: false,
				noResults: action.items.length === 0,
				items: action.items,
				term: term,
				term_name: term !== null ? term.target : null,
				definitions: definitions,
				examples: examples,
				related: related,
				query: action.query
			}
		case REQUEST_SETS:
			return {
				...state,
				// searching: true
			}
		case RECEIVE_SETS_SUCCESS:
			let page,
				prev_index = action.index > 9 ? Number(action.index) - 9 : 0,
				next_index = Number(action.index) + 9;
			if(action.index < 10) page = 1
			else page = Math.ceil(action.index / 10) + 1
			return {
				...state,
				searching: false,
				searchFlag: false,
				noResults: action.sets.length === 0,
				sets: action.sets,
				set_page: state.query == action.query ? page : 1,
				set_page_prev_index: state.query == action.query ? prev_index : 0,
				set_page_next_index: state.query == action.query ? next_index : 0,
				query: action.query
			}
		case REQUEST_USERS:
			return {
				...state,
				// searching: true
			}
		case RECEIVE_USERS_SUCCESS:
			return {
				...state,
				searching: false,
				searchFlag: false,
				noResults: action.users.length === 0,
				users: action.users,
				query: action.query
			}
		case CLEAR_PAGES:
			return {
				...state,
				set_page: 0,
				set_page_next_index: 0,
				// TODO: Add other pages
			}
		case CLEAR: 
			return {
				...state = initial_searchstate
			}
		case RECEIVE_ITEMS_FAILURE:
		case RECEIVE_SETS_FAILURE:
		case RECEIVE_USERS_FAILURE:
		default:
			return state;
	}
}












