import { configureStore } from '@reduxjs/toolkit';

import { authReducer } from '../reducers/auth';
import { userReducer } from '../reducers/user';
import { questionReducer } from '../reducers/question';
import { interviewReducer } from '../reducers/interview';
import { submissionReducer } from '../reducers/submission';

const store = configureStore({
    reducer: {
        auth: authReducer,
        user: userReducer,
        question: questionReducer,
        interview: interviewReducer,
        submission: submissionReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;