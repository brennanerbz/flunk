import axios from 'axios';
import moment from 'moment'; 

const api_url = 'http://127.0.0.1:5000/webapi/v2.0';


// /sets/<int: set_id>/associations/
// /users/<int: user_id>/assignments/					GET
// /assignments/<int: assignment_id>	
export const FETCH_CREATE_SET = 'FETCH_CREATE_SET';
export function fetchSet(user_id, set_id) {
	return async(dispatch, getState) => {
		dispatch({type: FETCH_CREATE_SET})
		try {
			let set = {}, items = {}, associations = {}, rows = [],
			assignment = getState().sets.assignments.filter(assign => assign.set_id == set_id)[0]
			if(assignment == undefined) {
				setTimeout(() => {
					dispatch(fetchSet(user_id, set_id))
				}, 150)
			}
			await axios.get(`${api_url}/sets/${set_id}`).then(res => { 
				set = res.data 
			})
			await axios.get(`${api_url}/assignments/${assignment.id}`).then((res) => {
				assignment = res.data
			})
			assignment.set.associations.associations.forEach(asc => {
				items[asc.item_id] = asc.item
				associations[asc.id] = asc
				rows.push(asc.id)
			})
			dispatch({type: LOAD_EDITING_SUCCESS, set, assignment, items, associations, rows})
			// console.log(set, assignment, items, associations, rows)
		} catch(err) {
			dispatch({
				type: LOAD_EDITING_FAILURE,
				error: Error(err)
			})
		}
	}
}


/*
---Load the transfer state if editing ----
*/
export const LOAD_EDITING = 'LOAD_EDITING';
export const LOAD_EDITING_SUCCESS = 'LOAD_EDITING_SUCCESS';
export const LOAD_EDITING_FAILURE = 'LOAD_EDITING_FAILURE';
export function loadEditing(set_id) {
	return async(dispatch, getState) => {
		dispatch({ type: LOAD_EDITING })
		try {
			let transferState = getState().transfer,
				user = getState().user.user,
				set, assignment, items = {}, associations = {}, rows = [];
			console.log(transferState)
			if(transferState.set !== null) {
				set = transferState.set
				assignment = transferState.assignment
				transferState.associations.forEach(asc => {
					items[asc.item_id] = asc.item
					associations[asc.id] = asc
					rows.push(asc.id)
				})
				dispatch({ type: LOAD_EDITING_SUCCESS, set, assignment, items, associations, rows })
			} else {
				dispatch(fetchSet(user.id, set_id))
			}	
		} catch(err) {
			dispatch({
				type: LOAD_EDITING_FAILURE,
				error: Error(err)
			})
		}
	}
}



/*
@params: { 	

'parent_id':  Integer,
'creator_id':  Integer,
'source_id':  Integer,
‘targets_lang_id’: Integer,
‘cues_lang_id’: Integer,
'title':  String,
'description':  String,
‘has_images’: Boolean,
'official':  Integer,
'visibility':  String,			‘public’ | ‘private’
‘editability’: String,			‘group’ | ‘admin’ | ‘creator’

}
*/
var _settemplate = {
	parent_id: null,
	creator_id: null,
	source_id: null,
	targets_lang_id: null,
	cues_lang_id: null,
	title: null,
	description: null,
	has_images: false,
	official: null,
	visibility: 'public',
	editability: 'creator'
}

export const CREATE_SET = 'CREATE_SET';
export const CREATE_SET_SUCCESS = 'CREATE_SET_SUCCESS';
export const CREATE_SET_FAILURE = 'CREATE_SET_FAILURE';
export function createSet(title, ...args) {
	return async(dispatch, getState) => {
		dispatch({type: CREATE_SET})
		try {
			// TODO: check the method its being called whether from create page or copy
			let user = getState().user.user,
				set = Object.assign({..._settemplate}, {
					creator_id: user.id,
					title: title || 'Untitled'
				})
			if(args.length > 0) {
				for(var i = 0; i < args.length; i++) {
					let arg = args[i],
						name = arg.name,
						prop = arg.prop;
					if(set.hasOwnProperty(name)) {
						set[name] = prop
					}
				}
			}
			await axios.post(`${api_url}/sets/`, 
				set
			)
			.then(res => set = res.data)
			dispatch({type: CREATE_SET_SUCCESS, set})
			if(set.title !== 'Untitled') {
				dispatch(updateSetSubjects())
			}
		} catch(err) {
			dispatch({
				type: CREATE_SET_FAILURE,
				error: Error(err),
				typeerr: err
			})
		}
	}
}


/*
@params:
	
'source_id':  Integer,
‘targets_lang_id’: Integer,
‘cues_lang_id’: Integer,
'title':  String,
'description':  String,
‘has_images’: Boolean,
'official':  Integer,
'visibility':  String,			‘public’ | ‘private’
‘editability’: String,			‘group’ | ‘admin’ | ‘creator’

*/
export const UPDATE_SET = 'UPDATE_SET';
export const UPDATE_SET_SUCCESS = 'UPDATE_SET_SUCCESS';
export const UPDATE_SET_FAILURE = 'UPDATE_SET_FAILURE';
export function updateSet(_set, ...args) {
	return async(dispatch, getState) => {
		dispatch({type: UPDATE_SET})
		try {
			let set = Object.assign({}, _set);
			if(args !== null && args.length > 0) {
				for(var i = 0; i < args.length; i++) {
					let arg = args[i],
						name = arg.name,
						prop = arg.prop;
					if(set.hasOwnProperty(name)) {
						set[name] = prop
					}
				}
			}
			await axios.put(`${api_url}/sets/${set.id}`, 
				set 
			)
			.then(res => set = res.data)
			dispatch({type: UPDATE_SET_SUCCESS, set})
			if(set.title !== 'Untitled') {
				dispatch(updateSetSubjects())
			}
		} catch(err) {
			dispatch({
				type: UPDATE_SET_FAILURE,
				error: Error(err)
			})
		}
	}
}
export const UPDATE_SETSUBJECTS_SUCCESS = 'UPDATE_SETSUBJECTS_SUCCESS';
export const UPDATE_SETSUBJECTS_FAILURE = 'UPDATE_SETSUBJECTS_FAILURE';
export function updateSetSubjects(subjects) {
	return async(dispatch, getState) => {
		dispatch({type: UPDATE_SET})
		try {
			var subs,
				set = getState().createset.set;
			if(subjects !== undefined) {
				subs = subjects;
				await axios.put(`${api_url}/sets/${set.id}/edit-subjects/`, subs)
				.then((res) => subs = res.data.subjects)
				dispatch({ type: UPDATE_SETSUBJECTS_SUCCESS, subs })
				return;
			}
			await axios.put(`${api_url}/sets/${set.id}/subjects/`)
			.then((res) => subs = res.data.subjects)
			dispatch({type: UPDATE_SETSUBJECTS_SUCCESS, subs})
		} catch(err) {
			dispatch({
				type: UPDATE_SETSUBJECTS_FAILURE,
				error: Error(err)
			})
		}
	}
}



/*
@params: 

'user_id':  Integer,  ** required
'set_id':  Integer, ** required
‘new_sequence_difficulty’: String,	‘beginner’ | ‘novice’ | ‘intermediate’ | ‘advanced’ | ‘expert’ | ‘master’
‘starred’: Boolean,
‘deadline’: String,
‘wallpaper’: String,
‘permission’: String,			‘admin’ | ‘nonadmin’
‘privacy’: String,			‘public’ | ‘group’ | ‘private’

*/
var _assignmenttemplate = {
	user_id: null,
	set_id: null,
	new_sequence_difficulty: 'intermediate',
	starred: false,
	deadline: null,
	wallpaper: null,
	permission: 'nonadmin',
	privacy: 'public'
}
export const CREATE_ASSIGNMENT = 'CREATE_ASSIGNMENT';
export const CREATE_ASSIGNMENT_SUCCESS = 'CREATE_ASSIGNMENT_SUCCESS';
export const CREATE_ASSIGNMENT_FAILURE = 'CREATE_ASSIGNMENT_FAILURE';
export function createAssignment(set_id, permission) {
	return async(dispatch, getState) => {
		dispatch({type: CREATE_ASSIGNMENT})
		try {
			let user_id = getState().user.user.id,
				assignment = Object.assign({..._assignmenttemplate}, {
					user_id: user_id,
					set_id: set_id,
					permission: permission || 'nonadmin'
				}) 
			await axios.post(`${api_url}/assignments/`, 
				assignment
			)
			.then(res => assignment = res.data)
			dispatch({type: CREATE_ASSIGNMENT_SUCCESS, assignment})
		} catch(err) {
			dispatch({
				type: CREATE_ASSIGNMENT_FAILURE,
				error: Error(err)
			})
		}
	}
}


