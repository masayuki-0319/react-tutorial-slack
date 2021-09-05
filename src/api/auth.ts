import { firebase } from './firebase';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

const auth = getAuth(firebase);

export { auth, createUserWithEmailAndPassword };
