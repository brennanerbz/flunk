import axios from 'axios';
import moment from 'moment';
import keyMirror from 'key-mirror';

const flunk_api_url = 'http://127.0.0.1:5000/webapi/v1.0';

// * Sets * // 
var setactions = keyMirror({
	REQUEST_SETS: null,
	RECEIVE_SETS_SUCCESS: null,
	RECEIVE_SETS_FAILURE: null
});
export default setactions;

function requestSets() {
	return {
		type: setactions.REQUEST_SETS
	}
}

export function fetchSets() {
	return async(dispatch) => {
		dispatch(requestSets());
		try {
			let data = ( await axios.get(`${flunk_api_url}/sets`) ).data
			dispatch(receiveSets(data['sets']))
		} catch (err) {
			dispatch({
				type: setactions.RECEIVE_SETS_FAILURE,
				error: Error('Can\'t fetch sets')
			})
		}
	}
}

function receiveSets(data) {
	console.log(data)
	return {
		type: setactions.RECEIVE_SETS_SUCCESS,
		sets: data
	}
}


 
// export function loadSets() {
// 	return {
// 		type: LOAD_SETS
// 	}
// }

// export function fetchSet(id) {
// 	return {
// 		type: FETCH_SET,
// 		id
// 	}
// }

// // Need to get the sequences for a given user/set
// // Need to get the queues associated with that sequence
// // Need to get the trials for each queue

// export function getSequence(user_id, set_id, mode, diff) {
// 	return async(dispatch) => {
// 		try {
// 			let seqs = (await axios.get(`${flunk_api_url}/sequences?user_id=1&set_id=${set_id}`)).data
// 			let raw_seqs = seqs['sequences'].filter(seq => seq.completion == 'None')
// 			if (raw_seqs.length === 0) {
// 				await axios.post(`${flunk_api_url}/sequences/`, {
// 					user_id: user_id,
// 					set_id: set_id,
// 					mode: mode,
// 					difficulty: diff
// 				}).then(res => { raw_seqs = res }).catch(res => console.log(res))
// 			}

// 			raw_seqs.sort((seq1, seq2) => {
// 				return (moment(seq1.creation).isBefore(seq2.creation)) ? 1 : -1
// 			})
// 			let curr_seq = raw_seqs[0]
// 			dispatch({ type: GET_SEQUENCES_SUCCESS, curr_seq})			
// 		} catch (err) {
// 			dispatch({
// 				type: GET_SEQUENCES_FAILURE,
// 				error: Error('Can\'t seem to find the desired sequence')
// 			})
// 		}
// 	}
// }

// export function getQueues(id) {
// 	return async(dispatch) => {
// 		try {
// 			let queues = (await axios.get(`${flunk_api_url}/sequences/${id}/queues`)).data
// 			let raw_qs = queues['queues'].filter(q => q.completion == 'None')
// 			dispatch({ type: GET_QUEUES_SUCCESS, raw_qs })
// 		} catch (err) {
// 			dispatch({
// 				type: GET_QUEUES_FAILURE,
// 				error: Error('Can\'t get the desired queues')
// 			})
// 		}
// 	}
// }



// function getQueues(id) {
// 	let queues = (await axios.get(`${flunk_api_url}/sequences/${id}/queues`))
// 	console.log("Queues" + " " + queues)
// }


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