import { call, put, fork, takeEvery, select, all } from "redux-saga/effects";
import * as api from "../api";
import * as actions from "./actions";
import * as constants from './constants'

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

function* runSignIn(action) {
  console.log('signin')
  const { payload = {} } = action;
  const {data, error} = yield call(api.signIn, payload);
  if (data && !error) {
    if (data.status == constants.LOGINED) {
      yield put(actions.changeUserStatus(data.status));
      yield put(actions.changeUserId(data.uuid));
    } else {
      yield put(actions.changeUserStatus(constants.SIGNUP));
    }
  }
}

function* runGetUserProperty(action) {
  const { payload = {} } = action;
  const { data, error } = yield call(api.getUserProperty, payload);
  if (data && !error) {
    if (data.status == constants.LOGINED) {
      yield put(actions.changeUserStatus(constants.LOGINED));
    } else {
      yield put(actions.changeUserStatus(constants.SIGNUP));
    }
  }
}

function* handleSignUp() {
  yield takeEvery(actions.SIGNUP, runSignUp);
}

function* handleSignIn() {
  yield takeEvery(actions.SIGNIN, runSignIn);
}

function* handleGetUserProperty() {
  yield takeEvery(actions.GETUSERPROPERTY, runGetUserProperty);
}

export default function* rootSaga() {
  yield [call(handleSignUp), call(handleSignIn), call(handleGetUserProperty)];
}
