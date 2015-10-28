import axios from 'axios';
import moment from 'moment';
import keyMirror from 'key-mirror';

const api_url = 'http://127.0.0.1:5000/webapi/v2.0';

// Concurrent call that will call each method and return the whole/entire state desired

export const RECEIVE_SETVIEW_SUCCESS = 'REQUEST_SETVIEW_SUCCESS';
export function fetchSetView(user_id, set_id) {
	return async(dispatch) => {
		axios.all([fetchSet(set_id), fetchContent(set_id), fetchAssignment(user_id, set_id)])
		.then(axios.spread((set, items, assignment) => {
			console.log("Axios.all:" + set, items, assignment)
			dispatch({type: RECEIVE_SETVIEW_SUCCESS, set, items, assignment})
		}))
	}
}


// Call /sets/:id route with the params id passed in from React. Will be a function to run concurrently. This will return a set object, and from this set object, we will be able to  fill store. 

export const REQUEST_SET
 = 'REQUEST_SET';
export const RECEIVE_SET_SUCCESS = 'RECEIVE_SET_SUCCESS';
export const RECEIVE_SET_FAILURE = 'RECEIVE_SET_FAILURE';

function requestSet() {
	return {
		type: REQUEST_SET
	}
}

/*
@params set_id
*/

export function fetchSet(set_id) {
	return async(dispatch, getState) => {
		dispatch(requestSet())
		try {
			let set = await axios.get(`${api_url}/sets/${set_id}`)
			console.log("Fetch Set:" + set)
			dispatch({
				type: RECEIVE_SET_SUCCESS,
				set
			})
		}
		catch(err) {
			dispatch({
				type: RECEIVE_SET_FAILURE,
				error: Error(err)
			})
		}
	}
}

// Call the /sets/:id/contents route with params id. This will be a function to run concurrently with request set, and request assignment. 
// Once the request for contents has been successful, .then fill the store with the content.

export const REQUEST_CONTENT = 'REQUEST_CONTENT';
export const RECEIVE_CONTENT_SUCCESS = 'RECEIVE_CONTENT_SUCCESS';
export const RECEIVE_CONTENT_FAILURE = 'RECEIVE_CONTENT_FAILURE';
export const RECEIVE_ITEMS_SUCCESS = 'RECEIVE_ITEMS_SUCCESS';
export const RECEIVE_ITEMS_FAILURE = 'RECEIVE_ITEMS_FAILURE';

function requestContent() {
	return {
		type: REQUEST_CONTENT
	}
}

/*
@params set_id
*/
export function fetchContent(set_id) {
	return async(dispatch, getState) => {
		try {
			let content_list = await axios.get(`${api_url}/sets/${set_id}`)
			.then((res) => {
				dispatch({ type: RECEIVE_CONTENT_SUCCESS, content})
				let data = res.data;
				let ids = data.map(item => item.id)
				console.log("Ids:" + ids)				
				let item_list = ids.forEach(id => {
					dispatch(fetchItem(id))
				})
				console.log("Fetch Content:" + item_list)
				dispatch({type: RECEIVE_ITEMS_SUCCESS, item_list })
			}).catch((err) => {
				dispatch({type: RECEIVE_ITEMS_FAILURE})
			})			
		} catch(err) {
			dispatch({
				type: RECEIVE_CONTENT_FAILURE,
				error: Error(err)
			})
		}
	}
}


//  Transform the request for content with .map, so for each content object, we call /items/:itemid. On the successful response of each of those, send a receive_item dispatch to store, which will append the incoming object to the items array. 
export const REQUEST_ITEM = 'REQUEST_ITEM';
export const RECEIVE_ITEM_SUCCESS = 'RECEIVE_ITEM_SUCCESS';
export const RECEIVE_ITEM_FAILURE = 'RECEIVE_ITEM_FAILURE';

function requestItem() {
	return {
		type: REQUEST_ITEM
	}
}

/*
@params item_id
*/
export function fetchItem(item_id) {
	return async(dispatch, getState) => {
		try {
			let item = await axios.get(`${api_url}/items/${item_id}`)
			dispatch({ type: RECEIVE_ITEM_SUCCESS, item })
			return item;
		} catch(err) {
			dispatch({
				type: RECEIVE_ITEM_FAILURE,
				error: Error(err)
			})
		}
	}
}


// Again, concurrently, call the /assignments/user_id={val}&set_id={val}. Check to see if there is a response, and if there is any assignment, dispatch the corresponding object to the store. This will help fill in any progress, stats, and user_only settings. If there is no assignment, dispatch the viewing user has not studied, so we can make sure to create a new assignment upon learning. 
export const REQUEST_ASSIGNMENT = 'REQUEST_ASSIGNMENT';
export const RECEIVE_ASSIGNMENT_SUCCESS = 'RECEIVE_ASSIGNMENT_SUCCESS';
export const RECEIVE_ASSIGNMENT_FAILURE = 'RECEIVE_ASSIGNMENT_FAILURE';
export const HAS_NOT_STUDIED = 'HAS_NOT_STUDIED';

function requestAssignment() {
	return {
		type: REQUEST_ASSIGNMENT
	}
}

/*
@params user_id, set_id
*/
export function fetchAssignment(user_id, set_id) {
	return async(dispatch, getState) => {
		try {
			await axios.get(`${api_url}/assignments?user_id=${user_id}&set_id=${set_id}`)
			.then((res) => {
				let assignment = res.data;
				console.log("Fetch assignment:" + assignment)
				if(assignment !== (null || undefined)) {
					dispatch({type: RECEIVE_ASSIGNMENT_SUCCESS, assignment})
					return;
				} else {
					dispatch({type: HAS_NOT_STUDIED})
				}			 
			})
		} catch(err) {
			dispatch({
				type: RECEIVE_ASSIGNMENT_FAILURE,
				error: Error(err)
			})
		}
	}
}


// Call a PUT to the  /assignments/user_id={val}&set_id={val} route with most likely settings changes. Also, TODO: make sure to use a PUT to assignment in learn mode for position. 
export const UPDATE_ASSIGNMENT_SUCCESS = 'UPDATE_ASSIGNMENT_SUCCESS';
export const UPDATE_ASSIGNMENT_FAILURE = 'UPDATE_ASSIGNMENT_FAILURE';

/*
@params user_id, set_id
*/
export function updateAssignent(user_id, set_id) {
	return async(dispatch, getState) => {
		try {
			await axios.put(`${api_url}/assignments?user_id=${user_id}&set_id=${set_id}`).then((res) => {
				let new_assignment = res.data;
				console.log("Update assignment:" + new_assignment)
				dispatch({type: UPDATE_ASSIGNMENT_SUCCESS, new_assignment })
			})
		} catch(err) {
			dispatch({
				type: UPDATE_ASSIGNMENT_FAILURE,
				error: Error(err)
			})
		}
	}
}


// Clear the set state upon leaving the view. 
export const CLEAR_SET = 'CLEAR_SET';

export function clearSet() {
	return {
		type: CLEAR_SET
	}
}