/*

‘new_sequence_difficulty’: String,	‘beginner’ | ‘novice’ | ‘intermediate’ | ‘advanced’ | ‘expert’ | ‘master’
‘starred’: Boolean,
‘deadline’: String,
‘wallpaper’: String,
‘permission’: String,			‘admin’ | ‘nonadmin’
‘privacy’: String,			‘public’ | ‘group’ | ‘private’

*/
export const UPDATE_ASSIGNMENT = 'UPDATE_ASSIGNMENT';
export const UPDATE_ASSIGNMENT_SUCCESS = 'UPDATE_ASSIGNMENT_SUCCESS';
export const UPDATE_ASSIGNMENT_FAILURE = 'UPDATE_ASSIGNMENT_FAILURE';
export function updateAssignment(...args) {
	return async(dispatch, getState) => {
		dispatch({type: UPDATE_ASSIGNMENT})
		try {
			let assignment = getState().createset.assignment;
			if(args.length > 0) {
				for(var i = 0; i < args.length; i++) {
					let arg = args[i],
						name = arg.name,
						prop = arg.prop;
					if(assignment.hasOwnProperty(name)) {
						assignment[name] = prop
					}
				}
			}
			await axios.put(`${api_url}/assignments/${assignment.id}`, 
				assignment
			)
			.then(res => assignment = res.data)
			dispatch({type: UPDATE_ASSIGNMENT_SUCCESS, assignment})
		} catch(err) {
			dispatch({
				type: UPDATE_ASSIGNMENT_FAILURE,
				error: Error(err)
			})
		}
	}
}

/*
@params:
?target=String &subjects="list1|list2"	
*/
export const GET_TERM_SUGGESTIONS = 'GET_TERM_SUGGESTIONS';
export const TERM_SUGGESTIONS_SUCCESS = 'TERM_SUGGESTIONS_SUCCESS';
export const TERM_SUGGESTIONS_FAILURE = 'TERM_SUGGESTIONS_FAILURE';
export function getTermSuggestions(value) {
	return async(dispatch, getState) => {
		dispatch({type: GET_TERM_SUGGESTIONS})
		try {
			let terms,
				subjects = [],
				subs = getState().createset.subjects;
			if(value.length === 0) return;
			if(subs == undefined || subs.length === 0) {
				return;
			}
			subs.forEach(sub => subjects.push(sub.name))
			subjects.join("|")
			await axios.get(`${api_url}/terms/?search=${value}&subjects=${subjects}`)
		    .then(res => terms = res.data.terms)
			dispatch({type: TERM_SUGGESTIONS_SUCCESS, terms})
		} catch(err) {
			dispatch({
				type: TERM_SUGGESTIONS_FAILURE,
				error: Error(err)
			})
		}
	}
}

/*
@params:
?target=String &subjects="list1|list2"	
*/
export const GET_DEF_SUGGESTIONS = 'GET_DEF_SUGGESTIONS';
export const DEF_SUGGESTIONS_SUCCESS = 'DEF_SUGGESTIONS_SUCCESS';
export const DEF_SUGGESTIONS_FAILURE = 'DEF_SUGGESTIONS_FAILURE';
export function getDefSuggestions(id, target) {
	return async(dispatch, getState) => {
		dispatch({type: GET_DEF_SUGGESTIONS})
		try {
			let items,
				term,
				subjects = [],
				subs = getState().createset.subjects,
				def_choices = getState().createset.def_choices;
			if(subs == undefined || subs.length === 0) return;
			if(id == null) {
				term = target
			} else {
				term = getState().createset.items[id].target
			}
			term = term.toLowerCase().trim()
			subs.forEach(sub => subjects.push(sub.name))
			subjects = subjects.join("|")
			await axios.get(`${api_url}/items/?target=${term}&subjects=${subjects}`)
			.then(res => items = res.data.items)
			dispatch({type: DEF_SUGGESTIONS_SUCCESS, items})
		} catch(err) {
			dispatch({
				type: DEF_SUGGESTIONS_FAILURE,
				error: Error(err)
			})
		}
	}
}
export const CLEAR_DEF_CHOICES = 'CLEAR_DEF_CHOICES';
export function clearDefChoices() {
  return {
    type: CLEAR_DEF_CHOICES
  };
}

