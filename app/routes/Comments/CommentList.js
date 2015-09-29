import React, { Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import { fetchComments } from '../../actions/comments';
import Comments from '../../components/Comments/Comments';

@connect(state => ({
	comments: state.comments.list.map(id => state.comments.items[id])
})) 
export default class CommentList extends Component {
	static propTypes = {
		dispatch: PropTypes.func,
		comments: PropTypes.array
	}

	static fillStore(redux) {
		return redux.dispatch(fetchComments())
	}

	render() {
		return(
			<Comments comments={this.props.comments}/>
		);
	}
}
