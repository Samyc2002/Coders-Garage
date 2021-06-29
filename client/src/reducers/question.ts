import { Reducer } from 'redux';

import * as actionTypes from '../constants/actionTypes';

export const questionReducer: Reducer = (state = { questionData: null }, action) => {
    switch(action.type) {
        
        case actionTypes.GET_QUESTION:
            return state;

        case actionTypes.CREATE_QUESTION:
            return { ...state, questionData: action.data };

        case actionTypes.UPDATE_QUESTION:
            return { ...state, questionData: action.data };
        
        default:
            return state;
    }
}