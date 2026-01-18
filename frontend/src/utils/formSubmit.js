import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

/**
 * Submits form data to a specified Firebase Firestore collection.
 * @param {string} collectionName - The name of the collection (e.g., 'contact_inquiries').
 * @param {object} formData - The data object collected from the form inputs.
 * @returns {Promise<{success: boolean, error?: any}>}
 */
export const submitFormToFirebase = async (collectionName, formData) => {
  try {
    // Add serverTimestamp to track when it was submitted
    const dataToSubmit = {
      ...formData,
      submittedAt: serverTimestamp(),
    };

    await addDoc(collection(db, collectionName), dataToSubmit);
    console.log(`Successfully submitted to ${collectionName}`);
    return { success: true };

  } catch (error) {
    console.error("Error submitting form to Firebase:", error);
    return { success: false, error };
  }
};