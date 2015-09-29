import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

export default class Comments extends Component {
	static propTypes = {
		comments: PropTypes.array
	}

	render(){
		const { comments } = this.props;
		return(
			<div>
				{comments.map(comment => 
					<Link to={`/comments/${comment.id}`}><p>{comment.name}</p></Link>
				)}
			</div>
		);
	}
}