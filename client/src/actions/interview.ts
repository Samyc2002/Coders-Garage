import * as actionTypes from '../constants/actionTypes';
import * as api from '../api/index';

export const getInterview = () => async (dispatch: Function) => {

    try {
        
        const { data }: any = await api.getInterview();
        dispatch({ type: actionTypes.GET_INTERVIEW, data: data.data });
    } catch (error) {
        
        console.log(error);
    }
}

export const createInterview = (formData: any) => async (dispatch: Function) => {

    try {
        
        const { data }: any = await api.createInterview(formData);
        dispatch({ type: actionTypes.CREATE_INTERVIEW, data: data.data });
    } catch (error) {
        
        console.log(error);
    }
}