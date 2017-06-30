# React Redux Blog with Firebase

A simple blog written in React Redux with Firebase Authentication and Realtime Database

Live demo: https://react-redux-simpleblog.herokuapp.com/

## Tools
Tools used in this ReactJS Project
* React
* React Router
* Redux
* Redux Form
* Redux Thunk
* Bootstrap
* SASS
* [Halogen](https://github.com/yuanyan/halogen)- A collection of loading spinners with React.js
* [React sAlert](https://github.com/juliancwirko/react-s-alert) - Alerts / Notifications for React with rich configuration options 


## Structure

```
├── actions
│   ├── authAction.js
│   └── postAction.js
├── api
│   └── Firebase.js
├── components
│   ├── alert.js
│   ├── configureStore.js
│   ├── form.js
│   ├── loader.js
│   ├── post.js
│   ├── postForm.js
│   ├── postView.js
│   └── requireAuth.js
├── containers
│   ├── post
│   │   ├── editPost.js
│   │   ├── newPost.js
│   │   ├── postIndex.js
│   │   └── showPost.js
│   ├── users
│   │   ├── login.js
│   │   ├── profile.js
│   │   └── register.js
├── reducers
│   ├── authReducer.js
│   ├── index.js
│   ├── postReducer.js
│   └── postsReducer.js
├── index.css
├── index.js
├── index.scss
```