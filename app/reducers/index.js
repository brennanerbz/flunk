import { combineReducers } from 'redux';
import createset from './createset';
import sets from './usersets';
import set from './set';
import learn from './learnv2';
import { routerStateReducer } from 'redux-router';

const reducers = combineReducers({
	sets,
	set,
	learn,	
	createset,
	router: routerStateReducer
});

export default reducers;
