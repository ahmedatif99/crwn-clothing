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

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if (!snapShot.exists) {
        const {displayName, email} = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            });
        } catch (error) {
            console.log('Error Creating User ', error.message);
        }

    }

    return userRef;

};

export const addCollectionAndDocuments = async (collectionKey, objectToAdd) => {
    const collectionRef = firestore.collection(collectionKey);

    const batch = firestore.batch();
    objectToAdd.forEach(obj => {
        const newDocRef = collectionRef.doc();
        batch.set(newDocRef, obj);
    });

    return await batch.commit()
};

export const convertCollectionsSnapshotToMap = (collections) => {
    const transformedCollection = collections.docs.map( doc => {
        const { title, items } = doc.data();

        return {
            routName: encodeURI(title.toLowerCase()),
            id: doc.id,
            title,
            items
        }
    });

    return transformedCollection.reduce((accumulator, collection) => {
        accumulator[collection.title.toLowerCase()] = collection;
        return accumulator;
    }, {});
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;