import { combineReducers } from 'redux';

// * Learn Mod: Sequences * //
import {
	REQUEST_SEQS,
	RECEIVE_SEQS_SUCCESS,
	RECEIVE_SEQS_FAILURE,
	CLEAR_SEQ
} from '../actions/learnmod';

let init_seqs = { 
	is_fetching_seq: false,
	curr_seq: {}
}

function seqs(state = init_seqs, action) {
	switch(action.type) {
		case REQUEST_SEQS:
			return {
				...state,
				is_fetching_seq: true
			}
		case RECEIVE_SEQS_SUCCESS:
			return {
				...state,
				is_fetching_seq: false,
				curr_seq: action.curr_seq
			}
		case CLEAR_SEQ:
			return {
				...state,
				curr_seq: null
			}
		case RECEIVE_SEQS_FAILURE:
		default:
			return state;
	}
}

// * Learn Mod: Queues * //
import {
	REQUEST_QS,
	RECEIVE_QS_SUCCESS,
	RECEIVE_QS_FAILURE,
	SET_CURR_Q,
	CLEAR_Q
} from '../actions/learnmod';

let init_qs = {
	is_fetching_qs: false,
	qs: []
}
function qs(state = init_qs, action) {
	switch(action.type) {
		case REQUEST_QS:
			return {
				...state,
				is_fetching_qs: true
			}
		case RECEIVE_QS_SUCCESS:
			// console.log("%c" + action.qs, 'color: green; font-weight: bold')	
			return {
				...state,
				is_fetching_qs: false,
				qs: action.qs,
				curr_seq: action.curr_seq,
				curr_p: action.curr_seq['position']
			}
		case SET_CURR_Q:
			const cq = state.qs.filter(q => q.order == state.curr_p)
			console.log('%c' + cq, 'color: green, font-weight: bold')
			return {
				...state,
				curr_q: cq[0]
			}
		case CLEAR_Q:
			return {
				...state,
				qs: null
			}
		case RECEIVE_QS_FAILURE:
		default:
			return state;
	}
}

// * Learn Mod: Trials * //

import {
	REQUEST_TRIALS,
	RECEIVE_TRIALS_SUCCESS,
	RECEIVE_TRIALS_FAILURE,
	CLEAR_TRIAL
} from '../actions/learnmod';

let init_trials = {
	is_fetching_trials: false,
	trials: [],
	latest_trial: {}
}
function trials(state = init_trials, action) {
	switch(action.type) {
		case REQUEST_TRIALS:
			return {
				...state,
				is_fetching_trials: true
			}
		case RECEIVE_TRIALS_SUCCESS:
			return {
				...state,
				is_fetching_trials: false,
				trials: action.trials,
				latest_trial: action.latest_trial
			}
		case CLEAR_TRIAL:
			return {
				...state,
				trials: [],
				latest_trial: {}
			}
		case RECEIVE_TRIALS_FAILURE:
		default:
			return state;
	}
}


const learn = combineReducers({
	seqs,
	qs,
	trials
})
export default learn;







