import firebase from "firebase/app";
import "firebase/firestore";

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyBKwBzjEw5oO_TbWEx6s_etmXrZLgtD11Q",
    authDomain: "fb-crud-react-fabdf.firebaseapp.com",
    projectId: "fb-crud-react-fabdf",
    storageBucket: "fb-crud-react-fabdf.appspot.com",
    messagingSenderId: "14656246824",
    appId: "1:14656246824:web:d42c175e206445b2d5111d",
};
// Initialize Firebase
const fb = firebase.initializeApp(firebaseConfig);

export const db = fb.firestore();
