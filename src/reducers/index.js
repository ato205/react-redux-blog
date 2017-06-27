import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';
import PostsReducer from './postsReducer';
import PostReducer from './postReducer';
import AuthReducer from './authReducer';

const rootReducer = combineReducers({
	posts: PostsReducer,
	post: PostReducer,
	auth: AuthReducer,
	form: formReducer
});

export default rootReducer;