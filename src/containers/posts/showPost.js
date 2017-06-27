import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {reduxForm} from 'redux-form';
import _ from 'lodash';
import {fetchPost} from '../../actions/postAction';
import {validatePostForm as validate} from '../../components/form';
import PostView from '../../components/postView';
import Loader from '../../components/loader';

class ShowPost extends Component {

	componentDidMount() {
		const {id} = this.props.match.params;
		this.props.fetchPost(id);
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
				{this.renderButtons(post)}
				<PostView post={post} />
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
		fetchPost: (id) => dispatch(fetchPost(id))
	}
}

export default reduxForm({
	form: 'ShowPostForm',
	validate
})(connect(mapStateToProps, mapDispatchToProps)(ShowPost));









// import React, {Component} from 'react';
// import {connect} from 'react-redux';
// import {Field, reduxForm, Form } from 'redux-form';
// import {fetchPost, deletePost, editPost} from '../../actions/postAction';
// import {renderInputField, renderTextareaField, validatePostForm as validate, renderPostForm} from '../../components/form';
// import {showAlert} from '../../components/alert';

// class ShowPost extends Component {

// 	constructor(props) {
// 		super(props);
// 		this.state = {editing: false};
// 		this.onCancelEdit.bind(this);
// 	}

// 	componentWillMount() {
// 		const {id} = this.props.match.params;
// 		// if (this.props.posts.hasOwnProperty(id)) {
// 			this.props.fetchPost(id);
// 		// }
// 	}

// 	onEditPost() {
// 		const {post} = this.props;
// 		this.setState({editing: true});
// 		// assign post title and content to Form input values
// 		this.props.initialize({title: post.title, content: post.content});
// 	}

// 	onDeletePost(id) {
// 		this.props.deletePost(id, () => {
// 			this.props.history.replace('/');
// 			showAlert('The post has been successfully deleted');
// 		});
// 	}

// 	onSubmit(values) {
// 		const {id} = this.props.post;
// 		this.props.editPost(id, values);
// 		this.setState({editing: false});
// 		showAlert('The post has been successfully saved');
// 	}

// 	onCancelEdit() {
// 		this.setState({editing: false});
// 	}

// 	renderPost(post) {
// 		let buttons = null;
// 		if (this.props.auth.uid === this.props.post.uid)
// 			buttons = (<div className="form-buttons">
// 						<button className="btn btn-primary" onClick={this.onEditPost.bind(this)}>Edit Post</button>
// 						<button className="btn btn-danger" onClick={this.onDeletePost.bind(this, post.id)}>Delete</button>
// 					</div>);
		
// 		if (!this.state.editing) {
// 			return (
// 				<div className="singlePost">
// 					<h5>{post.title}</h5>
// 					<p>{post.content}</p>
// 					{buttons}
// 				</div>
// 			);
// 		}
// 		else {
// 			const that = this;
// 			const btn1 = "Save Post";
// 			const btn2 = "Cancel";
			
// 			return (
				
// 				renderPostForm(that, this.onSubmit, btn1, btn2, this.onCancelEdit)
// 			);
// 		}
// 	}

// 	render() {
// 		const {post} = this.props;
		
// 		if (!post) 
// 			return <div>Loading...</div>

// 		return (
// 			<div className="container">
// 				{this.renderPost(post)}
// 			</div>
// 		);
// 	}
// }


// function mapStateToProps(state) {
// 	return {
// 		posts: state.posts.list,
// 		post: state.posts.currentPost,
// 		auth: state.auth
// 	}
// }

// function mapDispatchToProps(dispatch) {
// 	return {
// 		fetchPost: (id) => dispatch(fetchPost(id)),
// 		deletePost: (id, callback) => dispatch(deletePost(id, callback)),
// 		editPost: (id, post) => dispatch(editPost(id, post))
// 	}
// }

// export default reduxForm({
// 	form: 'EditPostForm',
// 	validate
// })(connect(mapStateToProps, mapDispatchToProps)(ShowPost));