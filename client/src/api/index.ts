import axios from 'axios';

const API = axios.create({ baseURL: 'https://coders-garage.herokuapp.com/' });

API.interceptors.request.use((req) => {
    if(localStorage.getItem('profile')) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile') as string).token}`;
    }
    return req;
});

export const getUser = (formData: any) => API.post('/user/data', formData);
export const createUser = (formData: any) => API.post('/user', formData);
export const updateUser = (formData: any) => API.put('/user', formData);

export const signIn = (formData: any) => API.post('/auth/signin', formData);
export const signUp = (formData: any) => API.post('/auth/signup', formData);

export const fetchQuestions = () => API.get('/question');
export const getQuestion = (formData: any) => API.post('/question/data', formData);
export const createQuestion = (formData: any) => API.post('/question', formData);
export const updateQuestion = (formData: any) => API.put('/question', formData);
export const getQuestionByTags = (formData: any) => API.post('/question/tags', formData);

export const getInterview = (formData: any) => API.post('/interview/data', formData);
export const createInterview = (formData: any) => API.post('/interview', formData);
export const emailInterviewee = (formData: any) => API.post('/interview/email', formData);
export const deleteInterview = (formdata: any) => API.post('/interview/delete', formdata);

export const getSubmissions = (formData: any) => API.get(`/submission/${formData.Creator}`);
export const makeSubmission = (formData: any) => API.post('/submission', formData);