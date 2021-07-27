import React, { useState } from 'react';
import * as yup from 'yup';
import { useFormik } from 'formik';
import FileBase64 from 'react-file-base64';
import { Button, Grid, Paper, TextField, Typography } from '@material-ui/core';

import { useStyles } from './styles';

interface File{
	base64: string
}

const validationSchema = yup.object({
    firstname: yup
        .string()
        .required('First Name is required'),
    lastname: yup
        .string()
        .required('Last Name is required'),
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
      .required('Password is required')
});

const LoginForm = () => {

    const classes = useStyles();

    const [image, setImage] = useState('');

    const formik = useFormik({
        initialValues: {
            firstname: '',
            lastname: '',
            username: '',
            email: '',
            password: ''
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            const res = {
                ...values,
                image
            }
            alert(JSON.stringify(res, null, 2));
        },
    });

    return (
        <div>
            <Paper className={classes.root}>
                <form onSubmit={formik.handleSubmit}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Typography variant="h4" color="primary" className={classes.title}>
                                SIGNUP
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                id="firstname"
                                name="firstname"
                                label="First Name"
                                value={formik.values.firstname}
                                onChange={formik.handleChange}
                                error={formik.touched.firstname && Boolean(formik.errors.firstname)}
                                helperText={formik.touched.firstname && formik.errors.firstname}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                id="lastname"
                                name="lastname"
                                label="Last Name"
                                value={formik.values.lastname}
                                onChange={formik.handleChange}
                                error={formik.touched.lastname && Boolean(formik.errors.lastname)}
                                helperText={formik.touched.lastname && formik.errors.lastname}
                            />
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
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                error={formik.touched.password && Boolean(formik.errors.password)}
                                helperText={formik.touched.password && formik.errors.password}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Typography variant="subtitle1" color="primary" className={classes.text}>
                                Select Image
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FileBase64
                                type="file"
                                multiple={false}
                                onDone={({ base64 }: File) => setImage(base64)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button color="primary" variant="contained" fullWidth type="submit" className={classes.button}>
                                Submit
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </div>
    )
}

export default LoginForm;
