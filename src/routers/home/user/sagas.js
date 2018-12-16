import { call, put, fork, takeEvery, select, all } from "redux-saga/effects";
import * as api from "../api";
import * as actions from "./actions";

function* runRequestSuggest() {
  const { data, error } = yield call(api.getInTheaters);
  if (data && !error) {
    yield put(actions.successSuggest({ data }));
  } else {
    yield put(actions.failureSuggest({ error }));
  }
}

function* runSignUp(action) {
  const { payload = {} } = action;
  const res = yield call(api.signUp, payload);
  console.log('res', res)
}

function* handleSignUp() {
  yield takeEvery(actions.SIGNUP, runSignUp);
}

export default function* rootSaga() {
  yield fork(handleSignUp);
}
