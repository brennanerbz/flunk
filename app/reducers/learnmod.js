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
				curr_seq: {}
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
			console.log("%c" + action.qs, 'color: green; font-weight: bold')	
			return {
				...state,
				is_fetching_qs: false,
				qs: action.qs
			}
		default:
			return state;
	}
}

const learn = combineReducers({
	seqs,
	qs
})
export default learn;