import axios from 'axios';
import moment from 'moment';
import keyMirror from 'key-mirror';

const api_url = 'http://127.0.0.1:5000/webapi/v1.0';

// Call /sets/:id route with the params id passed in from React. Will be a function to run concurrently. This will return a set object, and from this set object, we will be able to  fill store. 

export const REQUEST_SET = 'REQUEST_SET';
export const RECEIVE_SET_SUCCESS = 'RECEIVE_SET_SUCCESS';
export const RECEIVE_SET_FAILURE = 'RECEIVE_SET_FAILURE';


// Call the /sets/:id/contents route with params id. This will be a function to run concurrently with request set, and request assignment. 
// Once the request for contents has been successful, .then fill the store with the content.

export const REQUEST_CONTENT = 'REQUEST_CONTENT';
export const RECEIVE_CONTENT_SUCCESS = 'RECEIVE_CONTENT_SUCCESS';
export const RECEIVE_CONTENT_FAILURE = 'RECEIVE_CONTENT_FAILURE';


//  Transform the request for content with .map, so for each content object, we call /items/:itemid. On the successful response of each of those, send a receive_item dispatch to store, which will append the incoming object to the items array. 
export const REQUEST_ITEM = 'REQUEST_ITEM';
export const RECEIVE_ITEM_SUCCESS = 'RECEIVE_ITEM_SUCCESS';
export const RECEIVE_ITEM_FAILURE = 'RECEIVE_ITEM_FAILURE';


// Again, concurrently, call the /assignments/user_id={val}&set_id={val}. Check to see if there is a response, and if there is any assignment, dispatch the corresponding object to the store. This will help fill in any progress, stats, and user_only settings. If there is no assignment, dispatch the viewing user has not studied, so we can make sure to create a new assignment upon learning. 
export const REQUEST_ASSIGNMENT = 'REQUEST_ASSIGNMENT';
export const RECEIVE_ASSIGNMENT_SUCCESS = 'RECEIVE_ASSIGNMENT_SUCCESS';
export const RECEIVE_ASSIGNMENT_FAILURE = 'RECEIVE_ASSIGNMENT_FAILURE';
export const HAS_NOT_STUDIED = 'HAS_NOT_STUDIED';


// Call a PUT to the  /assignments/user_id={val}&set_id={val} route with most likely settings changes. Also, TODO: make sure to use a PUT to assignment in learn mode for position. 
export const UPDATE_ASSIGNMENT_SUCCESS = 'UPDATE_ASSIGNMENT_SUCCESS';
export const UPDATE_ASSIGNMENT_FAILURE = 'UPDATE_ASSIGNMENT_FAILURE';


// Clear the set state upon leaving the view. 
export const CLEAR_SET_SUCCESS = 'CLEAR_SET_SUCCESS';
export const CLEAR_SET_FAILURE = 'CLEAR_SET_FAILURE';


