import React, {Component} from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
import queryString from 'query-string';
import {fetchPosts, deletePost} from '../../actions/postAction';
import Post from '../../components/posts/post';
import Loader from '../../components/loader';
import SearchBar from '../../components/searchBar';
import Pagination from '../../components/pagination';


class PostIndex extends Component {

	constructor(props) {
		super(props);
		this.state = {
			currentPage: 1,
			postsPerPage: 2
		}
	}

	componentWillReceiveProps(newProps) {
		// parse query string and set currenPage state accordingly
		const parsed = queryString.parse(newProps.location.search).page;
		if (parsed !== undefined)
			this.setState({currentPage: parsed});
		else {
			this.setState({currentPage: 1});
		}
	}
	
	componentDidMount() {
		this.props.fetchPosts();
	}


	handlePaginationClick(e) {
		this.setState({currentPage: e.target.id});	
		this.props.history.push(`/posts?page=${e.target.id}`);
	}

	handlePrevNextClick(e, pageNumbers, currentPage) {
		const lastPage = _.last(pageNumbers);

		if (currentPage > 1 && e.target.id === 'Prev') {
			let page = currentPage - 1;
			this.setState({currentPage: page});
			this.props.history.push(`/posts?page=${page}`);
		}
		else if (currentPage < lastPage && e.target.id === 'Next') {
			let page = Number(currentPage) + 1;
			this.setState({currentPage: page});
			this.props.history.push(`/posts?page=${page}`);
		}
	}


	renderPosts() {
		const {currentPage, postsPerPage} = this.state;
		const endIndex = this.state.currentPage * postsPerPage;
		const startIndex = endIndex - postsPerPage;
		const postsToShow = _.slice(this.props.posts, startIndex, endIndex);
		
		return _.map(postsToShow, (post, key) => {
			return <Post 
						key={key}
						post={post}
					/>
			});
	}

	render() {
		const {posts, isFetched} = this.props;		

		if (!isFetched)
			return <Loader />
		
		if (!posts.length && isFetched)
			return <div className="post-index">There are no posts yet.</div>
		
		const pageNumbers = [];
		for (let i = 1; i <= Math.ceil(posts.length / this.state.postsPerPage) ; i++)
			pageNumbers.push(i);

		return (

				<div className="post-index">
					<div className="posts">
						{this.renderPosts()}
					</div>

					<div className="pageNumbers text-center">
						<Pagination 
							currentPage={this.state.currentPage} 
							pageNumbers={pageNumbers} 
							handlePrevNextClick={this.handlePrevNextClick.bind(this)}
							handlePaginationClick={this.handlePaginationClick.bind(this)}
						/>
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

export default connect(mapStateToProps, {fetchPosts, deletePost})(PostIndex);