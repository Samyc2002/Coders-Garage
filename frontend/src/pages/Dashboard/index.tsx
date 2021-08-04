import React, { useState, useEffect } from 'react';
import Fade from 'react-reveal/Fade';
import Zoom from 'react-reveal/Zoom';
import { Button, Grid, Typography, useMediaQuery } from '@material-ui/core';

import SigninLogin from '../../components/Signin-LoginButton';
import Signup from '../../components/SignupButton';
import Profile from '../../components/DashboardButton'
import Logout from '../../components/LogoutButton';
import { useHistory } from 'react-router-dom';
import Header from '../../components/Header';
import Card from '../../components/Card';
import { useStyles } from './styles';

import Home_Bg from '../../assets/images/Home_Bg.png';
import IDE_Bg from '../../assets/images/IDE_Bg.png';
import Interview_Bg from '../../assets/images/Interview_Bg.png';

const Dashboard = () => {

    const isTabletorMobile = useMediaQuery('(max-width: 1279px)');

    const isMobile = useMediaQuery('(max-width: 600px)');

    const classes = useStyles(isTabletorMobile, isMobile)();

    const history = useHistory();

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile') as string));

    useEffect(() => {
        if(user === null || undefined) {
            setUser(JSON.parse(localStorage.getItem('profile') as string));
        }
    }, [user]);

    return (
        <div className={classes.root}>
            <Header>
                {user?(
                    isTabletorMobile?(
                        <div className={classes.headerDiv}>
                            <Profile/>
                            <Logout/>
                        </div>
                    ):(
                        <div className={classes.headerDiv}>
                            <Logout/>
                            <Profile/>
                        </div>
                    )
                ):(
                    <div className={classes.headerDiv}>
                        <SigninLogin/>
                        <Signup/>
                    </div>
                    
                )}
            </Header>
            <div className={classes.toolbar}/>
            <Grid container direction="column" className={classes.container}>
                <Fade top>
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
                </Fade>
                <Grid container spacing={3} className={classes.cards}>
                    <Grid item xs={12} md={4} sm={6} xl={2} className={classes.card}>
                        <Fade right delay={1000}>
                            <Zoom delay={1000}>
                                <Card image={Home_Bg} body="A home page that contains everything you need">
                                    <Button variant="contained" className={classes.button} size="large" fullWidth onClick={() => history.push('/home')}>
                                        <Typography variant="h6" className={classes.typography}>
                                            Home
                                        </Typography>
                                    </Button>
                                </Card>
                            </Zoom>
                        </Fade>
                    </Grid>
                    <Grid item xs={12} md={4} sm={6} xl={2} className={classes.card}>
                        <Fade right delay={2000}>
                            <Zoom delay={2000}>
                                <Card image={IDE_Bg} body="An IDE where you can code your day off">
                                    <Button variant="contained" className={classes.button} size="large" fullWidth onClick={() => history.push('/ide')}>
                                        <Typography variant="h6" className={classes.typography}>
                                            IDE
                                        </Typography>
                                    </Button>
                                </Card>
                            </Zoom>
                        </Fade>
                    </Grid>
                    <Grid item xs={12} md={4} sm={6} xl={2} className={classes.card}>
                        <Fade right delay={3000}>
                            <Zoom delay={3000}>
                                <Card image={Interview_Bg} body="A place where you can practice for interview">
                                    <Button variant="contained" className={classes.button} size="large" fullWidth onClick={() => history.push('/interview_home')}>
                                        <Typography variant="h6" className={classes.typography}>
                                            Interview
                                        </Typography>
                                    </Button>
                                </Card>
                            </Zoom>
                        </Fade>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    )
}

export default Dashboard;
