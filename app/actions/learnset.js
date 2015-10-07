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
import moment from 'moment';
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

// Need to get the sequences for a given user/set
// Need to get the queues associated with that sequence
// Need to get the trials for each queue

export function getSequences(user_id, set_id, mode, diff) {
	return async(dispatch) => {
		try {
			let seqs = (await axios.get(`${flunk_api_url}/sequences?user_id=1&set_id=${set_id}`)).data
			let raw_seqs = seqs['sequences'].filter(seq => seq.completion == 'None')
			if (raw_seqs.length === 0) {
				await axios.post(`${flunk_api_url}/sequences/`, {
					user_id: user_id,
					set_id: set_id,
					mode: mode,
					difficulty: diff
				}).then(res => { raw_seqs = res }).catch(res => console.log(res))
			}

			raw_seqs.sort((seq1, seq2) => {
				return (moment(seq1.creation).isBefore(seq2.creation)) ? 1 : -1
			})
			let curr_seq = raw_seqs[0]
			dispatch({ type: GET_SEQUENCES_SUCCESS, curr_seq})

		} catch (err) {
			dispatch({
				type: GET_SEQUENCES_FAILURE,
				error: Error('Can\t seem to find the desired sequence')
			})
		}
	}
}


// function getUserAccount() {
//   return axios.get('/user/12345');
// }

// function getUserPermissions() {
//   return axios.get('/user/12345/permissions');
// }

// axios.all([getUserAccount(), getUserPermissions()])
//   .then(axios.spread(function (acct, perms) {
//     // Both requests are now complete
//   }));



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