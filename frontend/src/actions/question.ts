import * as api from '../api';
import * as actionTypes from '../constants/actionTypes';

export const fetchQuestions = () => async (dispatch: Function) => {
    dispatch({ type: actionTypes.QUESTION_REQUEST });
    try {
        const { data } = await api.fetchQuestions();
        localStorage.setItem('questions', JSON.stringify(data.data));
        dispatch({ type: actionTypes.QUESTION_SUCCESS, payload: data.data});
    } catch (error) {
        dispatch({ type: actionTypes.QUESTION_FAILURE, payload: error });
        console.log(error);
    }
}

export const getQuestion = (formData: any) => async (dispatch: Function) => {
    dispatch({ type: actionTypes.QUESTION_REQUEST });
    try {
        const { data } = await api.getQuestion(formData);
        dispatch({ type: actionTypes.QUESTION_SUCCESS, payload: data.data});
    } catch (error) {
        dispatch({ type: actionTypes.QUESTION_FAILURE, payload: error });
        console.log(error);
    }
}

export const createQuestion = (formData: any) => async (dispatch: Function) => {
    dispatch({ type: actionTypes.POST_QUESTION_REQUEST });
    try {
        const result = await api.getQuestion(formData);
        if(result.data.data !== null) {
            dispatch({ type: actionTypes.POST_QUESTION_FAILURE, payload: new Error('Question ID already exists!') });
            console.log('Question ID already exists!');
        }
        else {
            const { data } = await api.createQuestion(formData);
            localStorage.setItem('question', JSON.stringify(data.data));
            dispatch({ type: actionTypes.POST_QUESTION_SUCCESS, payload: data.data });
        }
    } catch (error) {
        dispatch({ type: actionTypes.POST_QUESTION_FAILURE, payload: error });
        console.log(error);
    }
}