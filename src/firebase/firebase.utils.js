import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyB5DVSX_c-pHevBq4Ft6l_-rkgxx5bw-qI",
  authDomain: "crwn-db-819f2.firebaseapp.com",
  databaseURL: "https://crwn-db-819f2.firebaseio.com",
  projectId: "crwn-db-819f2",
  storageBucket: "",
  messagingSenderId: "441229379195",
  appId: "1:441229379195:web:fcafd69a84085b4e"
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
