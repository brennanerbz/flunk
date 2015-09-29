import React, { Component, PropTypes } from 'react';

export default class SinglePost extends Component {
	static propTypes = {
		post: PropTypes.object
	}

	render() {
		const { post } = this.props;
		if (!post) return null;
		return(
			<div>
				<h1>{post.title}</h1>
				<p>{post.content}</p>
				<small>written by {post.userId}</small>
			</div>
		);
	}
}