import axios from 'axios';
import moment from 'moment';
import keyMirror from 'key-mirror';

const api_url = 'http://127.0.0.1:5000/webapi/v1.0';

/*
---------- Load the learn mode by fetching the current sequence for given user, and given set at given diff----------------
@params set_id
@params diff (not required)
*/
export const REQUEST_LEARN = 'REQUEST_LEARN';
export const RECEIVE_SEQ_SUCCESS = 'RECEIVE_SEQ_SUCCESS';
export const RECEIVE_SEQ_FAILURE = 'RECEIVE_SEQ_FAILURE';
export function loadSeq(id, set_id, diff) {
	return async(dispatch, getState) => {
		dispatch({ type: REQUEST_LEARN })
		// const user = getState().user.user
		try {
			let seqs = ( await axios.get(`${api_url}/sequences?user_id=${id}&set_id=${set_id}`) ).data
			seqs = seqs['sequences']
			let filtered_seqs = seqs.filter(seq => seq.completion == 'None')	
			if (filtered_seqs.length > 0) {
				let curr_seq = filtered_seqs.sort((s1, s2) => {
					return new Date(s1['creation']) - new Date(s2['creation']);
				})
				curr_seq = curr_seq[0]
				dispatch({ type: RECEIVE_SEQ_SUCCESS, curr_seq})
				dispatch(loadQs())
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
			let d;
			if (diff !== undefined) {
				d = diff
			} else {
				d = 'mc'
			}
			await axios.post(`${api_url}/sequences/`, {
				user_id: user.id,
				set_id: set_id,
				mode: 'learn', // hardcoded for now
				difficulty: d
			}).then(curr_seq => {
				let q_list = curr_seq['queue_list']
				dispatch({type: RECEIVE_SEQ_SUCCESS, curr_seq})
				dispatch({type: RECEIVE_QS_SUCCESS, q_list})
			})			
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
			let q_list = ( await axios.get(`${api_url}/sequences/${cs['id']}/queues`) ).data
			q_list = q_list['queues']
			dispatch({ type: RECEIVE_QS_SUCCESS, q_list})
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
				dispatch(newTrial('mc'))
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
export const RECEIVE_TRIAL_SUCCESS = 'RECEIVE_TRIAL_SUCCESS';
export const RECEIVE_TRIAL_FAILURE = 'RECEIVE_TRIAL_FAILURE';
export const RECEIVE_LEARN = 'RECEIVE_LEARN';
export function newTrial(diff) {
	return async(dispatch, getState) => {		
		try {			
			let lt = getState().learn.last_trial;		
			let curr_trial = getState().learn.trial
			let curr_seq = getState().learn.curr_seq;
			let curr_q = getState().learn.curr_q
			if (lt['accuracy'] !== null && lt['accuracy'] === 1) { 
				dispatch({ type: RECEIVE_TRIAL_SUCCESS, lt })
				return;  
			}	
			let d;
			if (diff !== undefined) {
				d = diff;
			} else {
				d = null // let the server generate diff 
			}		
			await axios.post(`${api_url}/trials/`, {
				user_id: curr_seq['user_id'],
				set_id: curr_seq['set_id'],
				item_id: curr_q['item_id'],
				queue_id: curr_q['id'],
				difficulty: 'related'
			}).then(res => {
				const trial = res.data
				if (curr_trial['item_id'] !== trial['item_id']) {
					dispatch({type: RECEIVE_TRIAL_SUCCESS, trial})
					dispatch({type: RECEIVE_LEARN})
					return;
				}
				dispatch({type: ADAPT_DIFF, trial})						
			})
		} catch(err) {
			dispatch({
				type: RECEIVE_TRIAL_FAILURE,
				error: Error(err)
			})
		}
	}
}

export const CLEAR_LEARN = 'CLEAR_LEARN';
export function clearLearn() {
	return {
		type: CLEAR_LEARN
	}
}

/* 
@params
*/
export const SHOW_CORRECT = 'SHOW_CORRECT';
export const GIVE_FEEDBACK = 'GIVE_FEEDBACK';
export const ADAPT_DIFF = 'ADAPT_DIFF';
export const ADAPT_ERROR = 'ADAPT_ERROR';
export function adapt(answer, reaction_time, response_time) {
	return async(dispatch, getState) => {
		try {
			let id = getState().learn.trial.id
			await axios.put(`${api_url}/trials/${id}`, {
				answer: answer,
				reaction_time: reaction_time,
				response_time: response_time
			}).then(res => {
				const updated_trial = res.data;
				dispatch({type: GIVE_FEEDBACK, updated_trial})
				const acc = updated_trial['accuracy']
				if (acc === 1) { 
					dispatch({type: SHOW_CORRECT})
					return; 
				}
				if (acc < 1) {					
					dispatch(newTrial())
				}
			})
		} catch(err) {
			dispatch({
				type: ADAPT_ERROR,
				error: Error(err)
			})
		}
	}
}


/*
@params
the move function will take a parameter that specifies which direction. If click to continue || arrownext, then we move forward one. If it's backward, we move down one. To properly cycle through, use the count of the queue list. 
If we move back, and the number = 0, then go to the queue_list.count. 
If we move forward, and the number is greater than the queue_list.count, then go to pos 1. 
In order to properly handle the loading of new trials, dispatch a few actions.
PUT the new position to the sequence class.
Upon response of the PUT, dispatch redux to change curr_q to reflect. 
.then after, call loadTrials(), which should pull the new q and load new trials.
*/





















