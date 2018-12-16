import { createAction } from "redux-actions";
import { NAME } from "./constants";

export const CHANGE_USER_STATUS = `${NAME}.CHANGE_USER_STATUS`;
export const changeUserStatus = createAction(CHANGE_USER_STATUS);

export const CHANGE_FORM_DATA = `${NAME}.CHANGE_FORM_DATA`;
export const changeFormData = createAction(CHANGE_FORM_DATA);


