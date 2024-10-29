import { doc, setDoc, getDoc } from '@firebase/firestore';
import { db } from '../config/firebase';
import { Quadrant } from '../types';
import { saveToIndexedDB, loadFromIndexedDB } from './indexedDB';
import { auth } from '../config/firebase';

const COLLECTION_NAME = 'matrices';

// Helper to get current user ID or throw error if not authenticated
const getCurrentUserId = (): string => {
  const user = auth.currentUser;
  if (!user) throw new Error('User must be authenticated');
  return user.uid;
};

// Helper to get document reference for current user
const getUserDocRef = () => {
  return doc(db, COLLECTION_NAME, getCurrentUserId());
};

export const saveMatrix = async (quadrants: Quadrant[]) => {
  try {
    // Always save to IndexedDB first
    await saveToIndexedDB(quadrants);

    // Try to save to Firestore if online
    if (navigator.onLine) {
      await setDoc(getUserDocRef(), {
        quadrants,
        updatedAt: new Date(),
        createdAt: new Date() // This will only be set on first creation due to merge: true
      }, { merge: true });
    }
  } catch (error) {
    console.error('Error saving matrix:', error);
    throw error;
  }
};

export const loadMatrix = async (): Promise<Quadrant[]> => {
  try {
    // Try to load from Firestore first if online
    if (navigator.onLine) {
      try {
        const docRef = getUserDocRef();
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          const data = docSnap.data();
          // Save to IndexedDB for offline access
          await saveToIndexedDB(data.quadrants);
          return data.quadrants;
        }
      } catch (error) {
        console.error('Error loading from Firestore:', error);
      }
    }

    // If offline or Firestore failed, try loading from IndexedDB
    const localData = await loadFromIndexedDB();
    if (localData) {
      return localData;
    }

    // If no data exists anywhere, initialize with empty matrix
    const initialQuadrants = [
      { id: 'urgent-important', title: 'Urgent & Important', tasks: [] },
      { id: 'not-urgent-important', title: 'Not Urgent & Important', tasks: [] },
      { id: 'urgent-not-important', title: 'Urgent & Not Important', tasks: [] },
      { id: 'not-urgent-not-important', title: 'Not Urgent & Not Important', tasks: [] }
    ];
    await saveMatrix(initialQuadrants);
    return initialQuadrants;
  } catch (error) {
    console.error('Error loading matrix:', error);
    throw error;
  }
};

// Add sync function to handle online/offline transitions
export const syncWithFirestore = async (quadrants: Quadrant[]) => {
  if (navigator.onLine) {
    try {
      await setDoc(getUserDocRef(), {
        quadrants,
        updatedAt: new Date()
      }, { merge: true });
    } catch (error) {
      console.error('Error syncing with Firestore:', error);
    }
  }
};

// New function to clear user data on logout
export const clearUserData = async () => {
  try {
    // Clear IndexedDB
    await saveToIndexedDB([]);
  } catch (error) {
    console.error('Error clearing user data:', error);
  }
}; 