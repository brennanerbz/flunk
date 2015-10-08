import { combineReducers } from 'redux';
import {
	REQUEST_SEQS,
	RECEIVE_SEQS_SUCCESS,
	RECEIVE_SEQS_FAILURE,
	CLEAR_SEQ
} from '../actions/learnmod';

let init_learn_state = { 
	is_fetching_seq: false,
	is_fetching_qs: false,
	curr_seq: {},
	qs: []
}

function seqs(state = init_learn_state, action) {
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
				curr_seq: {}
			}
		case RECEIVE_SEQS_FAILURE:
		default:
			return state;
	}
}

import {
	REQUEST_QS,
	RECEIVE_QS_SUCCESS,
	RECEIVE_QS_FAILURE,
	CLEAR_Q
} from '../actions/learnmod';

function qs(state = init_learn_state, action) {
	switch(action.type) {
		case REQUEST_QS:
			return state;
		case RECEIVE_QS_SUCCESS:	
			console.log("ERROR PRONE")
			return state;
		default:
			return state;
	}
}

const learn = combineReducers({
	seqs,
	qs
})
export default learn;