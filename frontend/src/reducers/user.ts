import { Reducer } from 'redux';

import * as actionTypes from '../constants/actionTypes';

interface userState{
    authData: any,
    isLoading: boolean,
    error: any
}

const initialState: userState = {
    authData: null,
    isLoading: false,
    error: null
};

export const userReducer: Reducer = (state = initialState, action) => {

    switch(action.type) {
        case actionTypes.SIGNUP_REQUEST:
            return {
                ...state,
                isLoading: true
            }
        case actionTypes.SIGNUP_SUCCESS:
            return {
                ...state,
                authData: action.payload,
                isLoading: false
            }
        case actionTypes.SIGNUP_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload
            }
        default:
            return state
    }
}

