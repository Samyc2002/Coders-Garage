import React, { useState } from 'react';
import clsx from 'clsx';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { useHistory } from 'react-router-dom';
import DateTimePicker from 'react-datetime-picker';
import { Button, Grid, Paper, TextField, Typography, Grow } from '@material-ui/core';

import { createInterview } from '../../../actions/interview';
import { useAppDispatch } from '../../../Hooks/reduxHooks';
import QuestionDrawer from '../../QuestionDialog';
import { useStyles } from './styles';
import Card from '../../Card';

import Success from '../../../assets/images/Success.png';

const validationSchema = yup.object({
    intervieweeEmail: yup
        .string()
        .required('Interviewee Email is required'),
    duration: yup
        .number()
        .min(60, 'Duration must be greater than 60 minutes')
        .required('Duration is required'),
    startTime: yup
        .date()
        .required('Start Time is required')
});

const ScheduleInterviewForm = () => {

    const classes = useStyles();

    const dispatch = useAppDispatch();

    const history = useHistory();

    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [details, setDetails] = useState<any>(null);
    const [questions, setQuestions] = useState([] as string[]);
    const user = JSON.parse(localStorage.getItem('profile') as string);
    const body = `Interview Scheduled by ${details?.InterviewerEmail} with ${details?.IntervieweeEmail} for ${details?.Duration} minutes at ${details?.StartTime}`;

    const formik = useFormik({
        initialValues: {
            intervieweeEmail: '',
            duration: 60,
            startTime: new Date()
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            const res = {
                RoomId: Math.random().toString(),
                InterviewerEmail: user?.data.formData.Email,
                IntervieweeEmail: values.intervieweeEmail,
                Duration: values.duration,
                StartTime: values.startTime.toISOString(),
                Questions: questions
            }
            setLoading(true);
            dispatch(createInterview(res))
            .then(() => {
                setDetails(JSON.parse(localStorage.getItem('interview') as string));
                localStorage.removeItem('interview');
            });
        }
    });

    const toggleOpen = () => {
        setOpen(!open);
    }

    return (
        <div className={classes.container}>
            <Grow in timeout={1000}>
                {loading?(
                    <div className={clsx(classes.center, classes.margin)}>
                        <Card image={Success}  heading="Interview Scheduled Successfully" body={body}>
                            <Button variant="contained" className={classes.button} size="large" fullWidth onClick={() => history.goBack()}>
                                Okay
                            </Button>
                        </Card>
                    </div>
                ):(
                    <Paper elevation={5} className={classes.root}>
                        <form onSubmit={formik.handleSubmit}>
                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                    <Typography variant="h4" color="primary" className={classes.title}>
                                        SCHEDULE INTERVIEW
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        fullWidth
                                        id="intervieweeEmail"
                                        name="intervieweeEmail"
                                        label="Interviewee Email"
                                        value={formik.values.intervieweeEmail}
                                        onChange={formik.handleChange}
                                        error={formik.touched.intervieweeEmail && Boolean(formik.errors.intervieweeEmail)}
                                        helperText={formik.touched.intervieweeEmail && formik.errors.intervieweeEmail}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        fullWidth
                                        id="duration"
                                        name="duration"
                                        label="Duration"
                                        type="number"
                                        value={formik.values.duration}
                                        onChange={formik.handleChange}
                                        error={formik.touched.duration && Boolean(formik.errors.duration)}
                                        helperText={formik.touched.duration && formik.errors.duration}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Typography variant="subtitle1" color="primary" className={classes.text}>
                                        Select Start Time and Date
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <DateTimePicker
                                        value={formik.values.startTime}
                                        dateFormat="MMMM d, yyyy"
                                        name="startTime"
                                        onChange={(date: Date) => formik.setFieldValue('startTime', date)}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        variant="outlined"
                                        fullWidth
                                        id="questions"
                                        name="questions"
                                        label="Questions Selected"
                                        disabled
                                        value={questions}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6} className={classes.center}>
                                    <Button color="primary" onClick={toggleOpen} fullWidth>
                                        <Typography variant="subtitle1" color="primary" className={classes.text}>
                                            Select Questions
                                        </Typography>
                                    </Button>
                                </Grid>
                                <Grid item xs={12}>
                                    <Button variant="contained" color="primary" fullWidth type="submit">
                                        <Typography variant="subtitle1" className={classes.text}>
                                            Schedule Interview
                                        </Typography>
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                    </Paper>
                )}
            </Grow>
            <QuestionDrawer questions={questions} setQuestions={setQuestions} open={open} toggleOpen={toggleOpen} userQuestions={user?.data.formData.questionsCreated}/>
        </div>
    )
}

export default ScheduleInterviewForm;
