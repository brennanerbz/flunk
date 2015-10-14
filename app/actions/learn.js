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
				console.log(id + " " + set_id)
				dispatch(newSeq(id, set_id))
			}				
		} catch (err) {
			dispatch({
				type: RECEIVE_SEQ_FAILURE,
				error: Error(err)
			})
		}
	}
}
export const UPDATED_SEQUENCE = 'UPDATED_SEQUENCE';
export const NEW_SEQ_FAILURE = 'NEW_SEQ_FAILURE';
export function newSeq(user_id, set_id, diff) {
	return async(dispatch, getState) => {
		let current_seq = getState().learn.curr_seq;
		let csid = current_seq['id']
		let slot_list = getState().learn.queue_list;
		let finished_slots = slot_list.filter(slot => slot.completion == "None")		
		try {
			let d;
			if (diff !== undefined) {
				d = diff
			} else {
				d = 'mc'
			}
			if (current_seq !== undefined && finished_slots.length === 0) {
				await axios.put(`${api_url}/sequences/${csid}`, {
					completion: true
				})
				dispatch({type: UPDATED_SEQUENCE})
			}
			await axios.post(`${api_url}/sequences/`, {
				user_id: Number(user_id),
				set_id: Number(set_id),
				mode: 'learn', // hardcoded for now
				difficulty: d
			})
			.then(res => {
				var _cs = res.data
				let curr_seq = _cs;
				dispatch({type: RECEIVE_SEQ_SUCCESS, curr_seq})
				
				let q_list = _cs.queue_list
				let q = q_list.filter(q => q.order === _cs.position)[0]	
				dispatch({type: RECEIVE_QS_SUCCESS, q_list, q})	

			})
			.then((res) => dispatch(loadTrials()))
			.catch(err => {
				console.log(err)
			})			
		} catch(err) {
			dispatch({
				type: NEW_SEQ_FAILURE,
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
		let set_id = cs['set_id']
		let user_id = cs['user_id']
		try {
			let q_list = ( await axios.get(`${api_url}/sequences/${cs['id']}/queues`) ).data	
			q_list = q_list['queues']

			let q = q_list.filter(q => q['order'] == cs['position'])[0]
			dispatch({ type: RECEIVE_QS_SUCCESS, q_list, q})

			let done = q_list.filter(q => q['completion'] == 'None')
			if(done.length === 0) {
				dispatch(newSeq(user_id, set_id))
				return;
			}
			
			if (done.length > 0 && q['completion'] !== 'None') {
				dispatch(skipToUnfinished('next'))
				return;
			}

			if (done.length > 0 && q['completion'] == 'None') {
				dispatch(loadTrials())
				return;
			}			
				
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
		var _cq = getState().learn.curr_q;
		console.log(_cq)
		try {
			let trials = ( await axios.get(`${api_url}/queues/${_cq.id}/trials`) ).data
			trials = trials['trials']
			dispatch({type: RECEIVE_TRIALS_SUCCESS, trials})

			if (trials.length === 0) { 
				dispatch(newTrial())
				return;
			} 
			else {
				let lt = trials.slice(-1)[0]
				let q_id = lt['queue_id']
				if (lt['accuracy'] === 1 && _cq['completion'] == 'None') { // error checker
					await axios.put(`${api_url}/queues/${q_id}`, {
						completion: true
					}).then(res => {
						let data = res.data;
						dispatch({type: UPDATE_SLOT, data})
					})
				} else {
					dispatch(newTrial()) // determine diff level with better logic		
				}
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
			let curr_trial = getState().learn.trial
			let curr_seq = getState().learn.curr_seq;
			let curr_q = getState().learn.curr_q
				
			let d;
			if (diff !== undefined) {
				d = diff;
			} else {
				d = null // let the server generate diff 
			}
			console.log("%c" + curr_q['id'], "color:green;")		
			await axios.post(`${api_url}/trials/`, {
				user_id: curr_seq['user_id'],
				set_id: curr_seq['set_id'],
				item_id: curr_q['item_id'],
				queue_id: curr_q['id'],
				difficulty: d
			}).then(res => {
				const trial = res.data
				if (curr_trial == undefined || curr_trial['item_id'] !== trial['item_id']) {
					dispatch({type: RECEIVE_TRIAL_SUCCESS, trial})
					dispatch({type: RECEIVE_LEARN})
					return;
				}
				dispatch({type: ADAPT_DIFF, trial})						
			}).catch(err => {
				console.log(err)				
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
export const GIVE_FEEDBACK = 'GIVE_FEEDBACK';
export const ADAPT_DIFF = 'ADAPT_DIFF';
export const ADAPT_ERROR = 'ADAPT_ERROR';
export function adapt(answer, reaction_time, response_time) {
	return async(dispatch, getState) => {
		try {
			let id = getState().learn.trial.id
			let q_id = getState().learn.curr_q['id']
			await axios.put(`${api_url}/trials/${id}`, {
				answer: answer,
				reaction_time: reaction_time,
				response_time: response_time
			}).then(res => {
				const updated_trial = res.data;
				dispatch({type: GIVE_FEEDBACK, updated_trial})
				const acc = updated_trial['accuracy']
				if (acc === 1) { 
					dispatch(markCorrect(q_id))
					// dispatch(skipToUnfinished('next'))					
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

export const UPDATE_SLOT = 'UPDATE_SLOT';
export const SHOW_CORRECT = 'SHOW_CORRECT';
export const SHOW_COMPLETED_SEQ = 'SHOW_COMPLETED_SEQ';
export const MARK_ERROR = "MARK_ERROR"
export function markCorrect(queue_id) {
	return async(dispatch, getState) => {				
		try {
			await axios.put(`${api_url}/queues/${queue_id}`, {
				completion: true
			}).then((res) => {
				let data = res.data;
				dispatch({type: SHOW_CORRECT})
				dispatch({type: UPDATE_SLOT, data})
				})
			.then((res) => {
				let list = getState().learn.queue_list
				let completed_slots = list.filter(slot => slot['completion'] == "None")
				if(list !== undefined && completed_slots.length === 0) {
					dispatch({ type: SHOW_COMPLETED_SEQ })
				}
			})
		} catch(err) {
			dispatch({
				type: MARK_ERROR,
				error: Error(err)
			})
		}
	}
}



/*
@params
*/
function prev(pos, list) {
	for (var i = pos; i < list.length; i--) {
		if(list[i]['completion'] == "None") { 			
			return i;
		}
	}
}
function next(pos, list) {
	for(var i = pos - 1; i < list.length; i++) {
		if(list[i]['completion'] == 'None') {
			return i;
		}
	}
}
function skip(dir, pos, list) {
	let val,
		recur,
		length = list.slice(-1)[0]['order']
	if (dir == 'next') {
		if (pos == length) {
			pos = 1
		}
		val = next(pos, list)
		recur = next(1, list)
	} else if (dir == 'prev') {
		if (pos - 1 === 0 || pos === 0) {
			pos = length;
		}
		val = prev(pos - 1, list)
		recur = prev(length - 1, list)
	}		
	if (val !== undefined) {
		return list[val]['order'];
	} else {
		return list[recur]['order'];
	}
}

/*
@params
*/

export const SKIP_SUCCESS = 'SKIP_SUCCESS';
export const SKIP_FAILURE = 'SKIP_FAILURE';
export function skipToUnfinished(direction) {
	return async(dispatch, getState) => {
		let curr_seq = getState().learn.curr_seq
		let list = getState().learn.queue_list
		console.log(list)
		try {
			let cur_pos = curr_seq['position']
			if (direction == 'prev') {
				cur_pos = cur_pos - 1;
			}
			let next_pos = skip(direction, cur_pos, list)
			dispatch(updatePosition(next_pos))			
		} catch(err) {
			dispatch ({
				type: SKIP_FAILURE,
				error: Error(err)
			})
		}
	}
}

/*
@params
*/
export const MOVE_SLOT = 'MOVE_SLOT';
export const MOVE_ERROR = 'MOVE_ERROR';
export function updatePosition(pos) {
	return async(dispatch, getState) => {
		try {
			const id = getState().learn.curr_seq['id']			
			await axios.put(`${api_url}/sequences/${id}`, {
				position: pos,
				difficulty: null,
				mode: 'learn'
			}).then(res => {
				const new_pos = res.data['position']
				dispatch({type: MOVE_SLOT, new_pos})
			}).then(res => {
				dispatch(loadTrials())
			})
		} catch (err) {	
			dispatch({
				type: MOVE_ERROR,
				error: Error(err)
			})
		}
	}
} 


















