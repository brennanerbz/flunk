import {
	LOAD_SETS,
	LOAD_SET
} from '../constants/learnset';

export function loadSets() {
	return {
		type: LOAD_SETS
	}
}

export function fetchSet() {
	return { 
		type: LOAD_SET 
	}
}