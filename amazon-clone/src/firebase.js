
// import firebase from "firebase"
import firebase from "firebase/compat/app";
import "firebase/compat/auth"
import "firebase/compat/firestore"
const firebaseConfig = {
    apiKey: "AIzaSyCgyuWc7h58lVAe0UL6WDr6dTZJu0o_gKI",
    authDomain: "clone-ab43a.firebaseapp.com",
    projectId: "clone-ab43a",
    storageBucket: "clone-ab43a.appspot.com",
    messagingSenderId: "463402983140",
    appId: "1:463402983140:web:f6fd92850a3262612c16f1",
    measurementId: "G-XVR86088CR"
  };
  const firebaseApp= firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  export {db,auth};