import { combineReducers } from 'redux';
import router from './router';
import posts from './posts';

export default combineReducers({
	posts,
	router
})