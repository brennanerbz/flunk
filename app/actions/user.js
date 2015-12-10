import axios from 'axios';
import request from 'superagent';
import moment from 'moment';
import keyMirror from 'key-mirror';

const server = require('./api'),
	  api_url = server.api_url;


function checkCookies() {
	if(document.cookie.length > 0) {
		let user = {}
		const cookies = document.cookie.split(";")
		user['id'] = Number(cookies[0].substr(6))
		user['token'] = cookies[1].substr(7)
		return user;
	}
}

function getToken(email, password, id) {
	request
	.get(`${api_url}/token`)
	.auth(email, password)
	.end((err, res) => {
		if(res.ok) {
			document.cookie = '__fid' + '=' + id + ";" 
			document.cookie = "__ftkn" + "=" + res.body.token + ";"
		}
	})
}

export const REQUEST_USER = 'REQUEST_USER'
export const RECEIVE_USER_SUCCESS = 'RECEIVE_USER_SUCCESS'
export const RECEIVE_USER_FAILURE = 'RECEIVE_USER_FAILURE'
export function fetchUser(pushState, route) {
	return (dispatch, getState) => {
		dispatch({type: REQUEST_USER})
		let user = checkCookies()
		if(user == undefined) {
			if(route == '/') {
				pushState(null, '/landing')
			}
			dispatch({type: RECEIVE_USER_FAILURE})
			return false;
		}
		axios.get(`${api_url}/users/${user.id}`)
		.then(res => { 
			user = {}
			user = Object.assign({...res.data})
			delete user['password']
			dispatch({type: RECEIVE_USER_SUCCESS, user}) 
			return true
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
				new_user = {}
				new_user = Object.assign({...res.body}, {password: null})
				dispatch({type: CREATE_USER_SUCCESS, new_user})
				getToken(user_info.email, user_info.password, new_user.id)
			} else {
				dispatch({
					type: CREATE_USER_FAILURE,
					error: Error(err)
				})
			}
		})
	}
}




