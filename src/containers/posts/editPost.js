import React, {Component} from 'react';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {Link} from 'react-router-dom';
import {reduxForm} from 'redux-form';
import _ from 'lodash';
import {fetchPost, deletePost, editPost} from '../../actions/postAction';
import {validatePostForm as validate} from '../../components/forms';
import {showAlert} from '../../components/alert';
import PostForm from '../../components/postForm';
import Loader from '../../components/loader';

class EditPost extends Component {

	componentWillMount() {
		const {id} = this.props.match.params;
		this.props.fetchPost(id);
	}


	onDeletePost(id) {
		this.props.deletePost(id, () => {
			this.props.history.replace('/');
			showAlert('The post has been successfully deleted');
		});
	}

	onSubmit(values) {
		const {id} = this.props.post;
		this.props.editPost(id, values);
		this.props.history.goBack();
		showAlert('The post has been successfully saved');
	}

	renderButtons(post) {
		if (this.props.auth.uid === this.props.post.uid)
			return (<div className="top-buttons text-right">
						<Link 
							to={`/posts/${this.props.post.id}`} 
							className="btn btn-primary"><i className="fa fa-image"></i>View</Link>
						<button 
							className="btn btn-danger" 
							onClick={this.onDeletePost.bind(this, post.id)}><i className="fa fa-remove"></i>Delete</button>
					</div>);
	}

	render() {
		const {handleSubmit, post} = this.props;
		
		if (_.isEmpty(post))
			return <Loader />
		
		return (
			<div className="post-form">
				{this.renderButtons(post)}
				<PostForm onSubmit={handleSubmit(this.onSubmit.bind(this))} formType="edit" />
			</div>
		);
	}
}


function mapStateToProps(state) {
	return {
		post: state.post,
		auth: state.auth,
		initialValues: state.post
	}
}

function mapDispatchToProps(dispatch) {
	return {
		fetchPost: (id) => dispatch(fetchPost(id)),
		deletePost: (id, callback) => dispatch(deletePost(id, callback)),
		editPost: (id, post) => dispatch(editPost(id, post))
	}
}


export default compose(
		connect(mapStateToProps, mapDispatchToProps), 
		reduxForm({
			form: 'EditPostForm', 
			validate,
			enableReinitialize: true
		})
	)(EditPost);
