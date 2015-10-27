import axios from 'axios';
import moment from 'moment';
import keyMirror from 'key-mirror';

const api_url = 'http://127.0.0.1:5000/webapi/v1.0';

/*
@params: user_id, set_id, assignment_id, sequence_id
@purpose: method that runs sequences and slots concurrently
*/
export const REQUEST_LEARN = 'REQUEST_LEARN';
export const RECEIVE_LEARN_SUCCESS = 'RECEIVE_LEARN_SUCCESS';
export const RECEIVE_LEARN_FAILURE = 'RECEIVE_LEARN_FAILURE';
function requestLearn() {
	return {
		type: REQUEST_LEARN
	}
}
export function fetchLearn(user_id, set_id, assignment_id, sequence_id) {
	return async(dispatch, getState) => {
		dispatch(requestLearn())
		try {
			await axios.all([''])
			// TODO: fill in with appr. function calls 
		}
		catch (err) {
			dispatch({
				type: RECEIVE_LEARN_FAILURE,
				error: Error(err)
			})
		}
	}
}


/*
@params: user_id, set_id, assignment_id, mode
@purpose: to GET the sequences for given user, set and send most recent/new to redux store
*/
export const REQUEST_SEQUENCE = 'REQUEST_SEQUENCE';
export const RECEIVE_SEQUENCE_SUCCESS = 'RECEIVE_SEQUENCE_SUCCESS';
export const RECEIVE_SEQUENCE_FAILURE = 'RECEIVE_SEQUENCE_FAILURE';
function requestSequence() {		
	return {
		type: REQUEST_SEQUENCE
	}
}
export function fetchSequence(user_id, set_id, assignment_id, mode) {
	return async(dispatch, getState) => {
		try {
			let sequences = await axios.get(`${api_url}/sequences/user_id=${user_id}&assignment_id=${assignment_id}&set_id=${set_id}`).data
			sequences = sequences['sequences'].filter(seq => seq.completed !== true)
			if (sequences.length > 0) {
				const sorted_sequences = sequences.sort((s1, s2) => {
					return new Date(s1.creation) - new Date(s2.creation)
				})
				const sequence = sorted_sequences[0]
				dispatch({type: RECEIVE_SEQUENCE_SUCCESS, sequence}) // TODO: move return success to axios.all call
			} else {
				dispatch() // TODO: NEW_SEQUENCE
			}			
		} catch(err) {
			dispatch({
				type: RECEIVE_SEQUENCE_FAILURE,
				error: Error(err)
			})
		}
	}
}

/*
@params: user_id, set_id, assignment_id, mode, format, timing, difficulty, adapation, chances, loop, reverse_cue, difficulty_chosen_by_user
@purpose: send a POST request to create a new sequence. On the response, it will also have the necessary slots. Will be able to dispatch receive slots success.
*/
export const NEW_SEQUENCE_FAILURE = 'NEW_SEQUENCE_FAILURE';
export function newSequence(user_id, 
							set_id, 
							assignment_id, 
							mode, 
							format, 
							timing, 
							difficulty, 
							adapation, 
							chances, 
							loop, 
							reverse_cue, 
							difficulty_chosen_by_user) {
	return async(dispatch, getState) => {
		try {
			let chosen_mode,
				chosen_format,
				chosen_timing,
				chosen_difficulty;
			if(mode !== undefined) {
				chosen_mode = mode;
			} else {
				chosen_mode = 'learn'
			}
			if (format !== undefind) {
				chosen_format = format;
			} else {
				chosen_format = 'recall' 
			}
			if (timing !== undefind) {
				chosen_timing = timing;
			} else {
				chosen_timing = 'off' 
			}
			if (difficulty !== undefind) {
				chosen_difficulty = difficulty;
			} else {
				chosen_difficulty = 'intermediate' 
			}
			arguments.forEach(arg => {
				if (arg !== undefined) {
					return arg;
				} else {
					return arg = null;
				}
			})
			await axios.post(`${api_url}/sequences`, {
				user_id: user_id,
				set_id: set_id,
				assignment_id: assignment_id,
				mode: chosen_mode,
				format: chosen_format,
				timing: chosen_timing,
				difficulty: chosen_difficulty,
				adapation: adapation,
				chances: chances,
				loop: loop,
				reverse_cue: reverse_cue,
				difficulty_chosen_by_user: difficulty_chosen_by_user
			}).then(res => {
				const sequence = res.data
				const slots = sequence['slots']
				dispatch({type: RECEIVE_SEQUENCE_SUCCESS, sequence})
				dispatch({type: RECEIVE_SLOTS_SUCCESS, slots })
			})
		} catch(err) {
			dispatch({
				type: NEW_SEQUENCE_FAILURE,
				error: Error(err)
			})
		}
	}
}

