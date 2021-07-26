import React from 'react';
import { Grid, Typography, useMediaQuery } from '@material-ui/core';

import { useStyles } from './styles';
import Header from '../../components/Header';
import Login from '../../components/Signin-LoginButton';
import SignupForm from '../../components/Forms/SignupForm';

const LoginSignin = () => {

    const isTabletorMobile = useMediaQuery('(max-width: 1279px)')

    const classes = useStyles(isTabletorMobile)();

    return (
        <div className={classes.root}>
            <Header>
                <Login/>
            </Header>
            <div className={classes.toolbar}/>
            <Grid container spacing={2} className={classes.container}>
                <Grid container direction="column" xs={12} sm={6}>
                    <Grid item>
                        <Typography variant={isTabletorMobile?'h4':'h2'} className={classes.text}>
                            Have a cup of code for
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant={isTabletorMobile?'h4':'h2'} className={classes.text}>
                            breakfast
                        </Typography>
                    </Grid>
                </Grid>
                <Grid item xs={12} md={6}>
                    <SignupForm />
                </Grid>
            </Grid>
        </div>
    )
}

export default LoginSignin;
