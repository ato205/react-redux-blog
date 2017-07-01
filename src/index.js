import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Alert from 'react-s-alert';
import createBrowserHistory from 'history/createBrowserHistory';

import configureStore from './components/configureStore';
import Navbar from "./containers/navbar";
import PostIndex from "./containers/posts/postIndex";
import NewPost from './containers/posts/newPost';
import ShowPost from './containers/posts/showPost';
import EditPost from './containers/posts/editPost';
import Register from './containers/users/register';
import Login from './containers/users/login';
import Profile from './containers/users/profile';
import RequireAuth from './components/requireAuth';

import './index.css';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/stackslide.css';

import {
	REDIRECT_IF_GUEST,
	REDIRECT_IF_AUTHENTICATED
} from './components/requireAuth';

const store = configureStore();
const history = createBrowserHistory();

ReactDOM.render(
	<Provider store={store}>
		<BrowserRouter history={history}>
			<div className="wrapper">
				<Navbar />
				<div className="container">
					<Switch>
						<RequireAuth path="/users/profile" component={Profile} redirectCheck={REDIRECT_IF_GUEST} />
						<RequireAuth path="/users/register" component={Register} redirectCheck={REDIRECT_IF_AUTHENTICATED}/>
						<RequireAuth path="/users/login" component={Login} redirectCheck={REDIRECT_IF_AUTHENTICATED}/>
						<RequireAuth path="/posts/create" component={NewPost} redirectCheck={REDIRECT_IF_GUEST} />
						<RequireAuth path="/posts/edit/:id" component={EditPost} redirectCheck={REDIRECT_IF_GUEST} />
						<Route path="/posts/:id" component={ShowPost}></Route>
						<Route path="/posts" component={PostIndex}></Route>	
						<Route path="/" component={PostIndex}></Route>	
					</Switch>
				</div>
				<Alert stack={{limit: 3}} />
			</div>
		</BrowserRouter>
	</Provider>
	, document.getElementById('root'));

// <Navbar />
// <Switch>
// 	<Route path="/users/register" component={Register}></Route>
// 	<Route path="/users/login" component={Login}></Route>
// 	<Route path="/posts/create" component={NewPost}></Route>
// 	<Route path="/posts/:id" component={ShowPost}></Route>
// 	<Route path="/" component={PostIndex}></Route>	
// </Switch>