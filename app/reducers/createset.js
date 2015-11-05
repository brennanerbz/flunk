import {
  CREATE_SET,
  CREATE_SET_SUCCESS,
  CREATE_SET_FAILURE,

  UPDATE_SET,
  UPDATE_SET_SUCCESS,
  UPDATE_SET_FAILURE,

  UPDATE_SETSUBJECTS_SUCCESS,
  UPDATE_SETSUBJECTS_FAILURE,

  CREATE_ASSIGNMENT,
  CREATE_ASSIGNMENT_SUCCESS,
  CREATE_ASSIGNMENT_FAILURE,

  UPDATE_ASSIGNMENT,
  UPDATE_ASSIGNMENT_SUCCESS,
  UPDATE_ASSIGNMENT_FAILURE,

  GET_TERM_SUGGESTIONS,
  TERM_SUGGESTIONS_SUCCESS,
  TERM_SUGGESTIONS_FAILURE,

  GET_DEF_SUGGESTIONS,
  DEF_SUGGESTIONS_SUCCESS,
  DEF_SUGGESTIONS_FAILURE,

  CREATE_ITEM,
  CREATE_ITEM_SUCCESS,
  CREATE_ITEM_FAILURE,

  UPDATE_ITEM,
  UPDATE_ITEM_SUCCESS,
  UPDATE_ITEM_FAILURE,

  CREATE_ASSOCIATION,
  CREATE_ASSOCIATION_SUCCESS,
  CREATE_ASSOCIATION_FAILURE,

  UPDATE_ASSOCIATION,
  UPDATE_ASSOCIATION_SUCCESS,
  UPDATE_ASSOCIATION_FAILURE,
	SAVE_SET,

	SAVE_TITLE,
	SAVE_PURPOSE,

	ADD_ROW,
	EDIT_ROW,
	DELETE_ROW,

	FLIP_ACTIVESIDE,
	ACTIVATE_ROW,

	SET_MOUSE_POS,
	RESIZE,
	SCROLL,

  CLEAR_SET,

  SET_FLAG,
  TITLE_FLAG
	
} from '../actions/createset';

import _ from 'lodash';
import assign from 'lodash/object/assign';

var createState = {
  isCreatingSet: false,
  isUpdatingSet: false,
  isCreatingItem: false,
  activeContext: true,
  set: null,
  title: '',
  id: null,
  purpose: '',
  subjects: [],
  creator_id: null,
  creator_username: '',
  associations: [],
  items: null,
  current_item: null,
  current_association: null,
  current_order_index: null,
  term_choices: null,
  def_choices: null,
  rows: [0, 1],
  flag: false,
  title_flag: false,
  /* Old State */
  activeRow: null,
  mousePos: 0,
  resizing: false,
  scrolling: false,

};

export default function createset(state = createState, action) {
  switch (action.type) {

    case CREATE_SET:
      return {
        ...state,
        isCreatingSet: true
      }
    case CREATE_SET_SUCCESS:
      let set = action.set
      return {
        ...state,
        isCreatingSet: false,
        set: set,
        id: set.id,
        title: set.title,
        creator_id: set.creator_id,
        creator_username: set.creator.username,
        subjects: set.subjects !== undefined ? set.subjects : null
      }
    case UPDATE_SET:
      return {
        ...state,
        isUpdatingSet: true
      }
    case UPDATE_SET_SUCCESS: 
      let updated_set = action.set;
      return {
        ...state,
        isUpdatingSet: false,
        set: updated_set,
        title: updated_set.title,
        purpose: updated_set.description,
        subjects: updated_set.subjects
      }
    case UPDATE_SETSUBJECTS_SUCCESS:
      return {
        ...state,
        subjects: action.subs,
        set: Object.assign({...state.set}, {subjects: action.subs})
      }
    case CREATE_ITEM:
      return {
        ...state,
        isCreatingItem: true
      }
    case CREATE_ITEM_SUCCESS: 
      let items = state.items || {},
          item = action.item,
          id = item.id;
      items[id] = item;
      return {
        ...state,
        isCreatingItem: false,
        items: items
      }
    case CREATE_ASSOCIATION_SUCCESS:
      let association = action.association,
          associations = state.associations;
      associations.push(association)
      return {
        ...state,
        associations: associations
      }
    case UPDATE_ITEM_SUCCESS:
      let _items = state.items,
          _newitem = action.item,
          _id = _newitem.id
      _items[_id] = _newitem
      return {
        ...state,
        items: _items
      }
    case TERM_SUGGESTIONS_SUCCESS:
      return {
        ...state,
        term_choices: action.terms
      }
    case ADD_ROW:
      const new_id = state.rows.slice(-1)[0] + 1,
            rows = state.rows;
      rows.push(new_id)
      return {
        ...state,
        activeRow: new_id,
        rows: rows
      }
    case SET_FLAG: 
      return {
        ...state,
        flag: action.flag
      }
    case TITLE_FLAG:
      return {
        ...state,
        title_flag: action.flag
      }

    case EDIT_ROW:
      return {
        ...state,
        rows: state.rows.map((_row) => {
          return _row == action.row
          ? action.row
          : _row
        })
      }

    case DELETE_ROW:
      return {
        ...state,
        rows: state.rows.filter(_row => _row !== action.row),
        // activeRow: state.rows.splice(-1)[0]
      }

    case FLIP_ACTIVESIDE:
      const active = state.activeContext;
      return {
        ...state,
        activeContext: !active
      }

    case SAVE_TITLE:
      return {
        ...state,
        title: action.title
      }

    case SAVE_PURPOSE:
      return {
        ...state,
        purpose: action.purpose
      }

    case ACTIVATE_ROW:
      
      return {
        ...state,
        activeRow: action.row
        // flag: action.row == null ? false : state.flag
      }
      
    case SAVE_SET:
      const terms = JSON.stringify(state.terms, null, 2)
      alert(
        "Title:" + state.title + "\n" + 
        "Purpose:" + state.purpose + "\n" + 
        "Items:" + terms
        );
      return state;

    case SET_MOUSE_POS:
      return {
        ...state,
        mousePos: action.row
      }
    case RESIZE:
      return {
        ...state,
        resizing: !state.resizing
      }
    case SCROLL:
      return {
        ...state,
        scrolling: !state.scrolling
      }
    case CLEAR_SET:
      return {
        ...state = createState
      }
    case TERM_SUGGESTIONS_FAILURE:
    case UPDATE_SETSUBJECTS_FAILURE:
    case UPDATE_ITEM_FAILURE:
    case CREATE_ASSOCIATION_FAILURE:
    case CREATE_ITEM_FAILURE:
    case UPDATE_SET_FAILURE:
    case CREATE_SET_FAILURE:
    default:
      return state;
  }
}


