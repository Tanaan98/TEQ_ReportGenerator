import firebase from 'firebase/app';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyDBXUQqN9JaE8FRAT4xSS7RCdBKtsFEKm4",
  authDomain: "cscc01coc.firebaseapp.com",
  databaseURL: "https://cscc01coc.firebaseio.com",
  projectId: "cscc01coc",
  storageBucket: "cscc01coc.appspot.com",
  messagingSenderId: "145634212427"
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const auth = firebase.auth();

export {
  auth
};