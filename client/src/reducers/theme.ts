import { Reducer } from 'redux';

import * as actionTypes from '../constants/actionTypes';

export const themeReducer: Reducer = (state = { theme: false }, action) => {

    const theme = state.theme;

    if(action.type === actionTypes.THEME) {
        return { ...state, theme: !theme }
    }
    else {
        return state;
    }
}