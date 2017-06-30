import firebase from 'firebase';
import database from '../api/Firebase';
export const CREATE_USER_REQUEST 	= 'create_user_request';
export const CREATE_USER_SUCCESS 	= 'create_user_success';
export const CREATE_USER_FAIL 		= 'create_user_fail';
export const LOGIN_USER_REQUEST 	= 'login_user_request';
export const LOGIN_USER_SUCCESS 	= 'login_user_success';
export const LOGIN_USER_FAIL 		= 'login_user_fail';
export const LOGOUT_USER_REQUEST 	= 'logout_user_request';
export const LOGOUT_USER_SUCCESS 	= 'logout_user_success';
export const LOGOUT_USER_FAIL 		= 'logout_user_fail';
export const GET_PROFILE_REQUEST 	= 'get_profile_request';
export const GET_PROFILE_SUCCESS 	= 'get_profile_success';
export const GET_PROFILE_FAIL 		= 'get_profile_fail';
export const UPDATE_PROFILE_REQUEST = 'update_profile_request';
export const UPDATE_PROFILE_SUCCESS = 'update_profile_success';
export const UPDATE_PROFILE_FAIL 	= 'update_profile_FAIL';



export function register(email, password, username, callback1, callback2) {
	return dispatch => {
		dispatch({
			type: CREATE_USER_REQUEST
		})
		firebase.auth().createUserWithEmailAndPassword(email, password)
			.then((res) => {
				dispatch(userCreated(res, username, callback1));
			})
			.catch(error => {
				callback2(error.message);
				dispatch({
					type: CREATE_USER_FAIL,
					payload: error
				})
			})
	}
}


export function userCreated(user, profile, callback) {
    // const user = firebase.auth().currentUser;
    return dispatch => {
    	dispatch({
			type: CREATE_USER_SUCCESS,
			payload: user
		});
    	user.updateProfile(profile).then(() => {
    		dispatch({
    			type: UPDATE_PROFILE_SUCCESS,
    			payload: profile
    		});
    		callback();
    	});
    	firebase.database().ref('users/'+user.uid).set({
    		displayName: profile.displayName,
    		email: user.email
    	})
	}
}



export function login(email, password, callback1, callback2) {
	return dispatch => {
		dispatch({
			type: LOGIN_USER_REQUEST
		})
		firebase.auth().signInWithEmailAndPassword(email, password)
			.then((res) => {
				callback1();
				dispatch({
					type: LOGIN_USER_SUCCESS,
					payload: res
				})
			})
			.catch(error => {
				callback2(error.message);
				dispatch({
					type: LOGIN_USER_FAIL,
					payload: error
				})
			})
	}
}

export function logout(callback) {
	return dispatch => {
		dispatch({
			type: LOGOUT_USER_REQUEST
		})
		firebase.auth().signOut()
			.then(res => {
				callback();
				dispatch({
					type: LOGOUT_USER_SUCCESS,
					payload: res
				})
			})
			.catch(error => {
				dispatch({
					type: LOGOUT_USER_FAIL,
					payload: error
				})
			})
	}
}


export function verifyAuth() {
	return dispatch => {
		firebase.auth().onAuthStateChanged(user => {
			if (user) 
				dispatch({
					type: LOGIN_USER_SUCCESS,
					payload: user
				});
			else 
				dispatch(logout());
		});
	}
}

export function getProfile() {
	
	return dispatch => {
		dispatch({
			type: GET_PROFILE_REQUEST
		})
		const user = firebase.auth().currentUser;
		if (user) {
			dispatch({
				type: GET_PROFILE_SUCCESS,
				payload: user
			})
		}
		else {
			dispatch({
				type: GET_PROFILE_FAIL
			})
		}
	}
}

export function updateProfile(profile, callback) {
	return dispatch => {
		dispatch({
			type: UPDATE_PROFILE_REQUEST
		})
		const user = firebase.auth().currentUser;
		
		user.updateProfile(profile)
		.then(() => {
			updateUsernameOfComments(user.uid, profile);
			callback();
			dispatch({
				type: UPDATE_PROFILE_SUCCESS,
				payload: profile
			})
		}, () => {
			dispatch({
				type: UPDATE_PROFILE_FAIL
			})
		});
	}
}


function updateUsernameOfComments(uid, profile) {
    database.ref('userComments/' + uid).once('value').then(snapshot => {
        const userComments = snapshot.val();
        Object.keys(snapshot.val()).forEach(postId => {
            Object.keys(userComments[postId]).forEach(commentId => {
                database.ref(`comments/${postId}/${commentId}`).update(profile)
            });
        });
    });
}
