import { combineReducers } from 'redux';
import router from './router';
import posts from './posts';
import comments from './comments';

export default combineReducers({
	posts,
	comments,
	router
})