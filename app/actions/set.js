import axios from 'axios';
import moment from 'moment';
import keyMirror from 'key-mirror';
import request from 'superagent';

const api_url = 'http://127.0.0.1:5000/webapi/v2.0';

/*
@params set_id 
*/
export const REQUEST_SET = 'REQUEST_SET';
export const RECEIVE_SET_SUCCESS = 'RECEIVE_SET_SUCCESS';
export const RECEIVE_SET_FAILURE = 'RECEIVE_SET_FAILURE';
export const RECEIVE_ASSIGNMENTS_SUCCESS = 'RECEIVE_ASSIGNMENTS_SUCCESS';
export function fetchSet(set_id) {
	return (dispatch, getState) => {
		if(getState().sets.isFetchingAssignments || getState().user.isFetchingUser) {
			setTimeout(() => {
				dispatch(fetchSet(set_id))
			}, 5)
			return;
		}
		dispatch({type: REQUEST_SET})
		let set,
			user = getState().user.user;
		axios.get(`${api_url}/sets/${set_id}`).then((res) => { 
			set = res.data
			dispatch({
				type: RECEIVE_SET_SUCCESS,
				set
			})
		}).catch((err) => {
			dispatch({
				type: RECEIVE_SET_FAILURE,
				error: Error(err),
				err: err
			})
		})
	}
}

/*
@params set_id
GET /sets/<id>/associations/?start=0&end=99
*/
export const REQUEST_ASSOCIATIONS = 'REQUEST_ASSOCIATIONS';
export const RECEIVE_ASSOCIATIONS_SUCCESS = 'RECEIVE_ASSOCIATIONS_SUCCESS';
export const RECEIVE_ASSOCIATIONS_FAILURE = 'RECEIVE_ASSOCIATIONS_FAILURE';
export function fetchAssociations(set_id) {
	return (dispatch, getState) => {
		dispatch({type: REQUEST_ASSOCIATIONS})
		let associations;
		axios.get('http://jsonplaceholder.typicode.com/photos').then(res => {
			console.log(res.data)
		})
		axios.get(`${api_url}/sets/${set_id}/associations/?start=${0}&end=${99}`)
		.then((res) => {
			associations = res.data.associations
			dispatch({
				type: RECEIVE_ASSOCIATIONS_SUCCESS,
				associations
			})
		}).catch(err => {
			dispatch({
				type: RECEIVE_ASSOCIATIONS_FAILURE,
				error: Error(err),
				err: err
			})
		})
	}
}


/*
@params assignment_id
*/
export const REQUEST_ASSIGNMENT = 'REQUEST_ASSIGNMENT';
export const RECEIVE_ASSIGNMENT_SUCCESS = 'RECEIVE_ASSIGNMENT_SUCCESS';
export const RECEIVE_ASSIGNMENT_FAILURE = 'RECEIVE_ASSIGNMENT_FAILURE';
export const HAS_NOT_STUDIED = 'HAS_NOT_STUDIED';
export function fetchAssignment(id) {
	return async(dispatch, getState) => {
		dispatch({type: REQUEST_ASSIGNMENT})
		try {
			let assignment;
			await axios.get(`${api_url}/assignments/${id}`).then((res) => assignment = res.data)
			console.log(assignment)
			dispatch({type: RECEIVE_ASSIGNMENT_SUCCESS, assignment})
		} catch(err) {
			dispatch({
				type: RECEIVE_ASSIGNMENT_FAILURE,
				error: Error(err)
			})
		}
	}
}


/*
@params user_id, set_id
*/
export const UPDATE_ASSIGNMENT_SUCCESS = 'UPDATE_ASSIGNMENT_SUCCESS';
export const UPDATE_ASSIGNMENT_FAILURE = 'UPDATE_ASSIGNMENT_FAILURE';
export function updateAssignent(id) {
	return async(dispatch, getState) => {
		try {
			await axios.put(`${api_url}/assignments${id}`).then((res) => {
				let new_assignment = res.data;
				console.log("new_assignment")
				console.log(new_assignment)
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


 
export const CLEAR_SETVIEW = 'CLEAR_SETVIEW';
export function clearSetView() {
	return {
		type: CLEAR_SETVIEW
	}
}
