import * as actionTypes from '../constants/actionTypes';

interface Action{
    type: string,
    data: any
}

export const authReducer = (action: Action, state = { authData: null }) => {
    switch(action?.type) {
        case actionTypes.AUTH:
            localStorage.setItem('profile', JSON.stringify({
                ...action?.data
            }));
            return { ...state, authData: action.data };

        case actionTypes.LOGOUT:
            localStorage.clear();
            return { ...state, authdata: null }
        
        default:
            return state;
    }
}