/*

‘parent_id’: Integer,
‘creator_id’: Integer, **required
‘target_lang_id’: Integer,
‘cue_lang_id’: Integer,
‘target’: String,
‘cue’: String,
‘synonyms’: String,
‘image’: String,
‘message’: String,
‘official’: Boolean,
‘visibility’: String,		‘public’ | ‘private’

*/

var _itemtemplate = {
	parent_id: null,
	creator_id: null,
	targets_lang_id: null,
	cues_lang_id: null,
	target: null,
	cue: null,
	synonyms: null,
	image: null,
	message: null,
	official: false,
	visibility: 'public'
}
export const CREATE_ITEM = 'CREATE_ITEM';
export const CREATE_ITEM_SUCCESS = 'CREATE_ITEM_SUCCESS';
export const CREATE_ITEM_FAILURE = 'CREATE_ITEM_FAILURE';
export function createItem(index, ...args) {
	return async(dispatch, getState) => {
		dispatch({type: CREATE_ITEM})
		try {                                                                                                            
			let item = _itemtemplate,
				user = getState().user.user,
				set  = getState().createset.set,
				rows = getState().createset.rows,
				id,
				association;

			if(set == undefined) {
				await dispatch(createSet())
				setTimeout(() => {
					dispatch(createItem(index, ...args))
				}, 5)
				return; 
			}

			if(args.length > 0) {
				for(var i = 0; i < args.length; i++) {
					let arg = args[i],
						name = arg.name,
						prop = arg.prop;
					if(name == 'child') {
						association = getState().createset.associations[rows[index]]
						item = Object.assign({...item}, {
							parent_id: prop.id,
							target: prop.target,
							cue: prop.cue,
							synonyms: prop.synonyms !== null ? prop.synonyms.join("|") : null,
							image: prop.image,
							message: prop.message,
							visibility: prop.visibility
						})
					}
					if(item.hasOwnProperty(name)) {
						item[name] = prop
					}
				}
			}
			item.creator_id = user.id
			await axios.post(`${api_url}/items/`, item)
			.then(res => item = res.data)
			if(association == undefined) {
				await dispatch({type: CREATE_ITEM_SUCCESS, item})
				await dispatch(createAssociation(item.id, index))
			} else {
				await dispatch(updateAssociation(association, 
												{name: 'item', prop: item}, 
												{name: 'item_id', prop: item.id}))
			}
			if(item.target !== null) {
				await dispatch(getDefSuggestions(null, item.target))
			}
		} catch(err) {
			dispatch({
				type: CREATE_ITEM_FAILURE,
				error: Error(err)
			})
		}
	}
}

// createItem(index, {name: 'child', prop: item}, {name: 'cue', prop: def})

/*

@params:
‘target_lang_id’: Integer,
‘cue_lang_id’: Integer,
‘target’: String,
‘cue’: String,
‘synonyms’: String,
‘image’: String,
‘message’: String,
‘official’: Boolean,
‘visibility’: String, ‘public’ | ‘private’

*/
export const UPDATE_ITEM = 'UPDATE_ITEM';
export const UPDATE_ITEM_SUCCESS = 'UPDATE_ITEM_SUCCESS';
export const UPDATE_ITEM_FAILURE = 'UPDATE_ITEM_FAILURE';
export function updateItem(_item, ...args) {
	return async(dispatch, getState) => {
		dispatch({type: UPDATE_ITEM})
		try {
			let item = Object.assign({}, _item)
			if(args.length > 0) {
				for(var i = 0; i < args.length; i++) {
					let arg = args[i],
						name = arg.name,
						prop = arg.prop;
					if(item.hasOwnProperty(name)) {
						item[name] = prop
					}
				}
			}
			await axios.put(`${api_url}/items/${item.id}`, item)
			.then(res => item = res.data)
			dispatch({type: UPDATE_ITEM_SUCCESS, item})
			dispatch(updateSetSubjects())
		} catch(err) {
			dispatch({
				type: UPDATE_ITEM_FAILURE,
				error: Error(err)
			})
		}
	}
}


