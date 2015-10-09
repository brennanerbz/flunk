import axios from 'axios';
import moment from 'moment';
import keyMirror from 'key-mirror';

const api_url = 'http://127.0.0.1:5000/webapi/v1.0';

export function loadLearnMode(set) {
	return (dispatch, getState) => {
		const seqs = new Promise ((resolve, reject) => {
			dispatch(fetchSeqs(set['creator_id'], set['id'], 'learn', 'mc'))
		})
	}	
}

// * Learn Mod: Sequences * //
export const REQUEST_SEQS = 'REQUEST_SEQS';
export const RECEIVE_SEQS_SUCCESS = 'RECEIVE_SEQS_SUCCESS';
export const RECEIVE_SEQS_FAILURE = 'RECEIVE_SEQS_FAILURE';
export const CLEAR_SEQ = 'CLEAR_SEQ';

function requestSeqs() {
	return {
		type: REQUEST_SEQS
	}
}
export function fetchSeqs(user_id, set_id, mode, diff) {
	return async(dispatch) => {
		dispatch(requestSeqs())
		try {
			let seqs = ( await axios.get(`${api_url}/sequences?user_id=${user_id}&set_id=${set_id}`)).data
			let undone_seqs = seqs['sequences'].filter(seq => seq.completion == 'None')
			if (undone_seqs.length === 0) {
				await axios.post(`${api_url}/sequences/`, {
					user_id: user_id,
					set_id: set_id,
					mode: mode,
					difficulty: diff
				}).then(res => undone_seqs = res).catch(res => console.log(res))
			}
			dispatch(receiveSeqs(undone_seqs)(dispatch))			
		} catch (err) {
			dispatch({
				type: RECEIVE_SEQS_FAILURE,
				error: Error('Can\'t fetch seqs...')
			})
		}
	}
}
function receiveSeqs(data) {
	return (dispatch) => {
		let sorted_seqs = data.sort((seq1, seq2) => {
			return moment((seq1.creation).isBefore(seq2.creation)) ? 1 : -1
		})
		let curr_seq = sorted_seqs[0];	
		const success = new Promise((res, rej) => {
			dispatch({
				type: RECEIVE_SEQS_SUCCESS,
				curr_seq: curr_seq
			})
		}).then(
			dispatch(fetchQs())
		)
	}
}

export function clearSeq() {
	return {
		type: CLEAR_SEQ
	}
}

// * Learn Mod: Queues * //
export const REQUEST_QS = 'REQUEST_QS';
export const RECEIVE_QS_SUCCESS = 'RECEIVE_QS_SUCCESS';
export const RECEIVE_QS_FAILURE = 'RECEIVE_QS_FAILURE';
export const SET_CURR_Q = 'SET_CURR_Q';
export const CLEAR_Q = 'CLEAR_Q';

function requestQs() {
	return {
		type: REQUEST_QS
	}
}

export function fetchQs() {
	return async(dispatch, getState) => {
		const curr = getState().learn.seqs.curr_seq
		dispatch(requestQs())
		if (typeof curr !== 'undefined') {			
			try {
				let qs = ( await axios.get(`${api_url}/sequences/${curr['id']}/queues`)).data		
				dispatch(receiveQs(qs)(dispatch, getState))
			} catch(err) {
				dispatch({
					type: RECEIVE_QS_FAILURE,
					error: Error('Check the \'fetchQs\' method Unknown error.')
				})
			}
		} else {
			setTimeout(() => {
				dispatch(fetchQs())
			}, 50)
		}
	}
}
function receiveQs(data) {
	return (dispatch, getState) => {
		const curr_seq = getState().learn.seqs.curr_seq
		const success = new Promise((res, rej) => {
			dispatch({
				type: RECEIVE_QS_SUCCESS,
				qs: data['queues'],
				curr_seq: curr_seq
			})
		}).then(
			dispatch(setCurrQ())
		).then(
			dispatch(fetchTrials())
		)
	}
}

function setCurrQ() {
	return {
		type: SET_CURR_Q
	}
}
export function clearQ() {
	return {
		type: CLEAR_Q
	}
}


// * Learn Mod: Queues * //
export const REQUEST_TRIALS = 'REQUEST_TRIALS';
export const RECEIVE_TRIALS_SUCCESS = 'RECEIVE_TRIALS_SUCCESS';
export const RECEIVE_TRIALS_FAILURE = 'RECEIVE_TRIALS_FAILURE';
export const CLEAR_TRIAL = 'CLEAR_TRIALS';

function requestTrials() {
	return {
		type: REQUEST_TRIALS
	}
} 
export function fetchTrials() {
	return async(dispatch, getState) => {
		const curr_q = getState().learn.qs.curr_q;
		const curr_seq = getState().learn.seqs.curr_seq;
		dispatch(requestTrials())
		if (typeof curr_q !== 'undefined' || typeof curr_seq !== 'undefined') {
			try {				
				let trials = ( await axios.get(`${api_url}/queues/${curr_q.id}/trials`) ).data
				let raw_trials = trials['trials'];
				if (raw_trials.length === 0) {
					console.log('%czero, color:green')
					await axios.post(`${api_url}/trials/`, {
					 	user_id: curr_seq['user_id'],
					 	set_id: curr_seq['set_id'],
					 	item_id: curr_q['item_id'],
					 	queue_id: curr_q['id'],
					 	difficulty: 'recall'
					}).then(res => raw_trials = res).catch(res => console.log(res))
				}
				dispatch(receiveTrials(raw_trials))			
			} catch(err) {
				dispatch({
					type: RECEIVE_TRIALS_FAILURE,
					error: Error('See fetchTrials')
				})
			}
		} else {
			dispatch(fetchTrials())
		}
	}
}

function receiveTrials(data) {
	return {
		type: RECEIVE_TRIALS_SUCCESS,
		trials: data,
		latest_trial: data.slice(-1)[0]
	}
}
export function clearTrial() {
	return {
		type: CLEAR_TRIAL
	}
}

// * Time to get busy with some intelligence! * // 












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