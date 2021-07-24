import React from 'react';
import { Button, Grid, Typography, useMediaQuery } from '@material-ui/core';

import SigninLogin from '../../components/Signin-LoginButton';
import Signup from '../../components/SignupButton';
// import Profile from '../../components/DashboardButton'
// import Logout from '../../components/LogoutButton';
import { useHistory } from 'react-router-dom';
import Header from '../../components/Header';
import Card from '../../components/Card';
import { useStyles } from './styles';

import Home_Bg from '../../assets/images/Home_Bg.png';
import IDE_Bg from '../../assets/images/IDE_Bg.png';
import Interview_Bg from '../../assets/images/Interview_Bg.png';

const Dashboard = () => {

    const isTabletorMobile = useMediaQuery('(max-width: 600px)')

    const classes = useStyles();

    const history = useHistory();

    return (
        <div className={classes.root}>
            <Header>
                <SigninLogin/>
                <Signup/>
                {/* <Logout/>
                <Profile/> */}
            </Header>
            <div className={classes.toolbar}/>
            <Grid container direction="column" className={classes.container}>
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
                <Grid container spacing={3} className={classes.cards}>
                    <Grid item xs={12} sm={2}>
                        <Card image={Home_Bg} body="A home page that contains everything you need">
                            <Button variant="contained" className={classes.button} size="large" fullWidth onClick={() => history.push('/home')}>
                                <Typography variant="h6" className={classes.typography}>
                                    Home
                                </Typography>
                            </Button>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                        <Card image={IDE_Bg} body="A home page that contains everything you need">
                            <Button variant="contained" className={classes.button} size="large" fullWidth onClick={() => history.push('/ide')}>
                                <Typography variant="h6" className={classes.typography}>
                                    IDE
                                </Typography>
                            </Button>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                        <Card image={Interview_Bg} body="A home page that contains everything you need">
                            <Button variant="contained" className={classes.button} size="large" fullWidth onClick={() => history.push('/interview_home')}>
                                <Typography variant="h6" className={classes.typography}>
                                    Interview
                                </Typography>
                            </Button>
                        </Card>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    )
}

export default Dashboard;
