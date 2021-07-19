import * as api from '../api/index';
import { updateUser } from './auth';

export const getSubmissions = (formData: any) => async (dispatch: Function) => {

    try {
        
        const { data } = await api.getSubmissions(formData);
        localStorage.setItem('Submissions', JSON.stringify(data.data));
    } catch (error) {
        
        console.log(error);
    }
}

export const makeSubmission = (formData: any) => async (dispatch: Function) => {

    try {
        
        const { data } = await api.makeSubmission(formData);
        if(data.data !== null) {

            let user = JSON.parse(localStorage.getItem('profile') as string);

            if(!user?.formData.questionsSolved.includes(formData.QuestionID)) {

                user?.formData.questionsSolved.push(formData.QuestionID);
                dispatch(updateUser(user?.formData, user?.token));
            }
        }
        else {

            console.log('Something went wrong');
        }
    } catch (error) {
        
        console.log(error);
    }
}