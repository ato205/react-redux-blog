import firebase from 'firebase';

// Initialize Firebase
var config = {
    apiKey: "AIzaSyAV2tELOc4X_9r0KkQr871n_yHo8kBgA28",
    authDomain: "simple-blog-c759e.firebaseapp.com",
    databaseURL: "https://simple-blog-c759e.firebaseio.com",
    projectId: "simple-blog-c759e",
    storageBucket: "simple-blog-c759e.appspot.com",
    messagingSenderId: "20862102417"
};

firebase.initializeApp(config);

const database = firebase.database();

export default database;