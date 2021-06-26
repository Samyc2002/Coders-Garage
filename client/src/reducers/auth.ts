import { Reducer } from 'redux';

import * as actionTypes from '../constants/actionTypes';

export const authReducer: Reducer = (state = { authData: null }, action) => {
    switch(action.type) {
        case actionTypes.AUTH:
            localStorage.setItem('profile', JSON.stringify({ ...action?.data }));
            return { ...state, authData: action.data, loading: false, errors: null };

        case actionTypes.LOGOUT:
            localStorage.clear();
            console.log(action?.data);
            return { ...state, authdata: null };
        
        default:
            return state;
    }
}