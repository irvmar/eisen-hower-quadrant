import { 
  signInWithPopup, 
  signOut as firebaseSignOut,
  onAuthStateChanged,
  type User
} from '@firebase/auth';
import { auth, googleProvider } from '../config/firebase';
import { clearUserData } from './firestore';

// Define the error type but use unknown in catch clause
interface AuthError {
  message: string;
  code?: string;
}

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (error: unknown) {
    // Type guard to check if error matches AuthError shape
    if (error && typeof error === 'object' && 'message' in error) {
      console.error('Error signing in with Google:', error.message);
    } else {
      console.error('Error signing in with Google:', error);
    }
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