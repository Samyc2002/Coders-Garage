import * as actionTypes from '../constants/actionTypes';
import * as api from '../api/index';

export const signIn = (formData: any, router: any) => async(dispatch: Function) => {

    try {

        const { data }: any = api.signIn(formData);
        dispatch({ type: actionTypes.AUTH, data });
        router.push('/');
    } catch (error) {

        console.log(error);
    }
}

export const signUp = (formData: any, router: any) => async(dispatch: Function) => {
    try {
        
        const { data }: any = api.signUp(formData);
        dispatch({ type: actionTypes.AUTH, data });
        router.push('/');
    } catch (error) {

        console.log(error);
    }
}