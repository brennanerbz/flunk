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
	user_page_prev_index: 0,
	user_page_next_index: 0
}

function pages(index) {
	let page,
		prev_index = index > 9 ? Number(index) - 9 : 0,
		next_index = Number(index) + 9;
	if(index < 9) page = 1
	else page = Math.ceil(index / 10) + 1
	return {
		page: page,
		prev_index: prev_index,
		next_index: next_index
	}
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
				if (item.target.toLowerCase().trim() == query.toLowerCase().trim()) {
					if(item.cue !== null) {
						if(item.cue.indexOf(query) == -1) definitions.push(item)
						if(item.cue.indexOf(query) !== -1) examples.push(item)
					}
				}
				if (item.target !== query) related.push(item)
			})
			if(definitions !== undefined && definitions[0] !== undefined) term = definitions[0]
			else if (examples !== undefined && examples[0] !== undefined) term = examples[0]
			else term = null
			let item_pages = pages(action.index)
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
				item_page: item_pages.page,
				item_page_prev_index: item_pages.prev_index,
				item_page_next_index: item_pages.next_index,
				query: action.query
			}
		case REQUEST_SETS:
			return {
				...state,
				// searching: true
			}
		case RECEIVE_SETS_SUCCESS:
			let set_pages = pages(action.index)
			return {
				...state,
				searching: false,
				searchFlag: false,
				noResults: action.sets.length === 0,
				sets: action.sets,
				set_page: set_pages.page,
				set_page_prev_index: set_pages.prev_index,
				set_page_next_index: set_pages.next_index,
				query: action.query
			}
		case REQUEST_USERS:
			return {
				...state,
				// searching: true
			}
		case RECEIVE_USERS_SUCCESS:
			let user_pages = pages(action.index)
			return {
				...state,
				searching: false,
				searchFlag: false,
				noResults: action.users !== undefined ? action.users.length === 0 : true,
				users: action.users,
				user_page: user_pages.page,
				user_page_prev_index: user_pages.prev_index,
				user_page_next_index: user_pages.next_index,
				query: action.query
			}
		case CLEAR_PAGES:
			return {
				...state,
				item_page: 0,
				item_page_prev_index: 0,
				item_page_next_index: 0,
				set_page: 0,
				set_page_prev_index: 0,
				set_page_next_index: 0,
				user_page: 0,
				user_page_prev_index: 0,
				user_page_next_index: 0
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