/*
@params: sequence_id, position, compelted, abandoned, mode, format, timing, difficulty, adapation, chances, loop, reverse_cue, difficulty_chosen_by_user
@purpose: send a PUT request to the sequence id, most often updating the position and if the sequence was completed
*/
export const UPDATE_SEQUENCE = 'UPDATE_SEQUENCE';
export const UPDATE_SEQUENCE_SUCCESS = 'UPDATE_SEQUENCE_SUCCESS';
export const UPDATE_SEQUENCE_FAILURE = 'UPDATE_SEQUENCE_FAILURE';
function willUpdateSequence() {
	return {
		type: UPDATE_SEQUENCE
	}
}
export function updateSequence(sequence_id, 
							   position, 
							   completed, 
							   abandoned, 
							   mode, 
							   format, 
							   timing, 
							   difficulty, 
							   adapation, 
							   chances, 
							   loop, 
							   reverse_cue, 
							   difficulty_chosen_by_user) {
	return async(dispatch, getState) => {
		dispatch(willUpdateSequence())
		try {
			let chosen_mode,
				chosen_format,
				chosen_timing,
				chosen_difficulty; 

			/* Default settings */
			if (mode !== undefined) {
				chosen_mode = mode;
			} else {
				chosen_mode = 'learn'
			}
			if (format !== undefind) {
				chosen_format = format;
			} else {
				chosen_format = 'recall' 
			}
			if (timing !== undefind) {
				chosen_timing = timing;
			} else {
				chosen_timing = 'off' 
			}
			if (difficulty !== undefind) {
				chosen_difficulty = difficulty;
			} else {
				chosen_difficulty = 'intermediate' 
			}
			arguments.forEach(arg => {
				if (arg !== undefined) {
					return arg;
				} else {
					return arg = null;
				}
			})
			await axios.put(`${api_url}/sequences/${sequence_id}`, {
				position: position,
				completed: completed,
				abandoned: abandoned,
				mode: chosen_mode,
				format: chosen_format,
				timing: chosen_timing,
				difficulty: chosen_difficulty,
				adapation: adapation,
				chances: chances,
				loop: loop,
				reverse_cue: reverse_cue,
				difficulty_chosen_by_user: difficulty_chosen_by_user
			}).then(res => {
				const sequence = res.data;
				dispatch({type: UPDATE_SEQUENCE_SUCCESS, sequence})
			})
		} catch(err) {
			dispatch({
				type: UPDATE_SEQUENCE_FAILURE,
				error: Error(err)
			})
		}
	}
}

