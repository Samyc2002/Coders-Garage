import React, { useState } from 'react';
import * as yup from 'yup';
import { useFormik } from 'formik';
import DateTimePicker from 'react-datetime-picker';
import { Button, Grid, Paper, TextField, Typography, Grow } from '@material-ui/core';

import QuestionDrawer from '../../QuestionDialog';
import { useStyles } from './styles';

const validationSchema = yup.object({
    interviewerEmail: yup
        .string()
        .required(),
    intervieweeEmail: yup
        .string()
        .required(),
    duration: yup
        .number()
        .required(),
    startTime: yup
        .date()
        .required()
});

const ScheduleInterviewForm = () => {

    const classes = useStyles();

    const [open, setOpen] = useState(false);
    const [questions, setQuestions] = useState([] as string[]);

    const formik = useFormik({
        initialValues: {
            interviewerEmail: '',
            intervieweeEmail: '',
            duration: 60,
            startTime: new Date()
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            alert(JSON.stringify(values, null, 2));
        }
    });

    const toggleOpen = () => {
        setOpen(!open);
    }

    return (
        <div className={classes.container}>
            <Grow in timeout={1000}>
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
                                    label="Questions"
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
            </Grow>
            <QuestionDrawer questions={questions} setQuestions={setQuestions} open={open} toggleOpen={toggleOpen}/>
        </div>
    )
}

export default ScheduleInterviewForm;
