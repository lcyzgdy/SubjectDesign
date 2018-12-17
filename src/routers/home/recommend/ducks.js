import { combineReducers } from "redux";
import get from "lodash/get";
import * as actions from "./actions";
import { NAME as PARENT_NAME } from "../constants";
import { NAME } from "./constants";

export const getReducerName = "GET_RECOMMEND";

const getNowPlayReducer = (state = {}, action) => {
  switch (action.type) {
    case actions.GET_RECOMMEND_LIST:
      return {
        isFetching: true
      };
    case actions.GET_USER_RATE:
      return {
        isFetching: true
      };
    case actions.GET_RECOMMEND_LIST_SUCCES:
      return {
        payload: get(action, "payload"),
        isFetching: false
      };
    case actions.GET_RECOMMEND_LIST_FAILURE:
      return {
        payload: get(action, "payload"),
        isFetching: false
      };
    default:
      return state;
  }
};

export const selector = (state, reducerName) => {
  return get(state, `${PARENT_NAME}.${NAME}.${reducerName}`);
};

export default combineReducers({ [getReducerName]: getNowPlayReducer });
