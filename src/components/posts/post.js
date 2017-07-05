import React from 'react';
import {Link} from 'react-router-dom';
import LinesEllipsis from 'react-lines-ellipsis'
import PropTypes from 'prop-types';

const Post = (props) => {
	const {post} = props;
	const date = new Date(post.createdAt);
	const formatedDate = date.toJSON();

	return(
		<div className="row">
			<div className="post col-sm-10 col-sm-offset-1 animated fadeIn">
				<div className="d-flex w-100 justify-content-between">
					<Link className="post-title" to={`/posts/${post.id}`}>{post.title}</Link>
				</div>
				<div className="post-content">
					<LinesEllipsis text={post.content} maxLine='2' ellipsis='...' trimRight />
				</div> 
				<div className="post-info">
					<i className="fa fa-calendar"></i>{formatedDate.slice(0, 10)}
				</div>
			</div>
		</div>
	);
};

export default Post;

Post.propTypes = {
	post: PropTypes.object.isRequired
};