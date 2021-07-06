import { combineReducers } from "redux";

import { authReducer } from './auth';
import { userReducer } from './user';
import { questionReducer } from './question';
import { themeReducer } from "./theme";
import { interviewReducer } from './interview';

export default combineReducers({
    auth: authReducer,
    user: userReducer,
    qustion: questionReducer,
    interview: interviewReducer,
    theme: themeReducer
});