import {
	REQUEST_LEARN,
	RECEIVE_SEQ_SUCCESS,
	RECEIVE_SEQ_FAILURE,
	RECEIVE_QS_SUCCESS,
	RECEIVE_QS_FAILURE, 
	RECEIVE_TRIALS_SUCCESS,
	RECEIVE_TRIALS_FAILURE,
	RECEIVE_TRIAL_SUCCESS,
	RECEIVE_TRIAL_FAILURE,
	RECEIVE_LEARN,
	CLEAR_LEARN
} from '../actions/learn';

const init_learn = {
	is_fetching_learn: false,
	curr_seq: {},
	queue_list: [],
	curr_pos: null,
	curr_q: {},
	trials: [],
	last_trial: {},
	trial: {
		id: null,
		user_id: null,
		set_id: null,
		item_id: null,
		queue_id: null,
		start: null,
		reaction_time: null,
		response_time: null,
		answer: null,
		target: null,
		cue: null,
		pic: null,
		accuracy: null,
		difficulty: null,
		grading: null,
		augitem_id: null,
		augcue: null,
		related: null,
		choices: null,
		none: null,
		stem: null,
		feedback: null,
		praise: null
	}
}

export default function learn(state = init_learn, action) {
	switch(action.type) {
		case REQUEST_LEARN:			
			return {
				...state,
				is_fetching_learn: true
			}
		case RECEIVE_LEARN:
			return {
				...state,
				is_fetching_learn: false
			}
		case RECEIVE_SEQ_SUCCESS:
			const cp = action.curr_seq['position']
			return {
				...state,
				curr_seq: action.curr_seq,
				curr_pos: cp
			}
		case RECEIVE_QS_SUCCESS:
			const ql = action.q_list;
			const q = ql.filter(q => q['order'] == state.curr_pos)[0]						
			return {
				...state,
				queue_list: action.q_list,
				curr_q: q
			}
		case RECEIVE_TRIALS_SUCCESS:
			const lt = action.trials.slice(-1)[0]
			return { 
				...state,
				trials: action.trials,
				last_trial: lt
			}
		case RECEIVE_TRIAL_SUCCESS:
			return {
				...state,
				trial: action.trial
			}
		case CLEAR_LEARN: 
			return {
				...state = init_learn				
			}
		case RECEIVE_SEQ_FAILURE:
		case RECEIVE_QS_FAILURE:
		case RECEIVE_TRIALS_FAILURE:
		case RECEIVE_TRIAL_FAILURE:
		default:
			return state;
	}
}




































