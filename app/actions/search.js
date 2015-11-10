
import axios from 'axios';
import moment from 'moment'; 

const api_url = 'http://127.0.0.1:5000/webapi/v2.0';

export const SEARCH = 'SEARCH';

// ?target=String	&cue=String
export const REQUEST_ITEMS = 'REQUEST_ITEMS';
export const RECEIVE_ITEMS_SUCCESS = 'RECEIVE_ITEMS_SUCCESS';
export const RECEIVE_ITEMS_FAILURE = 'RECEIVE_ITEMS_FAILURE';
export function searchItems(term) {
	return async(dispatch, getState) => {
		dispatch({ type: REQUEST_ITEMS })
		try {
			let items;
			await axios.get(`${api_url}/items/?search=${term}`).then(res => items = res.data.items)
			dispatch({type: RECEIVE_ITEMS_SUCCESS, items})
		} catch(err) {
			dispatch({
				type: RECEIVE_ITEMS_FAILURE,
				error: Error(err)
			})
		}
	}
}

// ?title=String    &description=String    &has_images=Boolean    &official=Boolean    &subject=String
export const REQUEST_SETS = 'REQUEST_SETS';
export const RECEIVE_SETS_SUCCESS = 'RECEIVE_SETS_SUCCESS';
export const RECEIVE_SETS_FAILURE = 'RECEIVE_SETS_FAILURE';
export function searchSets(set_title) {
	return async(dispatch, getState) => {
		dispatch({ type: REQUEST_SETS })
		try {
			let sets;
			await axios.get(`${api_url}/sets/?search=${set_title}`).then(res => sets = res.data.sets)
			dispatch({type: RECEIVE_SETS_SUCCESS, sets})
		} catch(err) {
			dispatch({
				type: RECEIVE_SETS_FAILURE,
				error: Error(err)
			})
		}
	}
}


// ?first_name=String		&last_name=String		&username=String		&email=String
export const REQUEST_USERS = 'REQUEST_USERS';
export const RECEIVE_USERS_SUCCESS = 'RECEIVE_USERS_SUCCESS';
export const RECEIVE_USERS_FAILURE = 'RECEIVE_USERS_FAILURE';
export function searchUsers(user) {
	return async(dispatch, getState) => {
		dispatch({ type: REQUEST_USERS })
		try {
			let users;
			await axios.get(`${api_url}/users/?search=${user}`).then(res => user = res.data.user)
			dispatch({type: RECEIVE_USERS_SUCCESS, users})
		} catch(err) {
			dispatch({
				type: RECEIVE_USERS_FAILURE,
				error: Error(err)
			})
		}
	}
}
