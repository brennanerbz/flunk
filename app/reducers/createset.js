import {
	CREATE_SET,
	DELETE_SET,

	SAVE_SET,

	SAVE_TITLE,
	SAVE_PURPOSE,

	ADD_ROW,
	EDIT_ROW,
	DELETE_ROW,

	FLIP_ACTIVESIDE,
	ACTIVATE_ROW,

	SET_MOUSE_POST,
	RESIZE,
	SCROLL
	
} from '../constants/createset';

import _ from 'lodash';
import assign from 'lodash/object/assign';

const initialState = {
  activeContext: true,
  activeRow: 0,
  mousePos: 0,
  resizing: false,
  scrolling: false,
  title: '',
  purpose: '',
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

export default function terms(state = initialState, action) {
  switch (action.type) {

    case ADD_ROW:
      const newId = 2 + Number(_.uniqueId());
      return {
        ...state,
        activeRow: newId,
        terms: [...state.terms,
          {
            id: newId,
            word: '',
            def: '',
            // doc: Date.now()
          }
        ]
      }

    case EDIT_ROW:
      return {
        ...state,
        terms: state.terms.map((term) => {
          return term.id === action.id ?
            assign({}, term, {word: action.word, def: action.def}) :
            term
        })
      }

    case DELETE_ROW:
      return {
        ...state,
        terms: state.terms.filter(term => term.id !== action.id)
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
      // console.log("ID:" + action.id)
      return {
        ...state,
        activeRow: action.id
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
        mousePos: action.id
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

    default:
      return state;
  }
}


