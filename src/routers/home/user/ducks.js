import { combineReducers } from "redux";
import get from "lodash/get";
import * as actions from "./actions";
import { NAME as PARENT_NAME } from "../constants";
import { NAME } from "./constants";

export const userReducerName = "USERCONFIG";

const userReducer = (state = {}, action) => {
  switch (action.type) {
    case actions.CHANGE_USER_STATUS:
      return {
        ...state,
        userStatus: get(action, "payload"),
      }
    case actions.CHANGE_FORM_DATA:
      return {
        ...state,
        formData: get(action, "payload"),
      }
    case actions.SIGNUP:
      return state;
    case actions.SIGNIN:
      return state;
    case actions.GETUSERPROPERTY:
      return state;
    default:
      return {
        ...state,
        userStatus: 'signUp',
        formData: {},
      }
  }
}

export const selector = (state, reducerName) => {
  console.log('state', state)
  return get(state, `${PARENT_NAME}.${NAME}.${reducerName}`);
};

export default combineReducers({ [userReducerName]: userReducer });
