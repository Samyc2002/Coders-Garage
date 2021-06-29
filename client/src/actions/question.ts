import * as actionTypes from '../constants/actionTypes';
import * as api from '../api/index';

export const getQuestion = (formData: any) => async (dispatch: Function) => {

    try {
        
        const { data }: any = await api.getQuestion(formData);
        localStorage.setItem('tmp', JSON.stringify(data));
        dispatch({ type: actionTypes.GET_QUESTION, data: formData });
    } catch (error) {
        
        console.log(error);
    }
}

export const createQuestion = (formData: any) => async (dispatch: Function) => {

    try {
        
        const { data }: any = await api.getQuestion(formData);
        if(data.data === null) {

            const result: any = await api.createQuestion(formData);
            dispatch({ type: actionTypes.CREATE_QUESTION, data: { ...result.data.data } });
        }
        else {

            console.log('Question ID already exists');
        }
    } catch (error) {
        
        console.log(error);
    }
}

export const updateQuestion = (formData: any) => async(dispatch: Function) => {

    try {
        
        const { data }: any = await api.updateQuestion(formData);
        dispatch({ type: actionTypes.UPDATE_QUESTION, data: data.data });
    } catch (error) {
        
        console.log(error);
    }
}