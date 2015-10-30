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

	GRADING,

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
import _ from 'lodash';

const initial_learnstate = {
	isGrading: false,
	isFetchingLearn: false,
	isFetchingSequence: false,
	isFetchingSlots: false,
	isFetchingTrials: false,
	isFetchingTrial: false,
	isChangingDifficulty: false,
	isShowingCorrect: false,
	isShowingCompletedSequence: false,
	isShowingFeedback: false,
	isShowingHint: false,
	current_sequence: {},
	slots: [],
	current_slot: {},
	trials: [],
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
				current_sequence: action.sequence,
				isShowingCompletedSequence: action.sequence.completed
			}
		case RECEIVE_SLOTS_SUCCESS:
			let slots = action.slots,
				slot = slots.filter(slot => slot.order === state.current_sequence.position)[0],				
				show_correct;
			if(slot.completed == false) {
				show_correct = false
			} else {
				show_correct = true
			}
			return {
				...state,
				isFetchingSlots: false,
				isShowingCorrect: show_correct,
				slots: action.slots,
				current_slot: slot
			}
		case RECEIVE_TRIALS_SUCCESS:
			return {
				...state,
				isFetchingTrials: false,
				trials: action.trials,
				trial: action.trials.slice(-1)[0]
			}
		case NEW_TRIAL_SUCCESS:
			const _newtrials = state.trials.concat(action._trial),
				 showHint = true;
				// _shouldShowHint = action._trial.augs.length > 0 ? true : false;
								// && action._trial.augs[0].indexOf(action._trial.censored_cue) !== -1;
			return {
				...state,
				isShowingHint: showHint,
				isFetchingLearn: false,
				isFetchingTrials: false,
				isShowingCorrect: false,
				trials: _newtrials,
				current_trial: action._trial,
				trial: action._trial
			}
		case UPDATE_SEQUENCE_SUCCESS:
			const _slot = state.slots.filter(slot => slot.order === action.sequence.position)[0],
				  _correctslot = _slot.completed;			
			return {
				...state,
				isShowingCorrect: _correctslot,
				current_sequence: action.sequence,
				current_slot: _slot
			}
		case UPDATE_SLOT_SUCCESS:
			return {
				...state,
				isGrading: false,
				current_slot: action.slot,
				slots: state.slots.map(slot => {
					return slot.id === action.slot.id 
					? action.slot
					: slot
				})
			}
		case GRADING:
			return {
				...state,
				isGrading: true
			}
		case UPDATE_TRIAL_SUCCESS:
			return {
				...state,
				trials: state.trials.map((trial) => {
					return trial.id == action.updated_trial.id
					? action.updated_trial
					: trial
				}),
				current_trial: action.updated_trial,
				trial: action.updated_trial
			}
		case ADAPT_SUCCESS:
			return {
				...state,
				isGrading: false,
				current_slot: Object.assign({...state.current_slot}, {format: action.new_format})
			}
		// case NEW_HINT_SUCCESS:
		// 	let shouldShowHint = action.new_aug !== undefined ? true : false;
		// 					   // && action.new_aug.indexOf(state.trial.censored_cue) !== -1;
		// 	return {
		// 		...state,
		// 		isShowingHint: shouldShowHint,
		// 		trial: Object.assign({...state.trial}, {augs: action.new_aug})
		// 	}
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
			if(action.next_slot.completed == false) {
				next_correct = false;
			} else {
				next_correct = true;
			}
			return {
				...state,
				isShowingCorrect: next_correct
			}
		case RECEIVE_LEARN_SUCCESS:
			return {
				...state,
				isFetchingLearn: false
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

























