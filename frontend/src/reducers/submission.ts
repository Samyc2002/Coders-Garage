import { Reducer } from 'redux';

import * as actionTypes from '../constants/actionTypes';

interface submissionState{
    submissionData: any,
    isLoading: boolean,
    error: any
}

const initialState: submissionState = {
    submissionData: null,
    isLoading: false,
    error: null
};

export const submissionReducer: Reducer = (state = initialState, action) => {

    switch(action.type) {
        case actionTypes.SUBMISSION_REQUEST:
            return {
                ...state,
                isLoading: true
            }
        case actionTypes.SUBMISSION_SUCCESS:
            return {
                ...state,
                submissionData: action.payload,
                isLoading: false
            }
        case actionTypes.SUBMISSION_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload
            }
        default:
            return state
    }
}

