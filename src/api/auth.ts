import { firebase } from './firebase';
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from 'firebase/auth';

const auth = getAuth(firebase);

export { auth, createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword, onAuthStateChanged };
