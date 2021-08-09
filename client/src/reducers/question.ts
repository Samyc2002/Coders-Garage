import { Reducer } from 'redux';

import * as actionTypes from '../constants/actionTypes';

interface questionState{
    questionData: any,
    isLoading: boolean,
    error: any
}

const initialState: questionState = {
    questionData: null,
    isLoading: false,
    error: null
};

export const questionReducer: Reducer = (state = initialState, action) => {

    switch(action.type) {
        case actionTypes.QUESTION_REQUEST:
        case actionTypes.POST_QUESTION_REQUEST:
        case actionTypes.UPDATE_QUESTION_REQUEST:
            return {
                ...state,
                isLoading: true
            }
        case actionTypes.QUESTION_SUCCESS:
        case actionTypes.POST_QUESTION_SUCCESS:
        case actionTypes.UPDATE_QUESTION_SUCCESS:
            return {
                ...state,
                questionData: action.payload,
                isLoading: false
            }
        case actionTypes.QUESTION_FAILURE:
        case actionTypes.POST_QUESTION_FAILURE:
        case actionTypes.UPDATE_QUESTION_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload
            }
        default:
            return state
    }
}

