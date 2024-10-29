import { 
  signInWithPopup, 
  signOut as firebaseSignOut,
  onAuthStateChanged,
  type User
} from '@firebase/auth';
import { auth, googleProvider } from '../config/firebase';
import { clearUserData } from './firestore';

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (error: any) {
    console.error('Error signing in with Google:', error.message);
    throw error;
  }
};

export const signOut = async () => {
  try {
    await clearUserData(); // Clear user data before signing out
    await firebaseSignOut(auth);
  } catch (error) {
    console.error('Error signing out:', error);
    throw error;
  }
};

export const subscribeToAuthChanges = (callback: (user: User | null) => void) => {
  return onAuthStateChanged(auth, callback);
}; 