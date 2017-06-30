import React, {Component} from 'react';
import {reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import {createPost} from '../../actions/postAction';
import {validatePostForm as validate} from '../../components/forms';
import {showAlert} from '../../components/alert';
import PostForm from '../../components/postForm';

class NewPost extends Component {

	onSubmit(values) {
		const post = {...values, uid: this.props.auth.uid};
		console.log(post);
		this.props.createPost(post, () => { 
			this.props.history.push("/");
			showAlert('The post has been successfully created');
		});
	}

	render() {
		const {handleSubmit} = this.props;
		return (
			<div className="post-form">
				<PostForm onSubmit={handleSubmit(this.onSubmit.bind(this))} formType="create" />
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	auth: state.auth
});


const mapDispatchToProps = (dispatch) => ({
	createPost: (post, callback) => {dispatch(createPost(post, callback))}
});

export default reduxForm({
	form: 'NewPostForm',
	validate
})(connect(mapStateToProps, mapDispatchToProps)(NewPost));