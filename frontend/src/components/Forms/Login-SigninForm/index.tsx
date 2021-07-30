import React from 'react';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { useHistory } from 'react-router-dom';
import { Button, Grid, Paper, TextField, Typography, Grow } from '@material-ui/core';

import { useStyles } from './styles';
import { signIn } from '../../../actions/auth';
import google from '../../../assets/images/Google.png';
import { useAppDispatch } from '../../../Hooks/reduxHooks';

const validationSchema = yup.object({
    username: yup
      .string()
      .required('Username is required'),
    email: yup
      .string()
      .email('Enter a valid email')
      .required('Email is required'),
    password: yup
      .string()
      .min(8, 'Password should be of minimum 8 characters length')
      .required('Password is required'),
});

const LoginForm = () => {

    const classes = useStyles();

    const dispatch = useAppDispatch();

    const history = useHistory();

    const formik = useFormik({
        initialValues: {
            username: '',
            email: '',
            password: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            const res = {
                UserName: values.username,
                Email: values.email,
                Password: values.password
            }
            try {
                dispatch(signIn(res, history));
            } catch (error) {
                console.log(error);
            }
        },
    });

    return (
        <div>
            <Grow in timeout={3000}>
                <Paper className={classes.root}>
                    <form onSubmit={formik.handleSubmit}>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <Typography variant="h4" color="primary" className={classes.title}>
                                    LOGIN
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    fullWidth
                                    id="username"
                                    name="username"
                                    label="Username"
                                    value={formik.values.username}
                                    onChange={formik.handleChange}
                                    error={formik.touched.username && Boolean(formik.errors.username)}
                                    helperText={formik.touched.username && formik.errors.username}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    fullWidth
                                    id="email"
                                    name="email"
                                    label="Email"
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    error={formik.touched.email && Boolean(formik.errors.email)}
                                    helperText={formik.touched.email && formik.errors.email}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    fullWidth
                                    id="password"
                                    name="password"
                                    label="Password"
                                    type="password"
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                    error={formik.touched.password && Boolean(formik.errors.password)}
                                    helperText={formik.touched.password && formik.errors.password}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Button color="primary" variant="contained" fullWidth type="submit" className={classes.button} startIcon={<img src={google} alt="googleIcon" className={classes.image}/>}>
                                    Google Login
                                </Button>
                            </Grid>
                            <Grid item xs={12}>
                                <Button color="primary" variant="contained" fullWidth type="submit" className={classes.button}>
                                    Submit
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Paper>
            </Grow>
        </div>
    )
}

export default LoginForm;
