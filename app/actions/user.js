import axios from 'axios';
import moment from 'moment';
import keyMirror from 'key-mirror';

const server = require('./api'),
	  api_url = server.api_url;

// TODO: add cookie support
export const REQUEST_USER = 'REQUEST_USER'
export const RECEIVE_USER_SUCCESS = 'RECEIVE_USER_SUCCESS'
export const RECEIVE_USER_FAILURE = 'RECEIVE_USER_FAILURE'
export function fetchUser(user_id, username) {
	return (dispatch, getState) => {
		dispatch({type: REQUEST_USER})
		let user;
		axios.get(`${api_url}/users/${user_id}`)
		.then(res => { 
			user = res.data
			dispatch({type: RECEIVE_USER_SUCCESS, user}) 
		})
		.catch(() => {
			dispatch({
				type: RECEIVE_USER_FAILURE,
				error: Error(err)
			})
		})
	}
}