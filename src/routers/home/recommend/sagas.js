import { call, put, fork, takeEvery } from "redux-saga/effects";
import * as api from "../api";
import * as actions from "./actions";

function* runRequestSuggest() {
  const { data, error } = yield call(api.getRecommendList);
  if (data && !error) {
    yield put(actions.successSuggest({ data }));
  } else {
    yield put(actions.failureSuggest({ error }));
  }
}

function* handleRequestSuggest() {
  yield takeEvery(actions.GET_RECOMMEND_LIST, runRequestSuggest);
}

function* runRequestUser() {
  const { data, error } = yield call(api.getRecommendList);
  if (data && !error) {
    yield put(actions.successSuggest({ data }));
  } else {
    yield put(actions.failureSuggest({ error }));
  }
}

function* handleRequestUser() {
  yield takeEvery(actions.GET_USER_RATE, runRequestUser);
}

export default function* rootSaga() {
  yield [fork(handleRequestSuggest), fork(handleRequestUser)];
}
