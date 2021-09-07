import { User as FirebaseUser } from '@firebase/auth';

export type User =
  | {
      name: string;
      avatar: string;
    }
  | FirebaseUser;
