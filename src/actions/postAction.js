import database from '../api/Firebase';
import firebase from 'firebase';

export const FETCH_POSTS_REQUEST    = 'fetch_posts_request';
export const FETCH_POSTS_SUCCESS    = 'fetch_posts_success';
export const FETCH_POSTS_FAIL       = 'fetch_posts_fail';
export const CREATE_POST            = 'create_post';
export const FETCH_POST_REQUEST     = 'fetch_post_request';
export const FETCH_POST_SUCCESS     = 'fetch_post_success';
export const FETCH_POST_FAIL        = 'fetch_post_fail';
export const DELETE_POST_REQUEST    = 'delete_post_request';
export const DELETE_POST_SUCCESS    = 'delete_post_success';
export const DELETE_POST_FAIL       = 'delete_post_fail';
export const LOAD_MORE_SUCCESS      = 'load_more_success';
export const ADD_COMMENT_SUCCESS    = 'add_comment_success';

const loadMoreLimit = 2;

export function fetchPosts() {
    return dispatch => {
        dispatch({
            type: FETCH_POSTS_REQUEST
        })
        database.ref('posts').once('value', snapshot => {
            dispatch({
                type: FETCH_POSTS_SUCCESS,
                payload: snapshot.val()
            });
        }, error => {
            dispatch({
                tpye: FETCH_POSTS_FAIL,
                payload: error.message
            })
        });
    };
}

export function loadMore(lastPostId) {
    return dispatch => {
        database.ref('posts').endAt(null, lastPostId).limitToLast(loadMoreLimit+1).on('value', snapshot => {
            dispatch({
                type: LOAD_MORE_SUCCESS,
                payload: snapshot.val()
            })
        })
    }
}

export function fetchPost(id) {
    return dispatch => {
        dispatch({
            type: FETCH_POST_REQUEST
        })
        database.ref('posts').child(id).once('value', snapshot => {
            if (snapshot.val() != null) dispatch(getPostCreatorAndComments(snapshot.val(), id));
        }, error => {
            dispatch({
                type: FETCH_POST_FAIL,
                payload: error.message
            })
        });
    }
}


export function getPostCreatorAndComments(post, postId) {
    return dispatch => {
        Promise.all([
            database.ref('users/' + post.uid).once('value'),
            database.ref('comments/' + postId).once('value')
        ]).then((snaps) => {
            const user = snaps[0].val();
            const comments = snaps[1].val();
            dispatch({
                type: FETCH_POST_SUCCESS,
                post: post,
                id: postId,
                user: user.displayName,
                comments: comments
            })
        })
    }
}



export function createPost(post, callback) {
    let val = post;
    const key = database.ref('posts').push().key;
    val['createdAt'] = firebase.database.ServerValue.TIMESTAMP;
    val['id'] = key;
    return dispatch => database.ref('posts/'+key).update(val).then(() => callback());
}

export function deletePost(id, callback) {
    return dispatch => {
        dispatch({
            type: DELETE_POST_REQUEST
        })
        database.ref('posts').child(id).remove(() => {})
            .then(() => {
                typeof callback === 'function' && callback();
                dispatch({
                    type: DELETE_POST_SUCCESS
                })
            }).catch(error => {
                dispatch({
                    type: DELETE_POST_FAIL,
                    payload: error.message
                })
            });
        }
}

export function editPost(id, post) {
    return dispatch => database.ref('posts/' + id).update(post);
}


export function addComment(comment, postId) {
    let data = comment;
    const databaseRef = database.ref('comments/'+ postId);
    const commentId = databaseRef.push().key;
    data['createdAt'] = firebase.database.ServerValue.TIMESTAMP;
    
    return dispatch => {
        databaseRef.child(commentId).set(data).then(() => {
            dispatch({
                type: ADD_COMMENT_SUCCESS,
                payload: comment,
                id: commentId
            })
        });
        database.ref('userComments/'+comment.uid + '/' + postId).update({
            [commentId]: true
        });
    }
}

