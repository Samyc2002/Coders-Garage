import { Reducer } from 'redux';

import * as actionTypes from '../constants/actionTypes';

interface interviewState{
    interviewData: any,
    isLoading: boolean,
    error: any
}

const initialState: interviewState = {
    interviewData: null,
    isLoading: false,
    error: null
};

export const interviewReducer: Reducer = (state = initialState, action) => {

    switch(action.type) {
        case actionTypes.INTERVIEW_REQUEST:
            return {
                ...state,
                isLoading: true
            }
        case actionTypes.INTERVIEW_SUCCESS:
            return {
                ...state,
                interviewData: action.payload,
                isLoading: false
            }
        case actionTypes.INTERVIEW_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload
            }
        default:
            return state
    }
}

