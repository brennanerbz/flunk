import { combineReducers } from 'redux';
import createset from './createset';
import sets from './learnset';
import { routerStateReducer } from 'redux-router';

const reducers = combineReducers({
	sets,	
	createset,
	router: routerStateReducer
});

export default reducers;
