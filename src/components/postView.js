import React from 'react';

const PostView = (props) => {
	const {post} = props;
	const date = new Date(post.createdAt);
	const formatedDate = date.toJSON();
	return (
		<div className="post-detail">
			<h2 className="post-title">{post.title}</h2>
			<div className="post-creation-time">
				<i className="fa fa-calendar"></i>
				Created on {formatedDate.slice(0, 10)}
			</div>
			<div className="post-creator">
				<i className="fa fa-user-o"></i>{post.user}
			</div>
			<p className="post-content">{post.content}</p>
		</div>
	);
}

export default PostView;