/*
@params: sequence_id
@purpose: send a GET request to collect the list of slots. include checker methods to make sure all haven't been completed.
*/
export const REQUEST_SLOTS = 'REQUEST_SLOTS';
export const RECEIVE_SLOTS_SUCCESS = 'RECEIVE_SLOTS_SUCCESS';
export const RECEIVE_SLOTS_FAILURE = 'RECEIVE_SLOTS_FAILURE';
function requestSlots() {
	return {
		type: REQUEST_SLOTS
	}
}
export function fetchSlots(sequence_id) {
	return async(dispatch, getState) => {
		dispatch(requestSlots())
		try {
			let slots = await axios.get(`${api_url}/sequences/${sequence_id}/slots`).data
			let unfinished_slots = slots['slots'].filter(slot => slot.completed !== true)
			if(unfinished_slots.length === 0) {
				dispatch() // TODO: send put request to current sequence that it's complete, and request new sequence
				return;
			}
			slots = slots['slots']
			dispatch({type: RECEIVE_SLOTS_SUCCESS, slots})
			// TODO: dispatch transformation of slots list to 5 item groups
		} catch(err) {
			dispatch({
				type: RECEIVE_SLOTS_FAILURE,
				error: Error(err)
			})
		}
	}
}

/*
@params: slot_id, completed, abandoned, format, reverse_cue, click_to_answer, flagged, hide
@purpose: send a PUT request to the slot_id, most often saying that it has been completed or changing the format
*/
export const UPDATE_SLOT = 'UPDATE_SLOT'
export const UPDATE_SLOT_SUCCESS = 'UPDATE_SLOT_SUCCESS'
export const UPDATE_SLOT_FAILURE = 'UPDATE_SLOT_FAILURE'
function willUpdateSlot() {
	return {
		type: UPDATE_SLOT
	}
}
export function updateSlot(slot_id,
						   completed,
						   abandoned,
						   format,
						   reverse_cue,
						   click_to_answer,
						   flagged,
						   hide) {
	return async(dispatch, getState) => {
		dispatch(willUpdateSlot())
		try {
			arguments.forEach(arg => {
				if(arg !== undefined) {
					return arg;
				} else {
					return arg = null;
				}
			})
			await axios.put(`${api_url}/slots/${slot_id}`, {
				completed: completed,
				abandoned: abandoned,
				format: format,
				reverse_cue: reverse_cue,
				click_to_answer: click_to_answer,
				flagged: flagged,
				hide: hide
			}).then(res => {
				let slot = res.data;
				dispatch({type: UPDATE_SLOT_SUCCESS, slot})
			})
		} catch(err) {
			dispatch({
				type: UPDATE_SLOT_FAILURE,
				error: Error(err)
			})
		}
	}
}

/*
@params: 
@purpose: send action to store that tells it to transform list of slots into 5 item groups
*/
export const TRANSFORM_5_SLOTS = 'TRANSFORM_5_SLOTS' // a few methods to set multiple arrays
export const COMPLETED_5_SLOTS = 'COMPLETED_5_SLOTS' // for display purposes 
export function transformSlots() {
	return {
		type: TRANSFORM_5_SLOTS
	}
}
export function completed5Slots() {
	return {
		type: COMPLETED_5_SLOTS
	}
}

// export const SET_CURRENT_SLOT = 'SET_CURRENT_SLOT';


/*
@params: slot_id
@purpose: send a GET request to collect list of trials. will be used to send to redux store, which will then be read by the new trial function to determine what to send. 
*/
export const REQUEST_TRIALS = 'REQUEST_TRIALS';
export const RECEIVE_TRIALS_SUCCESS = 'RECEIVE_TRIALS_SUCCESS';
export const RECEIVE_TRIALS_FAILURE = 'RECEIVE_TRIALS_FAILURE';
function requestTrials() {
	return {
		type: REQUEST_TRIALS
	}
}
export function fetchTrials(slot_id) {
	return async(dispatch, getState) => {
		try {
			let trials = await axios.get(`${api_url}/slots/${slot_id}/trials`).data
			trials = trials['trials'],
			trial = {};
			if(trials.length === 0) {
				trial['type'] = null;
				dispatch(newTrial(trial))
				return;
			}			
			dispatch({type: RECEIVE_TRIALS_SUCCESS, trials})
			trial = trials.slice(-1)[0]
			trial['type'] = 'return';
			dispatch(newTrial(trial))	
		} catch(err) {
			dispatch({
				type: RECEIVE_TRIALS_FAILURE,
				error: Error(err)
			})
		}
	}
}

