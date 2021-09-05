import { initializeApp } from 'firebase/app';
// import 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyCg9hZG68tA0vVw4DsQknCuRwu9DleuIzM',
  authDomain: 'react-tutorial-slack.firebaseapp.com',
  databaseURL: 'https://react-tutorial-slack-default-rtdb.firebaseio.com/',
  projectId: 'react-tutorial-slack',
  storageBucket: 'react-tutorial-slack.appspot.com',
  messagingSenderId: '766740938518',
  appId: '1:766740938518:web:42a79c254f85d7025f5a37',
};

const firebase = initializeApp(firebaseConfig);

export { firebase };
