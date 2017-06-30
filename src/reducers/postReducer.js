import {
	FETCH_POST_SUCCESS,
	FETCH_POST_FAIL,
	GET_POST_CREATOR_SUCCESS,
	ADD_COMMENT_SUCCESS
} from '../actions/postAction';


const initialState = {
	title: '',
	content: '',
	id: null,
	uid: null,
	user: null,
	createdAt: null
}


export default function(state = initialState, action) {
	switch(action.type) {
		case FETCH_POST_SUCCESS:
			return Object.assign({}, state, {...action.post, id: action.id, user: action.user, comments: action.comments});
		case ADD_COMMENT_SUCCESS:
			console.log(Object.assign({}, state));
			return Object.assign({}, state, {
				comments: {...state.comments, [action.id]: action.payload}
			});
		default:
			return state;
	}
}