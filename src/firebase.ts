import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyCg9hZG68tA0vVw4DsQknCuRwu9DleuIzM',
  authDomain: 'react-tutorial-slack.firebaseapp.com',
  databaseURL: 'https://react-tutorial-slack.firebaseio.com',
  projectId: 'react-tutorial-slack',
  storageBucket: 'react-tutorial-slack.appspot.com',
  messagingSenderId: '766740938518',
  appId: '1:766740938518:web:42a79c254f85d7025f5a37',
};

firebase.initializeApp(firebaseConfig);

export default firebase;
