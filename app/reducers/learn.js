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

	ADAPT_DIFF,
	ADAPT_ERROR,
	GIVE_FEEDBACK,
	SHOW_CORRECT,

	MOVE_SLOT,
	MOVE_ERROR,

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
		case GIVE_FEEDBACK:
			const new_fb = action.updated_trial['feedback'];
			const new_praise = action.updated_trial['praise'];
			return {
				...state,
				trial: Object.assign({...state.trial}, {feedback: new_fb, praise: new_praise})
			}
		case ADAPT_DIFF:
			const old_fb = state.trial['feedback'];
			const old_praise = state.trial['praise'];
			return {
				...state,
				trial: Object.assign({...action.trial}, {feedback: old_fb, praise: old_praise})
			}
		case MOVE_SLOT:
			const new_pos = action.new_pos
			const new_q = state.queue_list.filter(q => q['order'] === new_pos)[0]
			return {
				...state,
				curr_pos: action.new_pos,
				curr_q: new_q
			}
		case CLEAR_LEARN: 
			return {
				...state = init_learn				
			}
		case SHOW_CORRECT:

		case MOVE_ERROR:
		case RECEIVE_SEQ_FAILURE:
		case RECEIVE_QS_FAILURE:
		case RECEIVE_TRIALS_FAILURE:
		case RECEIVE_TRIAL_FAILURE:
		case ADAPT_ERROR:
		default:
			return state;
	}
}




































