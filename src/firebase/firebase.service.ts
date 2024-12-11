import { Injectable } from '@nestjs/common';
import * as firebaseAdmin from 'firebase-admin/app';
import * as firestore from 'firebase-admin/firestore';

@Injectable()
export class FirebaseService {
  firebaseApp: firebaseAdmin.App;
  db: firestore.Firestore;
  bookCollection: firestore.CollectionReference;
  constructor() {
    this.firebaseApp = firebaseAdmin.initializeApp({
      credential: firebaseAdmin.cert({
        projectId: process.env.PROJECT_ID,
        privateKey: process.env.PRIVATE_KEY,
        clientEmail: process.env.CLIENT_EMAIL,
      }),
      databaseURL: process.env.FIREBASE_DB_URL,
    });
    this.db = firestore.getFirestore();
    this.bookCollection = this.db.collection('books');
  }
}
