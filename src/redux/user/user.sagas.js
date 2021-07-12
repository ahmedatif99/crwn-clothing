import { takeLatest, put, all ,call } from "@redux-saga/core/effects";

import UserActionTypes from "./user.types";

import { siginSuccess, signInFailre, signOutSuccess, signOutFailure, signUpSuccess, signUpFailure } from "./user.actions";

import { 
    auth, 
    googleProvider, 
    createUserProfileDocument,
    getCurrentUser 
} from "../../firebase/firebase.utils";

export function* getSnapShotFromUserAuth(userAuth, additionalData) {
    try {
        const userRef = yield call(createUserProfileDocument, userAuth, additionalData);
        const userSnapShot = yield userRef.get();
        yield put(
            siginSuccess({ id: userSnapShot.id, ...userSnapShot.data() })
        );
    } catch(error){
        yield put(signInFailre(error));
    }
}

export function* signInWithGoogle() {
    try {
        const { user } = yield auth.signInWithPopup(googleProvider);
        yield getSnapShotFromUserAuth(user);
    } catch(error){
        yield put(signInFailre(error));
    }
}

export function* onGoogleSignInStart() {
    yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START, signInWithGoogle)
}

export function* signInWithEmail({payload: { email, password }}) {
    try {
        const { user } = yield auth.signInWithEmailAndPassword(email, password);
        yield getSnapShotFromUserAuth(user);
    } catch(error){
        yield put(signInFailre(error));
    }
}

export function* onEmailSignInStart() {
    yield takeLatest(UserActionTypes.EMAIL_SIGN_IN_START, signInWithEmail)
}

export function* isUserAuthenticated() {
    try {
        const userAuth = yield getCurrentUser();
        if (!userAuth) return;
        yield getSnapShotFromUserAuth(userAuth);

    } catch(error) {
        yield PushSubscription(signInFailre(error));
    }
}

export function* onCheckUserSession () {
    yield takeLatest(UserActionTypes.CHECK_USER_SESSION, isUserAuthenticated);
}

export function* sugnOut() {
    try {
        yield auth.signOut();
        yield put(signOutSuccess());
    } catch(error){
        yield put(signOutFailure(error));
    }
}

export function* signUp({ payload: { email, password, displayName } }) {
    try {
        const { user } = yield auth.createUserWithEmailAndPassword(
            email,
            password
        );
        yield put(signUpSuccess({ user, additionalData: { displayName } }));
    } catch (error) {
        yield PushSubscription(signUpFailure(error))
    }
}

export function* signInAfterSignUp ({ payload: { user, additionalData } }) {
    yield getSnapShotFromUserAuth(user, additionalData);
}

export function* onSignOutStart() {
    yield takeLatest(UserActionTypes.SIGN_OUT_START, sugnOut);
}

export function* onSignUptStart() {
    yield takeLatest(UserActionTypes.SIGN_UP_START, signUp);
}

export function* onSignUptSuccess() {
    yield takeLatest(UserActionTypes.SIGN_UP_SUCCESS, signInAfterSignUp);
}

export function* userSagas() {
    yield all([
        call(onGoogleSignInStart),
        call(onEmailSignInStart),
        call(onCheckUserSession),
        call(onSignOutStart),
        call(onSignUptStart),
        call(onSignUptSuccess)
    ]);
}