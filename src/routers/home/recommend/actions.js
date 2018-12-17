import { createAction } from "redux-actions";
import { NAME } from "./constants";

export const GET_RECOMMEND_LIST = `${NAME}.GET_RECOMMEND_LIST`;
export const GET_RECOMMEND_LIST_SUCCES = `${NAME}.GET_RECOMMEND_LIST_SUCCES`;
export const GET_RECOMMEND_LIST_FAILURE = `${NAME}.GET_RECOMMEND_LIST_FAILURE`;
export const GET_USER_RATE = `${NAME}.GETGET_USER_RATE`;


export const getRecommendList = createAction(GET_RECOMMEND_LIST);
export const successSuggest = createAction(GET_RECOMMEND_LIST_SUCCES);
export const failureSuggest = createAction(GET_RECOMMEND_LIST_SUCCES);
export const getUserRate = createAction(GET_USER_RATE);

