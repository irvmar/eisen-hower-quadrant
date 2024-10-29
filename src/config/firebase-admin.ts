import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getAuth } from 'firebase-admin/auth';

if (!process.env.FIREBASE_PRIVATE_KEY || 
    !process.env.FIREBASE_CLIENT_EMAIL || 
    !process.env.FIREBASE_PROJECT_ID) {
  throw new Error('Firebase Admin environment variables are not properly configured');
}

const firebaseAdminConfig = {
  credential: cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: (process.env.FIREBASE_PRIVATE_KEY || "").replace(/\\n/g, "\n"),
})
};

// Initialize Firebase Admin
const apps = getApps();
const firebaseAdmin = apps.length === 0 ? initializeApp(firebaseAdminConfig) : apps[0];
const adminDb = getFirestore(firebaseAdmin);
const adminAuth = getAuth(firebaseAdmin);

export { adminDb, adminAuth }; 