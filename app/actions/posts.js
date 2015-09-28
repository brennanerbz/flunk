import {
  FETCH_POSTS_SUCCESS,
  FETCH_POSTS_FAILURE,

  FETCH_POST_SUCCESS,
  FETCH_POST_FAILURE,

  SAVE_POST_SUCCESS,
  SAVE_POST_FAILURE
} from '../constants/actions';

import axios from 'axios';
import getHeaders from '../utils/getHeaders';

const baseUrl = 'http://jsonplaceholder.typicode.com';

export function fetchPosts() {
	return async(dispatch) => {
		try {
			const posts = (await axios.get(`${baseUrl}/posts`)).data
			dispatch({ type: FETCH_POSTS_SUCCESS, posts });
		} catch (error) {
			dispatch({
				type: FETCH_POSTS_FAILURE,
				error: Error('Unknown error. See Brennan')
			})			
		}
	}
}

export function fetchPost(id) {
	return async(dispatch) => {
		try {	
			const post = (await axios.get(`${baseUrl}/posts/${id}`)).data
			dispatch({ type: FETCH_POST_SUCCESS, post})
		} catch (error) {
			dispatch({
				type: FETCH_POST_FAILURE,
				error: Error('Cant fetch post')
			})
		}
	}
}
