import React, {Component} from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
import queryString from 'query-string';
import {fetchPosts, deletePost} from '../../actions/postAction';
import Post from '../../components/post';
import Loader from '../../components/loader';


class PostIndex extends Component {

	constructor(props) {
		super(props);
		this.state = {
			currentPage: 1,
			postsPerPage: 5
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

	handlePrevNextClick(pageNumbers, e) {;
		const {currentPage} = this.state;
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

	
	renderPageNumbers(pageNumbers) {
		const lastPage = _.last(pageNumbers);
		const {currentPage} = this.state;
		let start = 1, end = lastPage;

		if (pageNumbers.length < 4) {
			start = 1;
			end = lastPage;
		}
		else if (currentPage == 1) {
			start = 1;
			end = 3;
		}
		else if (currentPage == 2) {
			start = 1;
			end = 4; 
		}
		else if (lastPage - currentPage == 1) {
			start = lastPage - 3;
			end = lastPage;
		}
		else if (lastPage == currentPage) {
			start = lastPage - 2;
			end = lastPage;
		}
		else {
			start = currentPage - 2;
			end = Number(currentPage) + 2;
		}

		const pages = _.slice(pageNumbers, start-1, end);
		const prevBtnClassName = (currentPage == 1) ? "page-item disabled" : "page-item";
		const nextBtnClassName = (currentPage == lastPage) ? " page-item disabled" : "page-item";

		return (
			<ul className="pagination justify-content-center">
				<li className={prevBtnClassName}>
			        <a className="page-link" aria-label="Previous"
			        	id="Prev" 
			        	onClick={this.handlePrevNextClick.bind(this, pages)} 
			        >&laquo;</a>
			    </li>
				{pages.map(number => {
					return (
						<li className={(number == currentPage) ? "page-item active" : "page-item"} key={number}>
							<a 
								className="page-link"
								id={number}
								onClick={this.handlePaginationClick.bind(this)}
							>{number}</a>
						</li>
					);
				})}
				<li className={nextBtnClassName}>
			        <a className="page-link" aria-label="Next"
			        	id="Next"
			        	onClick={this.handlePrevNextClick.bind(this, pages)} 
			        >&raquo;</a>
			    </li>
			</ul>
		);
	}
	

	renderPosts() {
		const {currentPage, postsPerPage} = this.state;
		const endIndex = this.state.currentPage * postsPerPage;
		const startIndex = endIndex - postsPerPage;
		const postsToShow = _.slice(this.props.posts, startIndex, endIndex);

		return _.map(postsToShow, (post, key) => {
			return <Post 
						key={key} id={post.id}
						title={post.title}
						content={post.content}
						createdAt={post.createdAt}
					/>
			});
	}

	render() {
	const {posts, isFetched} = this.props;


		if (!posts && !isFetched)
			return <Loader />
		
		if (!posts.length && isFetched)
			return <div className="post-index">There are no posts yet.</div>
		
		const pageNumbers = [];
		for (let i = 1; i <= Math.ceil(posts.length / this.state.postsPerPage) ; i++)
			pageNumbers.push(i);

		return (
			<div className="post-index">
				<div className="list-group posts">
					{this.renderPosts()}
				</div>

				<div className="pageNumbers text-center">
					{this.renderPageNumbers(pageNumbers)}
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