/*
@params: slot_id, cue_visible, image, correct_index_choice, nonde,
truefalse, all_of_the_above, format, click_to_answer, type_index_to_answer, cue_target_reversal, reverse_truefalse, reverse_mc, format_chosen_by_user, help_chosen_by_user,
subject, synonyms, augs, related_terms, nonemc_choices, mc_choices, truefalse_target_shown, stem, alt_cues, start
@purpose: send a POST request to create a new trial. will need to use state of slot and previous trial (if any) to determine the displayed augs/format and cue
*/
export const NEW_TRIAL = 'NEW_TRIAL';
export const NEW_TRIAL_SUCCESS = 'NEW_TRIAL_SUCCESS';
export const NEW_TRIAL_FAILURE = 'NEW_TRIAL_FAILURE';
function willCreateNewTrial() {
	return {
		type: NEW_TRIAL
	}
}
var _default_trial = {
	slot_id: 0,
	cue_visible: '',
	image: '',
	correct_index_choice: '',
	none: false,
	truefalse: false,
	all_of_the_above: false, 
	format: '', 
	click_to_answer: false,
	type_index_to_answer: false,
	cue_target_reversal: false,
	reverse_truefalse: false,
	reverse_mc: false,
	format_chosen_by_user: false,
	help_chosen_by_user: false,
	subject: null,
	synonyms: null,
	augs: null,
	related_terms: null,
	nonemc_choices: null,
	mc_choices: null,
	truefalse_target_shown: null,
	stem: null,
	alt_cues: null,
	start: null
}
export function newTrial(trial) {
	return async(dispatch, getState) => {
		dispatch(willCreateNewTrial())
		try {
			let new_trial,
				current_slot = getState.learn.current_slot,
				s = new Date(),
			  	start = s.toISOString().replace("T", " ").replace("Z", "");
			if (trial.type == 'return') {
				new_trial = trial
			} else if (trial.type == (null || undefined)) {
				new_trial = Object.assign({..._default_trial}, {
					slot_id: current_slot['id'],
					cue_visible: current_slot['item']['cue'],
					format: 'recall',
					start: start
				})
			} else if (trial.type == 'adapt') {
				new_trial = Object.assign({...trial}, {
					format: trial.new_format,
					start: start
				})
			} else if (trial.type == 'hint') {
				new_trial = Object.assign({...trial}, {
					help_chosen_by_user: true,
					augs: trial.new_aug,
					start: start
				})
			}	
			await axios.post(`${api_url}/trials/`, {
				new_trial
			}).then(res => {
				let _trial = res.data;
				dispatch({type: NEW_TRIAL_SUCCESS, _trial})
			})
		} catch(err) {
			dispatch({
				type: NEW_TRIAL_FAILURE,
				error: Error(err)
			})
		}
	}
}

/* Helper for format / diff settings */
export const CHANGE_FORMAT = 'CHANGE_FORMAT';
function newFormat(last_trial, current_slot) {
	let working_obj;
	if(last_trial !== null) {
		working_obj = last_trial;
	} else {
		working_obj = current_slot;
	}
	let all_formats = ['gen', 'trans', 'recall', 'nonemc', 'mc', 'truefalse', 'stem', 'peek', 'copy'],
		current_formats = ['recall', 'mc', 'stem', 'copy'],
		current_index = current_formats.indexOf(working_obj['format']),
		next_index = current_index + 1;
	if (next_index >= 3) {
		next_index = 3
	}
	const new_format = current_formats['next_index'];
	dispatch({type: CHANGE_FORMAT, new_format})
	return new_format;
}