/*
@params:

'set_id':  Integer, **required
'item_id':  Integer, **required
'order':  Integer
‘message’: String,
‘has_image’: Boolean

*/
var _associationtemplate = {
	set_id: null,
	item_id: null,
	order: null,
	message: null,
	has_image: false
}
export const CREATE_ASSOCIATION = 'CREATE_ASSOCIATION';
export const CREATE_ASSOCIATION_SUCCESS = 'CREATE_ASSOCIATION_SUCCESS';
export const CREATE_ASSOCIATION_FAILURE = 'CREATE_ASSOCIATION_FAILURE';
export function createAssociation(item_id, index) {
	return async(dispatch, getState) => {
		try {
			let set_id = getState().createset.set.id,
				count = getState().createset.count,
				association;
			association = Object.assign({..._associationtemplate}, {
				item_id: item_id,
				set_id: set_id,
				order: count
			})
			await axios.post(`${api_url}/associations/`, association)
			.then(res => association = res.data)
			dispatch({type: CREATE_ASSOCIATION_SUCCESS, association, index})
			dispatch(updateSetSubjects())
		} catch(err) {
			dispatch({
				type: CREATE_ASSOCIATION_FAILURE,
				error: Error(err)
			})
		}
	}
}

/*
@params: 

'order':  Integer
‘message’: String,
‘has_image’: Boolean

*/
export const UPDATE_ASSOCIATION = 'UPDATE_ASSOCIATION';
export const UPDATE_ASSOCIATION_SUCCESS = 'UPDATE_ASSOCIATION_SUCCESS';
export const UPDATE_ASSOCIATION_FAILURE = 'UPDATE_ASSOCIATION_FAILURE';
export function updateAssociation(asc, ...args) {
	return async(dispatch, getState) => {
		try {
			let association = Object.assign({}, asc),
				adopted = false;
			if(args.length > 0) {
				for(var i = 0; i < args.length; i++) {
					let arg = args[i],
						name = arg.name,
						prop = arg.prop;
					if(name == 'adopted') {
						adopted = true;
					}
					if(association.hasOwnProperty(name)) {
						association[name] = prop
					}
				}
			}
			await axios.put(`${api_url}/associations/${association.id}`, association)
			.then(res => association = res.data)
			dispatch({type: UPDATE_ASSOCIATION_SUCCESS, association, adopted})
		} catch(err) {
			dispatch({
				type: UPDATE_ASSOCIATION_FAILURE,
				error: Error(err)
			})
		}
	}
}

export const SET_FLAG = 'SET_FLAG';
export function setFlag(flag) {
	return {
		type: SET_FLAG,
		flag
	}
}

export const TITLE_FLAG = 'TITLE_FLAG';
export function setTitleFlag(flag) {
	return {
		type: TITLE_FLAG,
		flag
	}
}

export const CLEAR_SET = 'CLEAR_SET';
export function clearSet() {
	return {
		type: CLEAR_SET
	}
}

export const ADD_ROW = 'ADD_ROW'
export function addRow() {
  return {
    type: ADD_ROW
  };
}

export const DELETE_ROW = 'DELETE_ROW'
export function deleteRow(index) {
	return {
		type: DELETE_ROW,
		index
	}
}

export const FLIP_ACTIVESIDE = 'FLIP_ACTIVESIDE'
export function flipActiveSide() {
	return {
		type: FLIP_ACTIVESIDE
	}
}

export const SAVE_TITLE = 'SAVE_TITLE'
export function saveTitle(title) {
	return {
		type: SAVE_TITLE,
		title
	}
}

export function savePurpose(purpose) {
	return {
		type: SAVE_PURPOSE,
		purpose
	}
}

export const ACTIVATE_ROW = 'ACTIVATE_ROW'
export function activateRow(index) {
	return {
		type: ACTIVATE_ROW,
		index
	}
}

export const SAVE_SET = 'SAVE_SET'
export function saveSet(){
	return {
		type: SAVE_SET
	}
}

export const SET_MOUSE_POS = 'SET_MOUSE_POS'
export function setMousePos(index) {
	return {
		type: SET_MOUSE_POS,
		index
	}
}

export const RESIZE = 'RESIZE'
export function resize() {
	return {
		type: RESIZE
	}
}

export const SCROLL = 'SCROLL'
export function adjustScroll() {
	return {
		type: SCROLL
	}
}