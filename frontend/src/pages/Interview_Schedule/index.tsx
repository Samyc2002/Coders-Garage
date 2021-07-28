import React from 'react';

import Header from '../../components/Header';
import ScheduleInterviewForm from '../../components/Forms/ScheduleInterviewForm';
import { useStyles } from './styles';

const Interview_Schedule = () => {

    const classes = useStyles();

    return (
        <div>
            <Header/>
            <div className={classes.toolbar}/>
            <ScheduleInterviewForm/>
        </div>
    )
}

export default Interview_Schedule;
