import { combineReducers } from "redux";
import {reducer as toastrReducer} from 'react-redux-toastr'
import User from "./user";

const allReducers = combineReducers({
    User: User,
    toastr : toastrReducer
});

export default allReducers;