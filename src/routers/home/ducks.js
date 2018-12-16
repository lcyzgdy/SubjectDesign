import { combineReducers } from "redux";
import hotPlay from "./hotPlay";
import user from './user';

export default combineReducers({    
    [hotPlay.name]: hotPlay.ducks,
    [user.name]: user.ducks,
});
