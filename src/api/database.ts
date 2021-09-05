import { firebase } from './firebase';
import { getDatabase, ref, child, set } from 'firebase/database';

const database = getDatabase(firebase);

export { database, ref, child, set };
