import {
  FETCH_COMMENTS_SUCCESS,
  FETCH_COMMENTS_FAILURE,

  FETCH_COMMENT_SUCCESS,
  FETCH_COMMENT_FAILURE,

} from '../constants/actions';

import axios from 'axios';
const baseUrl = 'http://jsonplaceholder.typicode.com';

export function fetchComments() {
	return async(dispatch) => {
		try {
			const comments = (await axios.get(`${baseUrl}/comments`)).data
			dispatch({ type: FETCH_COMMENTS_SUCCESS, comments })
		} catch (error) {
			dispatch({
				type: FETCH_COMMENTS_FAILURE,
				error: Error('Cant fetch comments')
			})
		}
	}
}

export function fetchComment(id) {
	return async(dispatch) => {
		try {
			const comment = (await axios.get(`${baseUrl}/comments/${id}`)).data
			dispatch({ type: FETCH_COMMENT_SUCCESS, comment })
		} catch (error) {
			dispatch({
				type: FETCH_COMMENT_FAILURE,
				error: Error('Cant fetch comment')
			})
		}
	}
}