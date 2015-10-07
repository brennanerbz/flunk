import {
	LOAD_SETS,
	FETCH_SET,

	GET_SEQUENCES_SUCCESS,
	GET_QUEUE_SUCCESS,
	GET_TRIAL_SUCCESS,

	GET_SEQUENCES_FAILURE,
	GET_QUEUE_FAILURE,
	GET_TRIAL_FAILURE
} from '../constants/learnset';

import axios from 'axios';
const flunk_api_url = 'http://127.0.0.1:5000/webapi/v1.0';

export function loadSets() {
	return {
		type: LOAD_SETS
	}
}

export function fetchSet(id) {
	return {
		type: FETCH_SET,
		id
	}
}

export function getSequences(set_id) {
	return async(dispatch) => {
		try {
			let sequences = (await axios.get(`${flunk_api_url}/sequences?user_id=1&set_id=${set_id}`)).data
			sequences['sequences'].forEach(sequence => {
				console.log(sequence['completion'])
			})
			if (sequences['sequences'].length === 0) { 
				await axios.post(`${flunk_api_url}/sequences/`, {
					user_id: Number(1),
					set_id: Number(set_id),
					mode: 'learn',
					difficulty: 'mc'
				}).then(response => { console.log(response)}).catch(response => console.log(response))
			}
			dispatch({ type: GET_SEQUENCES_SUCCESS, sequences })
		} catch (err) {
			dispatch({
				type: GET_SEQUENCES_FAILURE,
				error: Error('Can\t seem to find the desired sequence')
			})
		}
	}
}




///---------


// import axios from 'axios';
// const baseUrl = 'http://jsonplaceholder.typicode.com';

// export function fetchComments() {
// 	return async(dispatch) => {
// 		try {
// 			const comments = (await axios.get(`${baseUrl}/comments`)).data
// 			dispatch({ type: FETCH_COMMENTS_SUCCESS, comments })
// 		} catch (error) {
// 			dispatch({
// 				type: FETCH_COMMENTS_FAILURE,
// 				error: Error('Cant fetch comments')
// 			})
// 		}
// 	}
// }

// export function fetchComment(id) {
// 	return async(dispatch) => {
// 		try {
// 			const comment = (await axios.get(`${baseUrl}/comments/${id}`)).data
// 			dispatch({ type: FETCH_COMMENT_SUCCESS, comment })
// 		} catch (error) {
// 			dispatch({
// 				type: FETCH_COMMENT_FAILURE,
// 				error: Error('Cant fetch comment')
// 			})
// 		}
// 	}
// }