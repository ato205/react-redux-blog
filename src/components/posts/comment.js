import React from 'react';
import PropTypes from 'prop-types';

const Comment = (props) => {
	const {comment} = props;
	return(
		<div className="comment">
			<div className="comment-user">{comment.user} 
				<span>{(typeof comment.createdAt != 'object') ? timeSince(comment.createdAt) + ' ago' : ''}</span>
			</div> 
			<p className="comment-body">{comment.message}</p> 
		</div>
	);
};

export default Comment;

Comment.propTypes ={
  comment: PropTypes.object.isRequired
};


function timeSince(date) {

  var seconds = Math.floor((new Date() - date) / 1000);

  var interval = Math.floor(seconds / 31536000);

  if (interval > 1) {
    return interval + " years";
  }
  interval = Math.floor(seconds / 2592000);
  if (interval > 1) {
    return interval + " months";
  }
  interval = Math.floor(seconds / 86400);
  if (interval > 1) {
    return interval + " days";
  }
  interval = Math.floor(seconds / 3600);
  if (interval > 1) {
    return interval + " hours";
  }
  interval = Math.floor(seconds / 60);
  if (interval > 1) {
    return interval + " minutes";
  }
  return Math.floor(seconds) + " seconds";
}