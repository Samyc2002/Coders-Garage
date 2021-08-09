import React from 'react';

import Header from '../../components/Header';
import CreateQuestionForm from '../../components/Forms/CreateQuestionsForm';
import { useStyles } from './styles';

const CreateQuestions = () => {

    const classes = useStyles();

    return (
        <div>
            <Header/>
            <div className={classes.toolbar}/>
            <CreateQuestionForm/>
        </div>
    )
}

export default CreateQuestions;
