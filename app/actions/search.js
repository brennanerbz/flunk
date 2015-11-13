import axios from 'axios';
import moment from 'moment'; 
import request from 'superagent';

let api_url = 'http://127.0.0.1:5000/webapi/v2.0';

export const SEARCH = 'SEARCH';
export function requestSearch() {
	return {
		type: SEARCH
	}
}
export const CLEAR_PAGES = 'CLEAR_PAGES';
export function clearPages() {
	return {
		type: CLEAR_PAGES
	}
}

/* ----------- Superagent pattern -----------------

request
  .post('/api/pet')
  .send({ name: 'Manny', species: 'cat' })
  .set('X-API-Key', 'foobar')
  .set('Accept', 'application/json')
  .end(function(err, res){
    // Calling the end function will send the request
  });

*/
 // /items/search/?search=knowledge&start=0&end=10

function _request(api_url, term, index) {
	var req = request.get(`${api_url}/items/search/?search=${term}&start=${index}`)
	console.log(req._callbacks = () => {})
	req.timeout(1000)
	console.log(req)
}

export const REQUEST_ITEMS = 'REQUEST_ITEMS';
export const RECEIVE_ITEMS_SUCCESS = 'RECEIVE_ITEMS_SUCCESS';
export const RECEIVE_ITEMS_FAILURE = 'RECEIVE_ITEMS_FAILURE';
export function searchItems(term, page_index) {
	return (dispatch, getState) => {
		if(getState().search.searchFlag) return;
		dispatch({ type: SEARCH })
		try {
			let items,
				query = term.toLowerCase().trim(),
				index;
			if(page_index !== undefined) {
				index = page_index
			} else {
				index = 0;
			}
			_request(api_url, term, index)
			request
			.get(`${api_url}/items/search/?search=${term}&start=${index}`)
			.end((err, res) => { 
				items = res.body.items 
				dispatch({type: RECEIVE_ITEMS_SUCCESS, items, query, index})
			})
			// await axios.get(`${api_url}/items/search/?search=${term}&start=${index}`).then(res => items = res.data.items)
			
		} catch(err) {
			dispatch({
				type: RECEIVE_ITEMS_FAILURE,
				error: Error(err)
			})
		}
	}
}

 // /sets/search/?search=knowledge&start=0&end=10
export const REQUEST_SETS = 'REQUEST_SETS';
export const RECEIVE_SETS_SUCCESS = 'RECEIVE_SETS_SUCCESS';
export const RECEIVE_SETS_FAILURE = 'RECEIVE_SETS_FAILURE';
export function searchSets(set_title, page_index) {
	return (dispatch, getState) => {
		if(getState().search.searchFlag) return;
		dispatch({ type: SEARCH })
		try {
			let sets,
				query = set_title.toLowerCase().trim(),
				index;
			if(page_index !== undefined) {
				index = page_index
			} else {
				index = 0;
			}
			request
			.get(`${api_url}/sets/search/?search=${set_title}&start=${index}`)
			.end((err, res) => { 
				sets = res.body.sets 
				dispatch({type: RECEIVE_SETS_SUCCESS, sets, query, index})
			})
			// axios.get(`${api_url}/sets/search/?search=${set_title}&start=${index}`).then(res => sets = res.data.sets)
			// dispatch({type: RECEIVE_SETS_SUCCESS, sets, query, index})
		} catch(err) {
			dispatch({
				type: RECEIVE_SETS_FAILURE,
				error: Error(err)
			})
		}
	}
}


 // /users/search/?search=knowledge&start=0&end=10
export const REQUEST_USERS = 'REQUEST_USERS';
export const RECEIVE_USERS_SUCCESS = 'RECEIVE_USERS_SUCCESS';
export const RECEIVE_USERS_FAILURE = 'RECEIVE_USERS_FAILURE';
export function searchUsers(user, page_index) {
	return async(dispatch, getState) => {
		if(getState().search.searchFlag) return;
		dispatch({ type: SEARCH })
		try {
			let users,
				query = user.toLowerCase().trim(),
				index;
			if(page_index !== undefined) {
				index = page_index
			} else {
				index = 0;
			}
			await axios.get(`${api_url}/users/search/?search=${user}&start=${index}`).then(res => users = res.data.users)
			dispatch({type: RECEIVE_USERS_SUCCESS, users, query, index})
		} catch(err) {
			dispatch({
				type: RECEIVE_USERS_FAILURE,
				error: Error(err)
			})
		}
	}
}


export const CLEAR = 'CLEAR';
export function clearSearch() {
	return {
		type: CLEAR
	}
}