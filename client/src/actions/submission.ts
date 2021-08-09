import * as api from '../api';
import * as actionTypes from '../constants/actionTypes';

export const getSubmissions = (formData: any) => async (dispatch: Function) => {
    dispatch({ type: actionTypes.SUBMISSION_REQUEST });
    try {
        const { data } = await api.getSubmissions(formData);
        localStorage.setItem('submission', JSON.stringify(data.data));
        dispatch({ type: actionTypes.SUBMISSION_SUCCESS, payload: data.data});
    } catch (error) {
        dispatch({ type: actionTypes.SUBMISSION_FAILURE, payload: error });
        console.log(error);
    }
}

export const makeSubmission = (formData: any) => async (dispatch: Function) => {
    dispatch({ type: actionTypes.SUBMISSION_REQUEST });
    try {
        const { data } = await api.createQuestion(formData);
        localStorage.setItem('submission', JSON.stringify(data.data));
        dispatch({ type: actionTypes.SUBMISSION_SUCCESS, payload: data.data });
    } catch (error) {
        dispatch({ type: actionTypes.SUBMISSION_FAILURE, payload: error });
        console.log(error);
    }
}