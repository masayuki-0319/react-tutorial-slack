import { firebase } from './firebase';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';

const auth = getAuth(firebase);

export { auth, createUserWithEmailAndPassword, updateProfile };
