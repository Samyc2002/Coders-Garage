import { Reducer } from 'redux';

import * as actionTypes from '../constants/actionTypes';

export const authReducer: Reducer = (state = { authData: null }, action) => {
    switch(action.type) {
        case actionTypes.AUTH:
            return { ...state, authData: action.data };

        case actionTypes.LOGOUT:
            localStorage.removeItem('profile');
            return { ...state, authdata: null };
        
        default:
            return state;
    }
}