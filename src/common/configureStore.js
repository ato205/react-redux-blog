import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import {createLogger} from 'redux-logger';
import promise from 'redux-promise';
import reducers from '../reducers';
import * as Auth from '../actions/authAction';

export default () => {
	const logger = createLogger();

	const store = createStore(
		reducers,
		compose(applyMiddleware(promise, thunk, logger),
		window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
		
	);
	store.dispatch(Auth.verifyAuth());
	return store;
}