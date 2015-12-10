import axios from 'axios';
import request from 'superagent';
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

export const CREATE_USER = 'CREATE_USER'
export const CREATE_USER_SUCCESS = 'CREATE_USER_SUCCESS'
export const CREATE_USER_FAILURE = 'CREATE_USER_FAILURE'
export function createUser(user_info) {
	return (dispatch, getState) => {
		dispatch({type: CREATE_USER})
		let new_user;
		request
		.post(`${api_url}/users/`)
		.send(user_info)
		.end((err, res) => {
			if(res.ok) {
				localStorage.setItem('username', user_info.username)
				dispatch(getToken(user_info.username, user_info.password))
				new_user = res.body
				dispatch({type: CREATE_USER_SUCCESS, new_user})
			} else {
				dispatch({
					type: CREATE_USER_FAILURE,
					error: Error(err)
				})
			}
		})
	}
}

function getToken(username, password) {
	return(dispatch, getState) => {
		console.log(localStorage)
		// request
		// .get(`${api_url}/token`)
		// .auth(username, password)
		// .end((err, res) => {
		// 	if(res.ok) {
		// 		console.log(res.body)
		// 	}
		// })
	}
}