/* Helper for deciding which hint to show next */
export const NEW_HINT = 'NEW_HINT';
export const NEW_HINT_SUCCESS = 'NEW_HINT_SUCCESS';
export const NEW_HINT_FAILURE = 'NEW_HINT_FAILURE';
function willShowHint() {
	return { 
		type: NEW_HINT
	}
}
export function hint() {
	return (dispatch, getState) => {
		try {
			let current_trial = getState().learn.current_trial,
				augs = getState().learn.current_slot['augs'],
				recent_aug = current_trial['augs'][0],
				index = augs.indexOf(recent_aug),
				next_index = index + 1;
			if (next_index >= augs.length) {
				next_index = augs.length;
			}
			if (augs.length > 0 && recent_aug == undefined) {
				next_index = 0;
			}
			let new_aug = augs[next_index]
			current_trial['new_aug'] = new_aug;
			dispatch(newTrial(current_trial))
			dispatch({type: NEW_HINT_SUCCESS, new_aug})
		} catch(err) {
			dispatch({
				type: NEW_HINT_FAILURE,
				error: Error(err)
			})
		}
	}
}


/*
@params: 
@purpose: update the current trial, and either create new trial w/adapt or show correct
*/
export const UPDATE_TRIAL = 'UPDATE_TRIAL';
export const UPDATE_TRIAL_SUCCESS = 'UPDATE_TRIAL_SUCCESS';
export const UPDATE_TRIAL_FAILURE = 'UPDATE_TRIAL_FAILURE';
function willUpdateTrial() {
	return {
		type: UPDATE_TRIAL
	}
}
export function updateTrial(response) { // TODO: make sure to pass in object from component. use state to determine other variables. 
	return async(dispatch, getState) => {
		try {
			let current_trial = getState().learn.current_trial,
				trial_id = current_trial['id'];
			await axios.put(`${api_url}/trials/${trial_id}`, {
				reaction_time: response.reaction_time,
				response_time: response.response_time,
				answer: response.answer,
				answer_click: response.answer_clicked,
				answer_by_letter: response_answer_by_letter,
				taps: response.taps
			}).then(res => {
				let updated_trial = res.data;
				if(updated_trial.accuracy === 1) {
					dispatch(showCorrect())
					return;
				} 
				dispatch(adapt(updated_trial))
			})
		} catch(err) {
			dispatch({
				type: UPDATE_TRIAL_FAILURE,
				error: Error(err)
			})
		}
	}
}


/*
@params: 
@purpose: take the current state of learn and return a new trial with updated settings
*/
export const ADAPT = 'ADAPT';
export const ADAPT_SUCCESS = 'ADAPT_SUCCESS';
export const ADAPT_FAILURE = 'ADAPT_FAILURE';
function willAdapt() {
	return {
		type: ADAPT
	}
}
export function adapt(updated_trial) {
	return async(dispatch, getState) => {
		dispatch(willAdapt())
		try {
			let new_format = dispatch(newFormat(updated_trial))
			updated_trial['new_format'] = new_format
			dispatch(newTrial(updated_trial))
			dispatch({type: ADAPT_SUCCESS, new_format})
		} catch(err) {
			dispatch({
				type: ADAPT_FAILURE,
				error: Error(err)
			})
		}
	}
}

export const SHOW_FEEDBACK = 'SHOW_FEEDBACK'

export const SHOW_CORRECT = 'SHOW_CORRECT'
export const SHOW_COMPLETED_SEQUENCE = 'SHOW_COMPLETED_SEQUENCE'

export const SKIP = 'SKIP'
export const SKIP_SUCCESS = 'SKIP_SUCCESS'
export const SKIP_FAILURE = 'SKIP_FAILURE'

export const MOVE_SLOT = 'MOVE_SLOT'
export const MOVE_SLOT_SUCCESS = 'MOVE_SLOT_SUCCESS'
export const MOVE_SLOT_FAILURE = 'MOVE_SLOT_FAILURE'

export const CLEAR_LEARN = 'CLEAR_LEARN'








