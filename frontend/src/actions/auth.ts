import * as api from '../api';
import * as actionTypes from '../constants/actionTypes';

export const getUser = (formData: any, history: any) => async(dispatch: Function) => {
    dispatch({ type: actionTypes.LOGIN_REQUEST });
    try {
        const { data } = await api.getUser(formData);
        if(data.data === null) {
            dispatch({ type: actionTypes.LOGIN_FAILURE, payload: new Error('User does not exist') });
        }
        else {
            localStorage.setItem('profile', JSON.stringify({ data: data.data }));
            dispatch({ type: actionTypes.LOGIN_SUCCESS, payload: data.data });
            console.log(data.data);
            history.push('/');
        }
    } catch (error) {
        dispatch({ type: actionTypes.LOGIN_FAILURE, payload: error });
        console.log(error);
    }
}

export const signIn = (formData: any, history: any) => async (dispatch: Function) => {
    dispatch({ type: actionTypes.LOGIN_REQUEST });
    try {
        const { data } = await api.signIn(formData);
        if(data.data === null) {
            dispatch({ type: actionTypes.LOGIN_FAILURE, payload: new Error('User does not exist') });
        }
        else {
            localStorage.setItem('profile', JSON.stringify({ data: data.data }));
            dispatch({ type: actionTypes.LOGIN_SUCCESS, payload: data.data });
            console.log(data.data);
            history.push('/');
        }
    } catch (error) {
        dispatch({ type: actionTypes.LOGIN_FAILURE, payload: error });
        console.log(error);
    }
}

export const signUp = (formData: any, history: any) => async (dispatch: Function) => {
    dispatch({ type: actionTypes.LOGIN_REQUEST });
    try {
        const { data } = await api.createUser(formData);
        if(data.data === null) {
            dispatch({ type: actionTypes.LOGIN_FAILURE, payload: new Error('User already exists') });
        }
        else {
            localStorage.setItem('profile', JSON.stringify({ data: data.data }));
            dispatch({ type: actionTypes.LOGIN_SUCCESS, payload: data.data });
            console.log(data.data);
            history.push('/');
        }
    } catch (error) {
        dispatch({ type: actionTypes.LOGIN_FAILURE, payload: error });
        console.log(error);
    }
}