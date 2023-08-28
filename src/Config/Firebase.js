
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import { doc, getDoc, getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyDIkygWjKSyQXBytFy60UFprwLVPFgB-rQ",
  authDomain: "clone-818b9.firebaseapp.com",
  projectId: "clone-818b9",
  storageBucket: "clone-818b9.appspot.com",
  messagingSenderId: "821920746707",
  appId: "1:821920746707:web:345bdf1e3f1b9ecc861826",
  measurementId: "G-JY4HNMMQ6M"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);




export {auth , db }

