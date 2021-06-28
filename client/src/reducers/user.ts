import { Reducer } from 'redux';

import * as actionTypes from '../constants/actionTypes';

export const userReducer: Reducer = (state = { authData: null }, action) => {
    switch(action.type) {
        case actionTypes.UPDATE:
            return { ...state, authData: action.data };
        case actionTypes.CREATE:
            return { ...state, authData: action.data };
        default: 
            return state;
    }
}