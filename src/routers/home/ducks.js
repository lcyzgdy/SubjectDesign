import { combineReducers } from "redux";
import hotPlay from "./hotPlay";
import user from './user';
import recommend from './recommend';

export default combineReducers({    
    [hotPlay.name]: hotPlay.ducks,
    [user.name]: user.ducks,
    [recommend.name]: recommend.ducks,
});
