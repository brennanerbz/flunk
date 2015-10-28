import {
	REQUEST_LEARN,
	RECEIVE_LEARN_SUCCESS,
	RECEIVE_LEARN_FAILURE,

	REQUEST_SEQUENCE,
	RECEIVE_SEQUENCE_SUCCESS,
	RECEIVE_SEQUENCE_FAILURE,

	NEW_SEQUENCE_FAILURE,

	UPDATE_SEQUENCE,
	UPDATE_SEQUENCE_SUCCESS,
	UPDATE_SEQUENCE_FAILURE,

	REQUEST_SLOTS,
	RECEIVE_SLOTS_SUCCESS,
	RECEIVE_SLOTS_FAILURE,

	UPDATE_SLOT,
	UPDATE_SLOT_SUCCESS,
	UPDATE_SLOT_FAILURE,

	TRANSFORM_5_SLOTS,
	COMPLETED_5_SLOTS,

	REQUEST_TRIALS,
	RECEIVE_TRIALS_SUCCESS,
	RECEIVE_TRIALS_FAILURE,

	NEW_TRIAL,
	NEW_TRIAL_SUCCESS,
	NEW_TRIAL_FAILURE,

	CHANGE_FORMAT,

	NEW_HINT,
	NEW_HINT_SUCCESS,
	NEW_HINT_FAILURE,

	UPDATE_TRIAL,
	UPDATE_TRIAL_SUCCESS,
	UPDATE_TRIAL_FAILURE,

	ADAPT,
	ADAPT_SUCCESS,
	ADAPT_FAILURE,

	SHOW_CORRECT,

	SHOW_COMPLETED_SEQUENCE,

	SKIP_SUCCESS,
	SKIP_FAILURE,

	MOVE_SLOT,
	MOVE_SLOT_SUCCESS,
	MOVE_SLOT_FAILURE,

	CLEAR_LEARN
} from '../actions/learnv2';

const initial_learnstate = {
	isFetchingLearn: false,
	isFetchingSequence: false,
	isFetchingSlots: false,
	isFetchingTrials: false,
	isFetchingTrial: false,
	isChangingDifficulty: false,
	isShowingCorrect: false,
	isShowingCompletedSequence: false,
	isShowingFeedback: false,
	current_sequence: {},
	slots: [],
	current_slot: {},
	trials: {},
	current_trial: {},
	trial: {}
}
export default function learn(state = initial_learnstate, action) {
	switch(action.type) {
		case REQUEST_LEARN:
			return {
				...state,
				isFetchingLearn: true
			}
		case REQUEST_SEQUENCE:
			return {
				...state,
				isFetchingSequence: true
			}
		case REQUEST_SLOTS:
			return {
				...state,
				isFetchingSlots: true
			}
		case REQUEST_TRIALS:
			return {
				...state,
				isFetchingTrials: true
			}		
		case RECEIVE_SEQUENCE_SUCCESS:
			return {
				...state,
				isFetchingSequence: false,
				current_sequence: action.sequence
			}
		case RECEIVE_SLOTS_SUCCESS:
			let current_slot = slots.filter(slot => slot.order == state.current_sequence.position),
				_show_correct;
			if(current_slot.completion !== 'None') {
				show_correct = true
			} else {
				show_correct = false
			}
			return {
				...state,
				isFetchingSlots: false,
				isShowingCorrect: show_correct,
				slots: action.slots,
				current_slot: current_slot
			}
		case RECEIVE_TRIALS_SUCCESS:
			let last = action.trials.slice(-1)[0],
				show_correct;
			if (last.accuracy === 1) {
				show_correct = true
			} else if (last.accuracy < 1) {
				show_correct = false
			}
			return {
				...state,
				isShowingCorrect: show_correct,
				isFetchingTrials: false,
				isFetchingLearn: false,
				trials: action.trials
			}
		case NEW_TRIAL_SUCCESS:
			return {
				...state,
				isFetchingLearn: false,
				trials: state.trials.concat(action._trial),
				current_trial: action._trial,
				trial: action._trial
			}
		case UPDATE_SEQUENCE_SUCCESS:
			const new_slot = state.slots.filter(slot => slot.order == action.sequence.position)
			return {
				...state,
				current_sequence: action.sequence,
				current_slot: new_slot
			}
		case UPDATE_SLOT_SUCCESS:
			return {
				...state,
				current_slot: action.slot,
				slots: state.slots.map(slot => {
					return slot.order = action.slot.order 
					? action.slot
					: slot
				})
			}
		case UPDATE_TRIAL_SUCCESS:
			return {
				trials: state.trials.map(trial => {
					return trial.id == action.updated_trial
					? action.trial
					: trial
				}),
				current_trial: action.updated_trial,
				trial: action.updated_trial
			}
		case ADAPT_SUCCESS:
			return {
				...state,
				current_slot: Object.assign({...state.current_slot}, {format: action.new_format})
			}
		case NEW_HINT_SUCCESS:
			return {
				...state,
				trial: Object.assign({...state.trial}, {augs: action.new_aug})
			}
		case SHOW_CORRECT:
			return {
				...state,
				isShowingCorrect: true
			}
		case SHOW_COMPLETED_SEQUENCE: 
			return {
				...state,
				isShowingCompletedSequence: true
			}
		case SKIP_SUCCESS:
		case MOVE_SLOT_SUCCESS:
			let next_correct;
			if(action.next_slot.completion !== 'None') {
				next_correct = true;
			} else {
				next_correct = false;
			}
			return {
				...state,
				isShowingCorrect: next_correct,
				current_slot: action.next_slot
			}
		case CLEAR_LEARN:
			return {
				...state = initial_learnstate
			}
		case RECEIVE_SEQUENCE_FAILURE:
		case RECEIVE_SLOTS_FAILURE:
		case RECEIVE_TRIALS_FAILURE:
		case NEW_SEQUENCE_FAILURE:
		case NEW_TRIAL_FAILURE:
		case NEW_HINT_FAILURE:
		case UPDATE_SEQUENCE_FAILURE:
		case UPDATE_SLOT_FAILURE:
		case UPDATE_TRIAL_FAILURE:
		case SKIP_FAILURE:
		case MOVE_SLOT_FAILURE:
		default:
			return state;
	}
}

























