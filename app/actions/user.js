import axios from 'axios';
import request from 'superagent';
import moment from 'moment';
import keyMirror from 'key-mirror';

const server = require('./api'),
	  api_url = server.api_url;


function checkCookies() {
	let user = {}
	if(document.cookie.length > 0) {
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
			if(id !== undefined) document.cookie = '__fid' + '=' + id + ";" 
			document.cookie = "__ftkn" + "=" + res.body.token + ";"
			return res.body.token
		} else if(!res.ok) {
			if(res.status == 401) return false;
		}
	})
}

export function checkLoggedIn() {
	let user = checkCookies()
	if(user == undefined) {
		noUserFound()
		return { 
			type: 'LOGGED_IN_FAILURE',
			logged_in: false 
		};
	}
	else {
		return { 
			type: 'LOGGED_IN_SUCCESS',
			logged_in: true 
		};
	}
}

export function noUserFound() {
	return ({
		type: RECEIVE_USER_FAILURE
	})
}

export const REQUEST_USER = 'REQUEST_USER'
export const RECEIVE_USER_SUCCESS = 'RECEIVE_USER_SUCCESS'
export const RECEIVE_USER_FAILURE = 'RECEIVE_USER_FAILURE'

export const REQUEST_ASSIGNMENTS = 'REQUEST_ASSIGNMENTS';
export const RECEIVE_ASSIGNMENTS_SUCCESS = 'RECEIVE_ASSIGNMENTS_SUCCESS';

export function fetchUser() {
	return (dispatch, getState) => {
		dispatch({type: REQUEST_USER})
		let user = checkCookies()
		request
		.get(`${api_url}/users/${user.id}`)
		.end((err, res) => {
			if(res.ok) {
				user = {}
				user = Object.assign({...res.body})
				delete user['password']
				dispatch({type: RECEIVE_USER_SUCCESS, user})
				dispatch({type: REQUEST_ASSIGNMENTS })
				request
				.get(`${api_url}/users/${user.id}/assignments/`) 
				.end((err, res) => {
					if(res.ok) {
						let assignments = res.body.assignments;
						dispatch({type: RECEIVE_ASSIGNMENTS_SUCCESS, assignments })
					}
				})
				return true
			}
			else {
				dispatch({
					type: RECEIVE_USER_FAILURE,
					error: Error(err)
				})
				return false;
			}
		})
	}
}

export const LOGIN_USER = 'LOGIN_USER';
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const LOGIN_USER_FAILURE = 'LOGIN_USER_FAILURE';
export function logIn(email, password) {
	return (dispatch, getState) => {
		dispatch({type: LOGIN_USER})
		let token = getToken(email, password)
		if(token == 401 || token == undefined) return false;
		request
		.get(`${api_url}/users/login`)
		.auth(user.token)
		.end((err, res) => {
			if(res.ok) {
				user = {}
				user = Object.assign({...res.body})
				delete user['password']
				document.cookie = '__fid' + '=' + user.id + ";" 
				dispatch({type: LOGIN_USER_SUCCESS, user}) 
				return true;
			}
			else {
				dispatch({
					type: RECEIVE_USER_FAILURE,
					error: Error(err)
				})
				return false;
			}
		})
	}
}

export const CREATE_USER = 'CREATE_USER'
export const CREATE_USER_SUCCESS = 'CREATE_USER_SUCCESS'
export const CREATE_USER_FAILURE = 'CREATE_USER_FAILURE'
export function signUp(user_info, pushState) {
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
				pushState(null, '/')
			} else {
				dispatch({
					type: CREATE_USER_FAILURE,
					error: Error(err)
				})
			}
		})
	}
}




