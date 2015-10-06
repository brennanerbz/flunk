import {
	LOAD_SETS,
	FETCH_SET
} from '../constants/learnset';

const sets_state = {
	set_list: [
		{	id: 0,
			name: 'An Introduction to Computer Science',
			author: 'Brennan Erbeznik',
			last_studied: "2015-10-02 13:27:05.7000"
		},
		{
			id: 1,
			name: 'Functional Programming',
			author: 'Nathan Lomeli',
			last_studied: "2015-09-25 17:34:05.7000"
		},
		{
			id: 2,
			name: 'React.js Essentials',
			author: 'Benjamin Franklin',
			last_studied: "2015-08-01 09:34:05.7000"
		},
		{
			id: 3,
			name: 'Redux & React basics',
			author: 'Larry Page',
			last_studied: "2015-10-01 11:34:05.7000"
		}		
	]
};

export default function sets(state = { list: [], items: {}, set: {} }, action) {
	switch(action.type) {
		case LOAD_SETS:
			const list = sets_state.set_list.map(set => set.id)
			const items = {}
			sets_state.set_list.forEach(set => { items[set.id] = set})
			return { list, items }	
		case FETCH_SET:
			const set = state.items[action.id];
			return {
				list: state.list,
				items: state.items,
				set
			}		
		default:
			return state;
	}
}