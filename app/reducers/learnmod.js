import {
	REQUEST_SEQS,
	RECEIVE_SEQS_SUCCESS,
	RECEIVE_SEQS_FAILURE,
	CLEAR_SEQ
} from '../actions/learnmod';

let init_learn_state = {
	is_fetching_seq: false,
	curr_seq: {}
}

export default function learn(state = init_learn_state, action) {
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