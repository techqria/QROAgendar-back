import { cert, initializeApp } from 'firebase-admin/app';
import { firestore } from "firebase-admin";
import * as serviceAccount from "./service-account.json"

class FirebaseService {

  private readonly db: FirebaseFirestore.Firestore

  constructor() {
    // @ts-ignore
    initializeApp({ credential: cert(serviceAccount) })

    this.db = firestore()
  };

  getFirestoreInstance(): FirebaseFirestore.Firestore {
    return this.db
  }
}

const firebaseService = new FirebaseService()
export default firebaseService