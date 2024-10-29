import { NextResponse } from 'next/server';
import { adminDb, adminAuth } from '@/config/firebase-admin';

export async function GET(request: Request) {
  try {
    const authHeader = request.headers.get('Authorization');
    if (!authHeader) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.split('Bearer ')[1];
    const decodedToken = await adminAuth.verifyIdToken(token);
    const userId = decodedToken.uid;

    const doc = await adminDb.collection('matrices').doc(userId).get();
    const data = doc.data();

    return NextResponse.json({ matrix: data?.quadrants || [] });
  } catch (error) {
    console.error('Error fetching matrix:', error);
    return NextResponse.json(
      { error: 'Failed to fetch matrix' },
      { status: 500 }
    );
  }
} 

export async function POST(request: Request) {
  try {
    const authHeader = request.headers.get('Authorization');
    if (!authHeader) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.split('Bearer ')[1];
    const decodedToken = await adminAuth.verifyIdToken(token);
    const userId = decodedToken.uid;

    const { quadrants } = await request.json();

    await adminDb.collection('matrices').doc(userId).set({
      quadrants,
      userId,
      updatedAt: new Date(),
    }, { merge: true });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error saving matrix:', error);
    return NextResponse.json(
      { error: 'Failed to save matrix' },
      { status: 500 }
    );
  }
} 