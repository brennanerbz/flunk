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



export function addRow() {
  return {
    type: ADD_ROW
  };
}

export function editRow(id, word, def) {
	return {
		type: EDIT_ROW,
		id,
		word,
		def
	}
}

export function deleteRow(id) {
	return {
		type: DELETE_ROW,
		id
	}
}

export function flipActiveSide() {
	return {
		type: FLIP_ACTIVESIDE
	}
}

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

export function activateRow(id) {
	return {
		type: ACTIVATE_ROW,
		id
	}
}

export function saveSet(){
	return {
		type: SAVE_SET
	}
}

export function setMousePos(id) {
	return {
		type: SET_MOUSE_POS,
		id
	}
}

export function resize() {
	return {
		type: RESIZE
	}
}

export function adjustScroll() {
	return {
		type: SCROLL
	}
}	