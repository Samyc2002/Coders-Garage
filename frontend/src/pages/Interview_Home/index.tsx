import React from 'react';
import { useHistory } from 'react-router';
import { Grid, Typography, useMediaQuery, Button, TextField } from '@material-ui/core';
import { HomeRounded as HomeRoundedIcon, Code as CodeIcon } from '@material-ui/icons';

import { useStyles } from './styles';
import Card from '../../components/Card';
import Header from '../../components/Header';
import AddIcon from '../../components/AddIcon';
import Logout from '../../components/LogoutButton';
import Profile from '../../components/DashboardButton';

const Interview_Home = () => {

    const schedule = 'https://images.unsplash.com/photo-1609266378844-4a8af6d72fab?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1868&q=80';
    const join = 'https://images.unsplash.com/photo-1495653797063-114787b77b23?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80';

    const isTabletorMobile = useMediaQuery('(max-width: 1279px)');

    const classes = useStyles(isTabletorMobile)();

    const history = useHistory();

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
                <Logout/>
                <Profile/>
            </Header>
            <div className={classes.toolbar}/>
            <Grid container direction="column" className={classes.container}>
                <Grid item>
                    <Typography variant={isTabletorMobile?'h4':'h2'} className={classes.text}>
                        Interview
                    </Typography>
                </Grid>
                <Grid container spacing={3} className={classes.cards}>
                    <Grid item xs={12} md={4} sm={6} xl={2}>
                        <Card image={schedule} body="Schedule an Interview">
                            <Button variant="contained" color="primary" onClick={() => history.push('/schedule')} fullWidth>
                                Schedule
                            </Button>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={4} sm={6} xl={2}>
                        <Card image={join} body="Join an Interview" fullWidth>
                            <Grid container spacing={3}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        id="roomId"
                                        name="roomId"
                                        label="Room ID"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Button variant="contained" color="primary" onClick={() => history.push('/join')} fullWidth>
                                        Join
                                    </Button>
                                </Grid>
                            </Grid>
                        </Card>
                    </Grid>
                </Grid>
            </Grid>
            <AddIcon elements={elements}/>
        </div>
    )
}

export default Interview_Home;
