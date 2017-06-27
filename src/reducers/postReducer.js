import {
	FETCH_POST_SUCCESS,
	FETCH_POST_FAIL,
	GET_POST_CREATOR_SUCCESS
} from '../actions/postAction';


const initialState = {}


export default function(state = initialState, action) {
	switch(action.type) {
		case FETCH_POST_SUCCESS:
			return Object.assign({}, state, {...action.post, id: action.id, user: action.user});
		default:
			return state;
	}
}