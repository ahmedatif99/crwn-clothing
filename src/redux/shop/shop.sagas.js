import { 
    takeLatest,
    call,
    put,
    all
} from "@redux-saga/core/effects";

import { 
    firestore,
    convertCollectionsSnapshotToMap 
} from "../../firebase/firebase.utils";

import { 
    fetchCollectionsSuccess,
    fetchCollectionsFailuer 
} from "./shop.actions";
import ShopActionTypes from "./shop.types";

export function* fetchCollectionsAsync(){
    try {
        const collectionsRef = firestore.collection('collections');
        const snapshot = yield collectionsRef.get();
        const collectionsMap = yield call(convertCollectionsSnapshotToMap, snapshot);
        yield put(fetchCollectionsSuccess(collectionsMap));
    } catch (error) {
        yield put(fetchCollectionsFailuer(error.message));
    }
}

export function* fetchCollectionsStart() {
    yield takeLatest(
        ShopActionTypes.FETCH_COLLECTIONS_START, 
        fetchCollectionsAsync
    );
}

export function* shopSagas () {
    yield all([
        call(fetchCollectionsStart)
    ]);
}
