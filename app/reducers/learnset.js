import {
	LOAD_SETS,
	FETCH_SET,
	GET_SEQUENCES_SUCCESS,
	GET_SEQUENCES_FAILURE
} from '../constants/learnset';

let init_state = {
	set_list: [],
	set_items: {},
	set: {},
	sets: [
		{	id: 1,
			name: 'An Introduction to Computer Science',
			author: 'Brennan Erbeznik',
			last_studied: "2015-10-02 13:27:05.7000"
		},
		{
			id: 2,
			name: 'Functional Programming',
			author: 'Nathan Lomeli',
			last_studied: "2015-09-25 17:34:05.7000"
		}	
	],
	sequences: []
};


export default function sets(state = init_state, action) {
	switch(action.type) {
		case LOAD_SETS:
			const sets_obj = {};
			state.sets.forEach(set => { sets_obj[set.id] = set })
			return {
				...state,
				set_list: state.sets.map(set => set.id),
				set_items: sets_obj
			}
			
		case FETCH_SET:
			const set = state.set_items[action.id];
			return {
				...state,
				set: set
			}

		case GET_SEQUENCES_SUCCESS:
			console.log(action.sequences)
			return {
				...state,
				sequences: action.raw_seqs
			}
		case GET_SEQUENCES_FAILURE:
		default:
			return state;
	}
}






















