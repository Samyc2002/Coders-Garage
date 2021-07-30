import { Reducer } from 'redux';

import * as actionTypes from '../constants/actionTypes';

interface authState{
    authData: any,
    isLoading: boolean,
    error: any
}

const initialState: authState = {
    authData: null,
    isLoading: false,
    error: null
};

export const authReducer: Reducer = (state = initialState, action) => {

    switch(action.type) {
        case actionTypes.LOGIN_REQUEST:
            return {
                ...state,
                isLoading: true
            }
        case actionTypes.LOGIN_SUCCESS:
            return {
                ...state,
                authData: action.payload,
                isLoading: false
            }
        case actionTypes.LOGIN_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload
            }
        default:
            return state
    }
}

