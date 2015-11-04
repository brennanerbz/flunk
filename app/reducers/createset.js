import {
  CREATE_SET,
  CREATE_SET_SUCCESS,
  CREATE_SET_FAILURE,

  UPDATE_SET,
  UPDATE_SET_SUCCESS,
  UPDATE_SET_FAILURE,

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
	SCROLL
	
} from '../actions/createset';

import _ from 'lodash';
import assign from 'lodash/object/assign';

const createState = {
  isCreatingSet: false,
  isUpdatingSet: false,
  isCreatingItem: false,
  activeContext: true,
  set: null,
  title: '',
  id: null,
  purpose: '',
  subjects: null,
  creator_id: null,
  creator_username: '',
  associations: null,
  items: null,
  current_item: null,
  current_association: null,
  current_order_index: null,
  term_choices: null,
  def_choices: null,
  rows: [0, 1],
  
  /* Old State */
  activeRow: null,
  mousePos: 0,
  resizing: false,
  scrolling: false,
  terms: [
      {
        id: 1,
        word: '',
        def: '',
        // doc: Date.now()
      },
      {
        id: 2,
        word: '',
        def: '',
        // doc: Date.now()    
      }
    ]
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
      return {
        ...state,
        isUpdatingSet: false,
      }
    case CREATE_ITEM:
      return {
        ...state,
        isCreatingItem: true
      }
    case CREATE_ITEM_SUCCESS: 
      let items = state.items || {},
          item = action.item,
          assigned = {},
          id = item.id;
      items[id] = item;
      return {
        ...state,
        isCreatingItem: false,
        items: items
      }

    case ADD_ROW:
      const new_id = state.rows.slice(-1)[0] + 1
      state.rows.push(new_id)
      return {
        ...state,
        activeRow: new_id
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
        rows: state.rows.filter(_row => _row !== action.row)
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
    case CREATE_ITEM_FAILURE:
    case UPDATE_SET_FAILURE:
    case CREATE_SET_FAILURE:
    default:
      return state;
  }
}


