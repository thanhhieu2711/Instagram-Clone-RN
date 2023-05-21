// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyB-BhxfoDft5Nfi_gDVUgt1KQ8mrfmdySY',
  authDomain: 'instagram-clone-a699c.firebaseapp.com',
  projectId: 'instagram-clone-a699c',
  storageBucket: 'instagram-clone-a699c.appspot.com',
  messagingSenderId: '597794052409',
  appId: '1:597794052409:web:bcf1d6b90e1f5f0d7bf0e8',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
