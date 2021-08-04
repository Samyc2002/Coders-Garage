import React from 'react';
import Fade from 'react-reveal/Fade';
import Zoom from 'react-reveal/Zoom';
import { useHistory } from 'react-router';
import { Grid, Typography, useMediaQuery, Button, TextField } from '@material-ui/core';
import { HomeRounded as HomeRoundedIcon, Code as CodeIcon } from '@material-ui/icons';

import { useStyles } from './styles';
import Card from '../../components/Card';
import Header from '../../components/Header';
import AddIcon from '../../components/AddIcon';
import Signup from '../../components/SignupButton';
import Logout from '../../components/LogoutButton';
import Profile from '../../components/DashboardButton';
import SigninLogin from '../../components/Signin-LoginButton';

import schedule from '../../assets/images/schedule.png';
import join from '../../assets/images/join.png';

const Interview_Home = () => {

    const isTabletorMobile = useMediaQuery('(max-width: 1279px)');

    const isMobile = useMediaQuery('(max-width: 600px)')

    const classes = useStyles(isTabletorMobile, isMobile)();

    const history = useHistory();

    const user = JSON.parse(localStorage.getItem('profile') as string);

    const elements = [
        {
            icon: <CodeIcon/>,
            title: 'IDE',
            action: () => history.push('/ide')
        },
        {
            icon: <HomeRoundedIcon/>,
            title: 'Home',
            action: () => history.push('/home')
        }
    ]

    return (
        <div>
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
                            Interview
                        </Typography>
                    </Grid>
                </Fade>
                <Grid container spacing={3} className={classes.cards}>
                    <Grid item xs={12} md={4} sm={6} xl={2}>
                        <Fade left delay={2000}>
                            <Zoom delay={2000}>
                                <Card image={schedule} body="Schedule an Interview">
                                    <Button variant="contained" color="primary" onClick={() => history.push('/schedule')} fullWidth>
                                        Schedule
                                    </Button>
                                </Card>
                            </Zoom>
                        </Fade>
                    </Grid>
                    <Grid item xs={12} md={4} sm={6} xl={2}>
                        <Fade left delay={1000}>
                            <Zoom delay={1000}>
                                <Card image={join} body="Join an Interview" fullWidth>
                                    <Grid container spacing={3} justifyContent="center" alignItems="center">
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                id="roomId"
                                                name="roomId"
                                                label="Room ID"
                                                variant="outlined"
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <Button variant="contained" color="primary" onClick={() => history.push('/interview')} fullWidth>
                                                Join
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </Card>
                            </Zoom>
                        </Fade>
                    </Grid>
                </Grid>
            </Grid>
            <AddIcon elements={elements}/>
        </div>
    )
}

export default Interview_Home;
