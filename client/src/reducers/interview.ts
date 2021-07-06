import { Reducer } from 'redux';

import * as actionTypes from '../constants/actionTypes';

export const interviewReducer: Reducer = (state = { interviewData: null }, action) => {
    switch(action.type) {
        
        case actionTypes.GET_INTERVIEW:
            return { ...state, interviewData: action.data};

        case actionTypes.CREATE_INTERVIEW:
            return { ...state, interviewData: action.data };

        case actionTypes.UPDATE_QUESTION:
            return { ...state, questionData: action.data };
        
        default:
            return state;
    }
}