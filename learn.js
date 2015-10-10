import axios from 'axios';
import moment from 'moment';
import keyMirror from 'key-mirror';

const api_url = 'http://127.0.0.1:5000/webapi/v1.0';

/*
-------------- Load the learn mode by fetching the current sequence for given user, and given set at given diff----------------
@params set_id
@params diff (not required)
*/
export const REQUEST_LEARN = 'REQUEST_LEARN';
export const RECEIVE_SEQ_SUCCESS = 'RECEIVE_SEQ_SUCCESS';
export const RECEIVE_SEQ_FAILURE = 'RECEIVE_SEQ_FAILURE';
export function loadSeq(set_id, diff) {
	return async(dispatch, getState) => {
		dispatch({ type: REQUEST_LEARN })
		const user = getState().user.user
		try {
			let seqs = ( await axios.get(`${api_url}/sequences?user_id=${user.id}&set_id=${set_id}`) ).data
			seqs = seqs['sequences']
			let filtered_seqs = seqs.filter(seq => seq.completion == 'None')	
			if (filtered_seqs.length > 0) {
				let curr_seq = filtered_seqs.sort((s1, s2) => {
					return moment((s1.creation).isBefore(s2.creation) ? 1 : -1)
				})
				curr_seq = curr_seq[0]
				dispatch({ type: RECEIVE_SEQ_SUCCESS, curr_seq})
				dispatch(fetchQs())
			}
			else {
				dispatch(newSeq(user, set_id))
			}				
		} catch (err) {
			dispatch({
				type: RECEIVE_SEQ_FAILURE,
				error: Error(err)
			})
		}
	}
}
export function newSeq(user, set_id, diff) {
	return async(dispatch, getState) => {
		try {
			if (diff !== undefined) {
				await axios.post(`${api_url}/sequences`, {
					user_id: user.id,
					set_id: set_id,
					mode: 'learn', // hardcoded for now
					difficulty: diff
				}).then(curr_seq => {
					let q_list = curr_seq['queue_list']
					dispatch({type: RECEIVE_SEQ, curr_seq})
					dispatch({type: RECEIVE_QS, q_list})
				})
			} else {
				await axios.post(`${api_url}/sequences`, {
					user_id: user.id,
					set_id: set_id,
					mode: 'learn', // hardcoded for now
					difficulty: 'mc' // hardcoded at multiple choice for default
				}).then(curr_seq => {
					let q_list = curr_seq['queue_list']
					dispatch({type: RECEIVE_SEQ, curr_seq})
					dispatch({type: RECEIVE_QS, q_list})
				})
			}
		} catch(err) {
			dispatch({
				type: FAIL_SEQ,
				error: Error(err)
			})
		}
	}
}

/*
------- Fetch the list of queue object by retreiving the current sequence from state. Fill the Redux store. ---------
@params 
*/
export const RECEIVE_QS_SUCCESS = 'RECEIVE_QS_SUCCESS';
export const RECEIVE_QS_FAILURE = 'RECEIVE_QS_FAILURE';
export function loadQs() {
	return async(dispatch, getState) => {
		let cs = getState().learn.curr_seq
		try {
			let qs = ( await axios.get(`${api_url}/sequences/${cs['id']}/queues`) ).data
			dispatch({ type: RECEIVE_QS_SUCCESS, qs})
			dispatch(loadTrials())
		} catch(err) {
			dispatch({
				type: RECEIVE_QS_FAILURE,
				error: Error(err)
			})
		}
	}
}

/*
--------- Given current queue and sequence, fetch the list of trials. Filter and sort by recency and accuracy -----------
@params 0
*/
export const RECEIVE_TRIALS_SUCCESS = 'RECEIVE_TRIALS_SUCCESS';
export const RECEIVE_TRIALS_FAILURE = 'RECEIVE_TRIALS_FAILURE';
export function loadTrials() {
	return async(dispatch, getState) => {
		let cs = getState().learn.curr_seq;
		let cq = getState().learn.curr_q;
		try {
			let trials = ( await axios.get(`${api_url}/queues/${cq['id']}/trials`) ).data
			trials = trials['trials']
			if (trials.length === 0) { dispatch( newTrial() ) }
			else {
				dispatch({type: RECEIVE_TRIALS_SUCCESS, trials})
				dispatch(newTrial(cs, cq))
			}
		} catch(err) {
			dispatch({
				type: RECEIVE_TRIALS_FAILURE,
				error: Error(err)
			})
		}
	}
}

/*
--------- If the last trial in state.learn had accuracy of 1, dispatch completed trial. If not, create a new trial.  -----------
@params 0
*/
export const RECEIVE_TRIAL = 'RECEIVE_TRIAL';
export const RECEIVE_TRIAL_FAILURE = 'RECEIVE_TRIAL_FAILURE';
export const RECEIVE_LEARN = 'RECEIVE_LEARN';
export function newTrial(curr_seq, curr_q) {
	return async(dispatch, getState) => {
		try {
			let trials = getState().learn.trials
			let last_trial = trials.slice(-1)[0]
			if (last_trial['accuracy'] === 1) { 
				dispatch({ type: RECEIVE_TRIAL, last_trial })
				return;  
			}
			axios.post(`${api_url}/trials`, {
				user_id: curr_seq['user_id'],
				set_id: curr_seq['set_id'],
				item_id: curr_q['item_id'],
				queue_id: curr_q['id']
			}).then(trial => {
				dispatch({type: RECEIVE_TRIAL, trial})
				dispatch({type: RECEIVE_LEARN})
			})
		} catch(err) {
			dispatch({
				type: RECEIVE_TRIAL_FAILURE,
				error: Error(err)
			})
		}
	}
}


/* 
@params
adapt()
*/

/*
@params
move()
*/





















