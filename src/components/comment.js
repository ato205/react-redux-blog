import React from 'react';

const Comment = (props) => {

	return(
		<div className="comment">
			<h6>{props.user}</h6>
			<p>{props.message}</p> 
		</div>
	);
};

export default Comment;