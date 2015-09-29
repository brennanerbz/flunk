import {
  FETCH_COMMENTS_SUCCESS,
  FETCH_COMMENT_SUCCESS,
  SAVE_COMMENT_SUCCESS
} from '../constants/actions';

export default (state = { list: [], items: {} }, action ) => {
	switch(action.type) {
		case FETCH_COMMENTS_SUCCESS:
			const list = action.comments.map(comment => comment.id)
			const items = {}
			action.comments.forEach(comment => { items[comment.id] = comment})
			return { list, items}
		case FETCH_COMMENT_SUCCESS:
			return {
				items: {
					...state.items,
					[action.comment.id]: action.comment
				},
				list: state.list
			}
		default: 
			return state;
	}
}