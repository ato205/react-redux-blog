import React, {Component} from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
import {fetchPosts, deletePost, loadMore} from '../../actions/postAction';
import Post from '../../components/post';
import Loader from '../../components/loader';

class PostIndex extends Component {

	componentDidMount() {
		this.props.fetchPosts();
	}

	loadMore() {
		const lastPostId = _.last(this.props.posts).id;
		this.props.loadMore(lastPostId);
	}

	renderPosts() {
		return _.map(this.props.posts, (post, key) => {
			return (
				<Post 
					key={key} id={post.id} 
					title={post.title} 
					content={post.content}
					createdAt={post.createdAt} 
				/>
			)
		});
	}

	render() {
		if (!this.props.posts && !this.props.isFetched) {
			return <Loader />
		}
		if (!this.props.posts.length && this.props.isFetched)
			return <div className="post-index">There are no posts yet.</div>

		return (
			<div className="post-index">
				<div className="list-group posts">
					{this.renderPosts()}
				</div>
				<div className="load-more-btn text-center">
				{this.props.posts.length &&  
				<button 
					className="btn btn-secondary" 
					onClick={this.loadMore.bind(this)} >Load more</button>}
					</div>
			</div>
			
		);
	}
}

function mapStateToProps(state) {
	return {
		posts: state.posts.list,
		isFetched: state.posts.isFetched
	};
}

export default connect(mapStateToProps, {fetchPosts, deletePost, loadMore})(PostIndex);