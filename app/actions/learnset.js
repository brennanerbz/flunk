import {
	LOAD_SETS,
	FETCH_SET
} from '../constants/learnset';

export function loadSets() {
	return {
		type: LOAD_SETS
	}
}

export function fetchSet(id) {
	return {
		type: FETCH_SET,
		id
	}
}
