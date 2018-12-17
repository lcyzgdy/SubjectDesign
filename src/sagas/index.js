import { fork, all } from "redux-saga/effects";

import hotPlaySagas from "../routers/home/hotPlay/sagas";
import searchSagas from "../routers/search/sagas";
import userSagas from "../routers/home/user/sagas";
import recommendSagas from "../routers/home/recommend/sagas";

export default function* rootSaga() {
  yield all([fork(hotPlaySagas), fork(userSagas), fork(recommendSagas)]);
}
