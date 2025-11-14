import { Injectable } from '@nestjs/common';
import {
  getDoc,
  doc,
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  DocumentReference,
  updateDoc,
  DocumentData,
  limit,
  query,
  where,
} from 'firebase/firestore';
import { db } from '../config/firestore';

@Injectable()
export class FirestoreHelper {
  async getDocumentByProperty<T>(
    collectionName: string,
    propertyName: string,
    propertyValue: string
  ): Promise<T | null> {
    try {
      const q = query(
        collection(db, collectionName),
        where(propertyName, '==', propertyValue),
        limit(1)
      );
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const doc = querySnapshot.docs[0];
        return { id: doc.id, ...(doc.data() as T) };
      }
      return null;
    } catch (e) {
      console.error(
        `Error getting document from ${collectionName} by property ${propertyName} with value ${propertyValue}: `,
        e
      );
      throw e;
    }
  }

  async getDocument<T>(
    collectionName: string,
    docId: string
  ): Promise<T | null> {
    try {
      const docRef = doc(db, collectionName, docId);
      const document = await getDoc(docRef);
      return document.exists()
        ? { id: document.id, ...(document.data() as T) }
        : null;
    } catch (e) {
      console.error(
        `Error getting document ${docId} from ${collectionName}: `,
        e
      );
      throw e;
    }
  }

  async getCollection<T>(collectionName: string): Promise<T[]> {
    try {
      const items: T[] = [];
      const querySnapshot = await getDocs(collection(db, collectionName));
      querySnapshot.forEach((doc) =>
        items.push({ id: doc.id, ...(doc.data() as T) })
      );
      return items;
    } catch (e) {
      console.error(`Error getting collection ${collectionName}: `, e);
      throw e;
    }
  }

  async createDocument<T>(
    collectionName: string,
    data: T
  ): Promise<DocumentReference> {
    try {
      return await addDoc(collection(db, collectionName), data);
    } catch (e) {
      console.error(`Error creating document in ${collectionName}: `, e);
      throw e;
    }
  }

  async updateDocument<T extends DocumentData>(
    collectionName: string,
    docId: string,
    data: Partial<T>
  ): Promise<void> {
    try {
      const docRef = doc(db, collectionName, docId);
      await updateDoc(docRef, data as { [x: string]: any });
    } catch (e) {
      console.error(
        `Error updating document ${docId} in ${collectionName}: `,
        e
      );
      throw e;
    }
  }

  async deleteDocument(collectionName: string, docId: string): Promise<void> {
    try {
      const docRef = doc(db, collectionName, docId);
      await deleteDoc(docRef);
    } catch (e) {
      console.error(
        `Error deleting document ${docId} from ${collectionName}: `,
        e
      );
      throw e;
    }
  }
}
