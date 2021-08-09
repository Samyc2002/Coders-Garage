import React, { useState } from 'react';
import * as yup from "yup";
import { useFormik } from "formik";
import FileBase64 from 'react-file-base64';
import { Button, Dialog, DialogContent, DialogTitle, Grid, TextField, Typography } from '@material-ui/core';

import { useStyles } from './styles';
import { updateUser } from '../../actions/auth';
import { useAppDispatch } from '../../Hooks/reduxHooks';

interface Iprops{
    open: boolean,
    toggleOpen: () => void
}

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
        .required('Password is required'),
    institute: yup
        .string(),
    country: yup
        .string(),
    state: yup
        .string(),
    city: yup
        .string()
});

const EditProfileDialog = ({ open, toggleOpen }: Iprops) => {

    const classes = useStyles();

    const dispatch = useAppDispatch();

    const [image, setImage] = useState(JSON.parse(localStorage.getItem('profile') as string)?.data.formData.Image);

    const formik = useFormik({
        initialValues: {
            firstname: JSON.parse(localStorage.getItem('profile') as string)?.data.formData.Name.split(' ')[0],
            lastname: JSON.parse(localStorage.getItem('profile') as string)?.data.formData.Name.split(' ')[1],
            username: JSON.parse(localStorage.getItem('profile') as string)?.data.formData.UserName,
            email: JSON.parse(localStorage.getItem('profile') as string)?.data.formData.Email,
            password: JSON.parse(localStorage.getItem('profile') as string)?.data.formData.Password,
            institute: JSON.parse(localStorage.getItem('profile') as string)?.data.formData.Institute,
            country: JSON.parse(localStorage.getItem('profile') as string)?.data.formData.Country,
            state: JSON.parse(localStorage.getItem('profile') as string)?.data.formData.State,
            city: JSON.parse(localStorage.getItem('profile') as string)?.data.formData.City
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            const res = {
                UserName: values.username,
                Password: values.password,
                Email: values.email,
                Name: values.firstname+' '+values.lastname,
                Institute: values.institute,
                Country: values.country,
                State: values.state,
                City: values.city,
                Image: image
            }
            alert(JSON.stringify(res, null, 2));
            try {
                dispatch(updateUser(res, JSON.parse(localStorage.getItem('profile') as string)?.data.token));
            } catch (error) {
                console.log(error);
            }
        },
    });

    return (
        <div>
            <Dialog open={open} onClose={toggleOpen} maxWidth="sm" fullWidth>
                <DialogTitle>
                    <Typography variant="h6" color="primary" className={classes.text}>
                        Update Profile
                    </Typography>
                </DialogTitle>
                <DialogContent>
                    <form onSubmit={formik.handleSubmit} className={classes.form}>
                        <Grid container spacing={2}>
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
                                    type="password"
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                    error={formik.touched.password && Boolean(formik.errors.password)}
                                    helperText={formik.touched.password && formik.errors.password}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    fullWidth
                                    id="institute"
                                    name="institute"
                                    label="Institute"
                                    type="institute"
                                    value={formik.values.institute}
                                    onChange={formik.handleChange}
                                    error={formik.touched.institute && Boolean(formik.errors.institute)}
                                    helperText={formik.touched.institute && formik.errors.institute}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    fullWidth
                                    id="country"
                                    name="country"
                                    label="Country"
                                    type="country"
                                    value={formik.values.country}
                                    onChange={formik.handleChange}
                                    error={formik.touched.country && Boolean(formik.errors.country)}
                                    helperText={formik.touched.country && formik.errors.country}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    fullWidth
                                    id="state"
                                    name="state"
                                    label="State"
                                    type="state"
                                    value={formik.values.state}
                                    onChange={formik.handleChange}
                                    error={formik.touched.state && Boolean(formik.errors.state)}
                                    helperText={formik.touched.state && formik.errors.state}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    fullWidth
                                    id="city"
                                    name="city"
                                    label="City"
                                    type="city"
                                    value={formik.values.city}
                                    onChange={formik.handleChange}
                                    error={formik.touched.city && Boolean(formik.errors.city)}
                                    helperText={formik.touched.city && formik.errors.city}
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
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default EditProfileDialog;
