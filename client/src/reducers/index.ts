import { combineReducers } from "redux";

import { authReducer } from './auth';
import { userReducer } from './user';
import { questionReducer } from './question';
import { themeReducer } from "./theme";

export default combineReducers({
    auth: authReducer,
    user: userReducer,
    qustion: questionReducer,
    theme: themeReducer
});