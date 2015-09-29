import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchComment } from '../../actions/comments';

import Comment from '../../components/Comment/Comment';

@connect(state => ({
	comments: state.comments.items
}))
export default class CommentView extends Component {
	static propTypes = {
		dispatch: PropTypes.func,
		params: PropTypes.object,
		comments: PropTypes.object
	}

	static fillStore(redux, props) {
		return redux.dispatch(fetchComment(props.params.id))
	}

	render() {
		const comment = this.props.comments[this.props.params.id];

		return(
			comment
			? <Comment comment={comment}/>
			: null
		);
	}
}