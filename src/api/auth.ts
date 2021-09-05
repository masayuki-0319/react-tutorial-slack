import { firebase } from './firebase';
import { getAuth, createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword } from 'firebase/auth';

const auth = getAuth(firebase);

export { auth, createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword };
