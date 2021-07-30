import { combineReducers } from "redux";

import { authReducer } from './auth';
import { userReducer } from './user';
import { questionReducer } from './question';
import { interviewReducer } from './interview';
import { submissionReducer } from './submission';

export default combineReducers({
    auth: authReducer,
    user: userReducer,
    qustion: questionReducer,
    interview: interviewReducer,
    submission: submissionReducer
});