import _ from 'lodash';

import {
	FETCH_POSTS_SUCCESS,
	FETCH_POSTS_FAIL,
	FETCH_POST_SUCCESS,
	FETCH_POST_FAIL,
	CREATE_POST_SUCCESS,
	CREATE_POST_FAIL,
	DELETE_POST_SUCCESS,
	DELETE_POST_FAIL,
	LOAD_MORE_SUCCESS
} from '../actions/postAction';


const initialState = {
	list: [],
	isFetched: false
}



export default function(state = initialState, action) {
	switch(action.type) {
		case FETCH_POSTS_SUCCESS:
			if (window.localStorage.isAuthenticated == undefined)
				localStorage.setItem('isAuthenticated', false);
			return Object.assign({}, state, {
				list: _.orderBy(action.payload, 'createdAt', 'desc'),
				isFetched: true
			});
		// case FETCH_POST_SUCCESS:
		// 	return Object.assign({}, state, {
		// 		currentPost: {...action.payload, id: action.id}
		// 	});
		case LOAD_MORE_SUCCESS:
			// order the posts by the time they were created and the first item of the returning array
			// the first item is the reference to get this list
			const posts = _.drop(_.orderBy(action.payload, 'createdAt', 'desc'));
			return Object.assign({}, state, {
				list: _.concat(state.list, posts),
				isFetched: true
			});
		default:
			return state;
	}
}