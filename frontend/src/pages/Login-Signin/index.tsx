import React from 'react';
import { Grid, Typography, useMediaQuery } from '@material-ui/core';

import { useStyles } from './styles';
import Header from '../../components/Header';
import Signup from '../../components/SignupButton';
import LoginForm from '../../components/Forms/Login-SigninForm';

const LoginSignin = () => {

    const isTabletorMobile = useMediaQuery('(max-width: 1279px)')

    const classes = useStyles(isTabletorMobile)();

    return (
        <div className={classes.root}>
            <Header>
                <Signup/>
            </Header>
            <div className={classes.toolbar}/>
            <Grid container className={classes.container}>
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
                    <LoginForm />
                </Grid>
            </Grid>
        </div>
    )
}

export default LoginSignin;
