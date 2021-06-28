import * as actionTypes from '../constants/actionTypes';
import * as api from '../api/index';

export const signIn = (formData: any, router: any) => async (dispatch: Function) => {

    try {

        const { data }: any = await api.signIn(formData);
        dispatch({ type: actionTypes.AUTH, data });
        router.push('/');
    } catch (error) {

        console.log(error);
    }
}

export const signUp = (formData: any, router: any) => async (dispatch: Function) => {

    try {
        
        const { data }: any = await api.signUp(formData);
        dispatch({ type: actionTypes.AUTH, data });
        router.push('/');
    } catch (error) {

        console.log(error);
    }
}

export const createUser = (formData: any, token: string) => async (dispatch: Function) => {

    try{

        const { data }: any = await api.getUser(formData);
        if(data.data === null) {
            const result: any = await api.createUser(formData);
            localStorage.setItem(('profile'), JSON.stringify({ formData: result.data.data, token }));
            dispatch({ type: actionTypes.CREATE, data: { ...result.data.data, token } });
        }
        else {
            localStorage.setItem(('profile'), JSON.stringify({ formData: data.data, token }));
            dispatch({ type: actionTypes.CREATE, data: { ...data.data, token } });
        }
    }
    catch(error) {

        console.log(error);
    }
}

export const updateUser = (formData: any, token: string) => async (dispatch: Function) => {

    try {
        
        const { data }: any = await api.updateUser(formData);
        localStorage.setItem(('profile'), JSON.stringify({ formData: data.data, token }));
        dispatch({ type: actionTypes.UPDATE, data: { ...data.data, token } });
    } catch (error) {

        console.log(error);
    }
}