import axios from 'axios';
import moment from 'moment';
import keyMirror from 'key-mirror';
import request from 'superagent';

const api_url = 'http://127.0.0.1:5000/webapi/v2.0';

/* Assignments for given user */ 
export const REQUEST_ASSIGNMENTS = 'REQUEST_ASSIGNMENTS';
export const RECEIVE_ASSIGNMENTS_SUCCESS = 'RECEIVE_ASSIGNMENTS_SUCCESS';
export const RECEIVE_ASSINGMENTS_FAILURE = 'RECEIVE_ASSINGMENTS_FAILURE';

export function fetchAssignments(user_id) {
	return async(dispatch, getState) => {
		if(getState().sets.assignmentsFlag) return;
		dispatch({type: REQUEST_ASSIGNMENTS});
		try {
			let assignments;
			request
			.get(`${api_url}/users/${user_id}/assignments/`)
			.end((err, res) => { 
				assignments = res.body.assignments 
				dispatch({type: RECEIVE_ASSIGNMENTS_SUCCESS, assignments })
			})
		} catch (err) {
			dispatch({
				type: RECEIVE_ASSINGMENTS_FAILURE,
				error: Error('Can\'t fetch sets')
			})
		}
	}
}

export function pollAssignments(user_id) {
	return async(dispatch, getState) => {
		try {
			let assignments;
			request
			.get(`${api_url}/users/${user_id}/assignments/`)
			.end((err, res) => { 
				assignments = res.body.assignments 
				dispatch({type: RECEIVE_ASSIGNMENTS_SUCCESS, assignments })
			})
		} catch(err) {
			dispatch({
				type: RECEIVE_ASSINGMENTS_FAILURE,
				error: Error(err)
			})
		}
	}
}
