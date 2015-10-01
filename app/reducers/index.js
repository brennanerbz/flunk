import { combineReducers } from 'redux';
import createset from './createset';
import { routerStateReducer } from 'redux-router';

const reducers = combineReducers({	
	createset,
	router: routerStateReducer
});

export default reducers;
