import axios from 'axios';
import moment from 'moment';
import keyMirror from 'key-mirror';

const api_url = 'http://127.0.0.1:5000/webapi/v1.0';

// * Sets * // 
export const REQUEST_SETS = 'REQUEST_SETS';
export const RECEIVE_SETS_SUCCESS = 'RECEIVE_SETS_SUCCESS';
export const RECEIVE_SETS_FAILURE = 'RECEIVE_SETS_FAILURE';

function requestSets() {
	return {
		type: REQUEST_SETS
	}
}

export function fetchSets() {
	return async(dispatch) => {
		dispatch(requestSets());
		try {
			let data = ( await axios.get(`${api_url}/sets`) ).data
			dispatch(receiveSets(data['sets']))
		} catch (err) {
			dispatch({
				type: RECEIVE_SETS_FAILURE,
				error: Error('Can\'t fetch sets')
			})
		}
	}
}

function receiveSets(data) {
	console.log(data)
	return {
		type: RECEIVE_SETS_SUCCESS,
		sets: data
	}
}

