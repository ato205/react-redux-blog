import React from 'react';
import {Link} from 'react-router-dom';
import LinesEllipsis from 'react-lines-ellipsis'

const Post = (props) => {
	const {id, title, content} = props;

	return(
		<div className="row">
		<div className="list-group-item post col-sm-10 col-sm-offset-1 animated fadeIn">
			<div className="d-flex w-100 justify-content-between">
				<Link className="post-title" to={`/posts/${id}`}><h3>{title}</h3></Link>
			</div>
			<div className="post-content">
				<LinesEllipsis text={content} maxLine='2' ellipsis='...' trimRight />
			</div> 
		</div>
		</div>
	);
};

export default Post;