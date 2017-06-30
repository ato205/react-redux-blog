import {showAlert} from '../components/alert';

import {
	CREATE_USER_SUCCESS,
	CREATE_USER_FAIL,
	LOGIN_USER_SUCCESS,
	LOGIN_USER_FAIL,
	LOGOUT_USER_SUCCESS,
	GET_PROFILE_SUCCESS,
	UPDATE_PROFILE_SUCCESS
} from '../actions/authAction';

const initialState = {
	isAuthenticated: false,
	error: null,
	user: 'guest',
	uid: null
}

export default function(state = initialState, action) {
	switch(action.type) {
		case CREATE_USER_SUCCESS:
			return Object.assign({}, state, {
				isAuthenticated: true,
				error: null,
				uid: action.payload.uid
			});
		case UPDATE_PROFILE_SUCCESS:
			return Object.assign({}, state, {
				user: action.payload.displayName
			});
		case LOGIN_USER_SUCCESS:
			localStorage.setItem("isAuthenticated", true);
			return Object.assign({}, state, {
				isAuthenticated: true,
				error: null,
				user: action.payload.displayName,
				uid: action.payload.uid
			});
		case LOGOUT_USER_SUCCESS:
			localStorage.setItem("isAuthenticated", false);
			return Object.assign({}, initialState);
		case GET_PROFILE_SUCCESS:
			return Object.assign({}, state, {
				user: action.payload.displayName
			});
		default:
			return state;
	}
}