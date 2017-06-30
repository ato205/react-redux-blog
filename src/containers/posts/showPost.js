import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {reduxForm, Field, Form} from 'redux-form';
import _ from 'lodash';
import {fetchPost, addComment} from '../../actions/postAction';
import {renderTextareaField} from '../../components/forms';
import PostView from '../../components/postView';
import Comment from '../../components/comment';
import Loader from '../../components/loader';

class ShowPost extends Component {

	componentDidMount() {
		const {id} = this.props.match.params;
		this.props.fetchPost(id);
	}

	onSubmitComment(values) {
		const comment = {
			user: this.props.auth.user,
			uid: this.props.auth.uid,
			message: values.comment,
		}
		this.props.addComment(comment, this.props.match.params.id);
	}

	renderCommentForm() {
		const {handleSubmit} = this.props;
		// if user is logged in
		if (this.props.auth.isAuthenticated) {

			return (
				<Form onSubmit={handleSubmit(this.onSubmitComment.bind(this))}>
					<Field 
						label="Comment"
						name="comment"
						rows="4"
						placeholder="Write your comment"
						component={renderTextareaField}
					/>
					<div className="bottom-button">
						<button type="submit" className="btn btn-primary">Submit</button>
					</div>
				</Form>
			);
		}
		else 
			return <b>Comments</b>;
	}

	renderComments() {
		const {comments} = this.props.post;
		return _.map(comments, (item, key) => {
			return <Comment user={item.user} message={item.message} key={key} />;
		});
	}


	renderButtons(post) {
		if (this.props.auth.uid === post.uid)
			return (<div className="form-buttons text-right">
						<Link to={`/posts/edit/${post.id}`} className="btn btn-primary"><i className="fa fa-edit"></i>Edit Post</Link>
					</div>);
	}

	render() {
		const {post} = this.props;

		if (_.isEmpty(post))  
			return <Loader />

		return (
			<div className="post-view">
				<div className="post-view-post">
				{this.renderButtons(post)}
				<PostView post={post} />
				</div>
				<div className="post-view-comment">
					{this.renderCommentForm()}

					<div className="comments">
						{this.renderComments()}
					</div>
				</div>

			</div>
		);	
	}
}


function mapStateToProps(state, ownProps) {
	return {
		post: state.post,
		auth: state.auth
	}
}

function mapDispatchToProps(dispatch) {
	return {
		fetchPost: (id) => dispatch(fetchPost(id)),
		addComment: (comment, postId) => dispatch(addComment(comment, postId))
	}
}

function validate(values) {
	const errors = {};
	if (!values.comment)
		errors.comment = 'Required'

	return errors;
}

export default reduxForm({
	form: 'CommentForm',
	validate
})(connect(mapStateToProps, mapDispatchToProps)(ShowPost));