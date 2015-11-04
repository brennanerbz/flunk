import { combineReducers } from 'redux';
import createset from './createset';
import sets from './usersets';
import setView from './set';
import learn from './learnv2';
import profile from './profile';
import user from './user';
import { routerStateReducer } from 'redux-router';

const reducers = combineReducers({
	sets,
	setView,
	learn,	
	createset,
	profile,
	user,
	router: routerStateReducer
});

export default reducers;
