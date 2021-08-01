import React, { useState } from 'react';
import clsx from 'clsx';
import axios from 'axios';
import useSound from 'use-sound';
import { useFormik } from 'formik';
import { Alert } from '@material-ui/lab';
import { Button, Drawer, Grid, TextField, useMediaQuery, Snackbar, CircularProgress } from '@material-ui/core';

import { getEnvironmentVariables } from '../../environments/env';
import SuccessSFX from '../../assets/sounds/Success.mp3';
import FailureSFX from '../../assets/sounds/Failure.mp3';
import { useStyles } from './styles';

interface Iprops{
    sidebar: boolean,
    toggleSidebar: () => void,
    language: string,
    code: string
}

const IdeDrawer = ({ sidebar, toggleSidebar, language, code }: Iprops) => {

    const isTabletorMobile = useMediaQuery('(max-width: 959px)');

    const classes = useStyles();

    const [successSound] = useSound(SuccessSFX, { volume: 1 });
    const [errorSound] = useSound(FailureSFX, { volume: 1 });

    const [time, setTime] = useState('');
    const [type, setType] = useState(true);
    const [memory, setMemory] = useState(0);
    const [open, setOpen] = useState(false);
    const [output, setOutput] = useState('');
    const [loading, setLoading] = useState(false);
    const message = type?`Compiled successfully in ${time} seconds and used ${memory} bytes memory!`:'Compilation Error!';

    const toggleOpen = () => {
        setOpen(!open);
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

    return (
        <div>
            <Drawer
                open={sidebar}
                onClose={toggleSidebar}
                anchor={isTabletorMobile?'bottom':'right'}
                variant="persistent"
            >
                <form onSubmit={formik.handleSubmit} className={classes.form}>
                    <Grid container spacing={3} className={classes.container}>
                        <Grid item xs={12}>
                            <div className={clsx({ [classes.toolbar]: !isTabletorMobile })}/>
                        </Grid>
                        <Grid item xs={12}>
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
                        <Grid item xs={12}>
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
                        <Grid item xs={12} sm={6}>
                            <Button variant="contained" color="primary" fullWidth type="submit" disabled={loading}>
                                {loading?(
                                    <CircularProgress variant="indeterminate"/>
                                ):'Run'}
                            </Button>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Button variant="text" color="primary" fullWidth onClick={toggleSidebar}>
                                Cancel
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
        </div>
    )
}

export default IdeDrawer;
