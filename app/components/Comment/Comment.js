import React, { Component, PropTypes } from 'react';

export default class CommentView extends Component {
	static propTypes = {
		comment: PropTypes.object
	}

	render() {
		const { comment } = this.props;
		if (!comment) { return null; }
		return(
			<div>
				<h1>{comment.title}</h1>
				<h4>By {comment.email}</h4>
				<p>{comment.body}</p>
			</div>
		);
	}
}