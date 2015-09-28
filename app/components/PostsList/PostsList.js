import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

export default class Posts extends React.Component {
  static propTypes = {
    posts: PropTypes.array
  }

  render() {
    return ( 
      <div>
        {this.props.posts
          .map(post => {
            return (
              <div key={post.id}>
                <Link to={`/posts/${post.id}`}>
                  <h2>{post.title}</h2>
                </Link>
              </div>
            );
          })}
      </div>
    );
  }
}
