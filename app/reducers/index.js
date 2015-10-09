import { combineReducers } from 'redux';
import createset from './createset';
import sets from './usersets';
import learn from './learnmod';
import { routerStateReducer } from 'redux-router';

const reducers = combineReducers({
	sets,
	learn,	
	createset,
	router: routerStateReducer
});

export default reducers;
