import * as api from '../api';
import * as actionTypes from '../constants/actionTypes';

export const getInterview = (formData: any) => async (dispatch: Function) => {
    dispatch({ type: actionTypes.INTERVIEW_REQUEST });
    try {
        const { data } = await api.getInterview(formData);
        localStorage.setItem('interview', JSON.stringify(data.data));
        dispatch({ type: actionTypes.INTERVIEW_SUCCESS, payload: data.data});
    } catch (error) {
        dispatch({ type: actionTypes.INTERVIEW_FAILURE, payload: error });
        console.log(error);
    }
}

export const createInterview = (formData: any) => async (dispatch: Function) => {
    try {
        const { data } = await api.createInterview(formData);
        localStorage.setItem('interview', JSON.stringify(data.data));
    } catch (error) {
        console.log(error);
    }
}

export const deleteInterview = (formData: any) => async (dispatch: Function) => {
    try{
        await api.deleteInterview(formData);
        console.log('done');
    } catch (error) {
        console.log(error);
    }
}

export const emailInterviewee = (formData: any) => async (dispatch: Function) => {
    try{
        await api.emailInterviewee(formData);
    } catch(error) {
        console.log(error);
    }
}