import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGIN_ID,
  appId: process.env.REACT_APP_APP_ID,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
};

firebase.initializeApp(firebaseConfig);

export class AuthService {
  onStateChange(callback) {
    firebase.auth().onAuthStateChanged((user) => callback(user));
  }

  async signupEmail(email, password) {
    await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .catch((error) => alert(error.message));
  }

  async loginEmail(email, password) {
    await firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch((error) => alert(error.message));
  }

  async logout() {
    await firebase.auth().signOut();
  }
}

export const db = firebase.firestore();
export const storage = firebase.storage();
