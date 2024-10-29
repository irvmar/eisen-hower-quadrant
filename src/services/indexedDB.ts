import { openDB } from 'idb';
import { Quadrant } from '../types';
import { auth } from '../config/firebase';

const DB_NAME = 'eisenhower-matrix';
const STORE_NAME = 'matrices';
const DB_VERSION = 1;

const openDatabase = async () => {
  return openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    },
  });
};

const getUserKey = () => {
  const user = auth.currentUser;
  return user ? `matrix-${user.uid}` : 'matrix-anonymous';
};

export const saveToIndexedDB = async (quadrants: Quadrant[]) => {
  const db = await openDatabase();
  await db.put(STORE_NAME, {
    quadrants,
    updatedAt: new Date()
  }, getUserKey());
};

export const loadFromIndexedDB = async (): Promise<Quadrant[] | null> => {
  const db = await openDatabase();
  const data = await db.get(STORE_NAME, getUserKey());
  return data?.quadrants || null;
};

export const clearIndexedDB = async () => {
  const db = await openDatabase();
  await db.delete(STORE_NAME, getUserKey());
}; 