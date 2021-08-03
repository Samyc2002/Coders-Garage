import React, { useState } from 'react';
import axios from 'axios';
import useSound from 'use-sound';
import { useFormik } from 'formik';
import { Alert } from '@material-ui/lab';
import { Button, Drawer, Grid, TextField, useMediaQuery, Snackbar, CircularProgress } from '@material-ui/core';

import { getEnvironmentVariables } from '../../environments/env';
import { makeSubmission } from '../../actions/submission';
import SuccessSFX from '../../assets/sounds/Success.mp3';
import FailureSFX from '../../assets/sounds/Failure.mp3';
import { useAppDispatch } from '../../Hooks/reduxHooks';
import { useStyles } from './styles';

interface TC{
    input: string,
    output: string
}

interface Iprops{
    sidebar: boolean,
    toggleSidebar: () => void,
    language: string,
    code: string,
    testcases: TC[],
    TimeLimit: string,
    MemoryLimit: number,
    backup: TC,
    question: any
}

const IdeDrawer = ({ sidebar, toggleSidebar, language, code, testcases, TimeLimit, MemoryLimit, backup, question }: Iprops) => {

    const isTabletorMobile = useMediaQuery('(max-width: 959px)');

    const classes = useStyles();

    const dispatch = useAppDispatch();

    const [successSound] = useSound(SuccessSFX, { volume: 1 });
    const [errorSound] = useSound(FailureSFX, { volume: 1 });

    const [time, setTime] = useState('');
    const [type, setType] = useState(true);
    const [memory, setMemory] = useState(0);
    const [open, setOpen] = useState(false);
    const [output, setOutput] = useState('');
    const [loading, setLoading] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [TLE, setTLE] = useState(false);
    const [MLE, setMLE] = useState(false);
    const [CE, setCE] = useState(false);
    const [WA, setWA] = useState(false);
    const [err, setErr] = useState('');
    const [submission, setSubmission] = useState(false);
    const message = type?`Compiled successfully in ${time} seconds and used ${memory} bytes memory!`:'Compilation Error!';

    const toggleOpen = () => {
        setOpen(!open);
    }

    const toggleSubmission = () => {
        setSubmission(!submission);
    }

    const formik = useFormik({
        initialValues: {
            input: ''
        },
        onSubmit: (values) => {
            setLoading(true);
            axios({
                method: 'POST',
                url: `${getEnvironmentVariables().url}/create`,
                headers: {
                    'x-rapidapi-key': `${getEnvironmentVariables().apiKey}`,
                    'x-rapidapi-host': 'paiza-io.p.rapidapi.com',
                    'Content-Type': 'application/json'
                },
                data: JSON.stringify({
                    source_code: code,
                    language: language,
                    input: values.input
                })
            }).then((response) => {
                if(response.data.err !== null) {
                    setType(false);
                    errorSound();
                    setLoading(false);
                }
                setTimeout(() => {
                    axios.get(`${getEnvironmentVariables().url}/get_details`, {
                        params: {
                            id: response.data?.id
                        },
                        headers: {
                            'x-rapidapi-key': `${getEnvironmentVariables().apiKey}`,
                            'x-rapidapi-host': 'paiza-io.p.rapidapi.com'
                        }
                    })
                    .then((res) => {
                        setOutput(res.data?.stdout || res.data.build_stderr);
                        setTime(res.data.time);
                        setMemory(res.data.memory);
                        toggleOpen();
                        if(res.data.build_stderr) {
                            setType(false);
                            errorSound();
                            setLoading(false);
                        }
                        else {
                            setType(true);
                            successSound();
                            setLoading(false);
                        }
                    })
                    .catch((err) => console.log(err));
                }, 1000);
            });
        }
    });

    const getStatus = () => {
        if(CE) {
            return 'CE';
        }
        else if(TLE) {
            return 'TLE';
        }
        else if(MLE) {
            return 'MLE';
        }
        else if(WA) {
            return 'WA';
        }
        else{
            return 'AC';
        }
    }

    const compileRun = () => {
        setSubmitting(true);
        if(testcases.length === 0) {
            axios({
                method: 'POST',
                url: `${getEnvironmentVariables().url}/create`,
                headers: {
                    'x-rapidapi-key': `${getEnvironmentVariables().apiKey}`,
                    'x-rapidapi-host': 'paiza-io.p.rapidapi.com',
                    'Content-Type': 'application/json'
                },
                data: JSON.stringify({
                    source_code: code,
                    language: language,
                    input: backup.input
                })
            }).then((response) => {
                setTimeout(() => {
                    axios.get(`${getEnvironmentVariables().url}/get_details`, {
                        params: {
                            id: response.data?.id
                        },
                        headers: {
                            'x-rapidapi-key': `${getEnvironmentVariables().apiKey}`,
                            'x-rapidapi-host': 'paiza-io.p.rapidapi.com'
                        }
                    })
                    .then((res) => {
                        setTime(res.data.time);
                        setMemory(res.data.memory);
                        setCE(res.data.build_stderr === null);
                        setTLE(res.data.time > TimeLimit);
                        setMLE(res.data.memory > MemoryLimit);
                        setWA(res.data?.stdout !== backup.output);
                        if(CE) {
                            setErr('Compilation Error');
                        }
                        if(TLE) {
                            setErr('Time Limit Exceeded');
                        }
                        if(MLE) {
                            setErr('Memory Limit Exceeded');
                        }
                        if(WA) {
                            setErr('Wrong Answer');
                        }
                        toggleSubmission();
                        if(res.data.build_stderr) {
                            setType(false);
                            errorSound();
                            setSubmitting(false);
                        }
                        else {
                            setType(true);
                            successSound();
                            setSubmitting(false);
                        }
                    })
                    .catch((err) => console.log(err));
                }, 1000);
            });
        }
        for(let i of testcases) {
            if(err === '') {
                axios({
                    method: 'POST',
                    url: `${getEnvironmentVariables().url}/create`,
                    headers: {
                        'x-rapidapi-key': `${getEnvironmentVariables().apiKey}`,
                        'x-rapidapi-host': 'paiza-io.p.rapidapi.com',
                        'Content-Type': 'application/json'
                    },
                    data: JSON.stringify({
                        source_code: code,
                        language: language,
                        input: i.input
                    })
                }).then((response) => {
                    setTimeout(() => {
                        axios.get(`${getEnvironmentVariables().url}/get_details`, {
                            params: {
                                id: response.data?.id
                            },
                            headers: {
                                'x-rapidapi-key': `${getEnvironmentVariables().apiKey}`,
                                'x-rapidapi-host': 'paiza-io.p.rapidapi.com'
                            }
                        })
                        .then((res) => {
                            setTime(res.data.time);
                            setMemory(res.data.memory);
                            setCE(res.data.build_stderr === null);
                            setTLE(res.data.time > TimeLimit);
                            setMLE(res.data.memory > MemoryLimit);
                            setWA(res.data?.stdout !== i.output);
                            if(CE) {
                                setErr('Compilation Error');
                            }
                            if(TLE) {
                                setErr('Time Limit Exceeded');
                            }
                            if(MLE) {
                                setErr('Memory Limit Exceeded');
                            }
                            if(WA) {
                                setErr('Wrong Answer');
                            }
                            toggleSubmission();
                            if(res.data.build_stderr) {
                                setType(false);
                                errorSound();
                                setSubmitting(false);
                            }
                            else {
                                setType(true);
                                successSound();
                                setSubmitting(false);
                            }
                        })
                        .catch((err) => console.log(err));
                    }, 1000);
                });
            }
        }
        const Submission = {
            QuestionID: question.QuestionID,
            Creator: JSON.parse(localStorage.getItem('profile') as string)?.data.formData.Email,
            Code: code,
            Language: language,
            Status: getStatus()
        }
        dispatch(makeSubmission(Submission));
    }

    return (
        <div>
            <Drawer
                open={sidebar}
                onClose={toggleSidebar}
                anchor="bottom"
                variant="persistent"
            >
                <form onSubmit={formik.handleSubmit} className={classes.form}>
                    <Grid container spacing={3} className={classes.container}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                id="input"
                                name="input"
                                label="Input"
                                multiline
                                rows={isTabletorMobile?5:16}
                                variant="outlined"
                                value={formik.values.input}
                                onChange={formik.handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                id="output"
                                name="output"
                                label={type?'Output':'Error'}
                                multiline
                                disabled
                                rows={isTabletorMobile?5:16}
                                variant="outlined"
                                value={output}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <Button variant="outlined" color="primary" fullWidth type="submit" disabled={loading}>
                                {loading?(
                                    <CircularProgress variant="indeterminate"/>
                                ):'Run'}
                            </Button>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <Button variant="text" color="primary" fullWidth onClick={toggleSidebar}>
                                Cancel
                            </Button>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Button variant="contained" color="primary" fullWidth onClick={compileRun} disabled={loading || submitting}>
                                {submitting?(
                                    <CircularProgress variant="indeterminate"/>
                                ):'Submit'}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Drawer>
            <Snackbar open={open} autoHideDuration={6000} onClose={toggleOpen}>
                <Alert onClose={toggleOpen} severity={type?'success':'error'}>
                    {message}
                </Alert>
            </Snackbar>
            <Snackbar open={submission} autoHideDuration={6000} onClose={toggleSubmission}>
                <Alert onClose={toggleSubmission} severity={(err === '')?'success':'error'}>
                    {(err === '')?'Accepted':err}
                </Alert>
            </Snackbar>
        </div>
    )
}

export default IdeDrawer;
