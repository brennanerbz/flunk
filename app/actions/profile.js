import axios from 'axios';
import moment from 'moment';
import keyMirror from 'key-mirror';

const api_url = 'http://127.0.0.1:5000/webapi/v1.0';


export const REQUEST_PROFILE = 'REQUEST_PROFILE';
export const RECEIVE_PROFILE_SUCCESS = 'RECEIVE_PROFILE_SUCCESS';
export const RECEIVE_PROFILE_FAILURE = 'RECEIVE_PROFILE_FAILURE';

function requestProfile() {
	return {
		type: REQUEST_PROFILE
	}
}
/* 
@params user_id
*/
export function fetchProfile(user_id) {
	return async(dispatch, getState) => {
		dispatch(requestProfile())
		try {
			await axios.get(`${api_url}/users/${user_id}`)
			.then((res) => {
				let profile = res.data;
				dispatch({type: RECEIVE_PROFILE_SUCCESS, profile})
			})
		} catch(err) {
			dispatch({
				type: RECEIVE_PROFILE_FAILURE,
				error: Error(err)
			})
		}
	}
}

export const REQUEST_USERCREATED_SETS = 'REQUEST_USERCREATED_SETS';
export const RECEIVE_USERCREATED_SETS_SUCCESS = 'RECEIVE_USERCREATED_SETS_SUCCESS';
export const RECEIVE_USERCREATED_SETS_FAILURE = 'RECEIVE_USERCREATED_SETS_FAILURE';

function requestUserCreatedSets() {
	return {
		type: REQUEST_USERCREATED_SETS
	}
}
/*
@params
*/
export function fetchUserCreatedSets() {
	return async(dispatch, getState) => {
		dispatch(requestUserCreatedSets())
		try {
			await axios.get(`${api_url}/users/${user_id}/created`)
			.then((res) => {
				let created_sets = res.data;
				dispatch({type: RECEIVE_USERCREATED_SETS_SUCCESS, created_sets})
			})
		} catch(err) {
			dispatch({
				type: RECEIVE_USERCREATED_SETS_FAILURE,
				error: Error(err)
			})
		}
	}
}

export const REQUEST_USERSTUDIED_SETS = 'REQUEST_USERSTUDIED_SETS';
export const RECEIVE_USERSTUDIED_SETS_SUCCESS = 'RECEIVE_USERSTUDIED_SETS_SUCCESS';
export const RECEIVE_USERSTUDIED_SETS_FAILURE = 'RECEIVE_USERSTUDIED_SETS_FAILURE';
function requestUserStudiedSets() {
	return {
		type: REQUEST_USERSTUDIED_SETS
	}
}
export function fetchUserStudiedSets() {
	return async(dispatch, getState) => {
		dispatch(requestUserStudiedSets())
		try {
			await axios.get(`${api_url}/users/${user_id}/studied`)
			.then((res) => {
				let studied_sets = res.data;
				dispatch({type: RECEIVE_USERSTUDIED_SETS_SUCCESS, studied_sets})
			})
		} catch(err) {
			dispatch({
				type: RECEIVE_USERSTUDIED_SETS_FAILURE,
				error: Error(err)
			})
		}
	}
}


export const CLEAR_PROFILE = 'CLEAR_PROFILE';
export function clearProfile() {
	return {
		type: CLEAR_PROFILE
	}
}



