import admin from 'firebase-admin';

admin.initializeApp();

const firestore = admin.firestore();

export default firestore;
