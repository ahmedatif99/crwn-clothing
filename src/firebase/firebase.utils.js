import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyAcEAeBq3h5uXbjpviG6WTrBdGTOYgmj5w",
    authDomain: "crwn-db-4631d.firebaseapp.com",
    projectId: "crwn-db-4631d",
    storageBucket: "crwn-db-4631d.appspot.com",
    messagingSenderId: "857676377602",
    appId: "1:857676377602:web:da41f78c24f6866301c11b",
    measurementId: "G-2WSXZENWDV"
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;