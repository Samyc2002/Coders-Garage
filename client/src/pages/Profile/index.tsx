import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { Grid, Typography, useMediaQuery } from '@material-ui/core';

import QuestionsCreated from '../../components/QuestionsCreated';
import QuestionsSolved from '../../components/QuestionsSolved';
import LogoutButton from '../../components/LogoutButton';
import ProfileData from '../../components/Profile';
import Loading from '../../components/Loading';
import Header from '../../components/Header';
import { useStyles } from './styles';

const Profile = () => {

    const isTabletorMobile = useMediaQuery('(max-width: 1279px)');

    const classes = useStyles(isTabletorMobile)();
    
    const user = JSON.parse(localStorage.getItem('profile') as string);
    const [activeTab, setActiveTab] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 2000);
    }, [])

    return (
        <div>
            {loading?(
                <div>
                    <Loading/>
                </div>
            ):(
                <div>
                    <Header>
                        <LogoutButton/>
                        <div className={classes.headerTabs} onClick={() => setActiveTab(0)}>
                            <Typography variant="body1" className={clsx({ [classes.headerText]: (activeTab !== 0), [classes.headerActive]: (activeTab === 0) })}>
                                Dashboard
                            </Typography>
                            <div className={clsx({ [classes.headerBorder]: !isTabletorMobile && (activeTab === 0) })}/>
                        </div>
                    </Header>
                    <div className={classes.toolbar}/>
                    <div  className={classes.root}>
                        <Grid container spacing={3} className={classes.container}>
                            <Grid item xs={12} md={6} className={clsx(classes.vessel, { [classes.sticky]: !isTabletorMobile })}>
                                <ProfileData user={user} />
                            </Grid>
                            <Grid item xs={12} md={6} className={clsx({ [classes.hidden]: isTabletorMobile })}/>
                            <Grid item xs={12} md={6} className={classes.center}>
                                <QuestionsCreated user={user} />
                                <QuestionsSolved user={user} />
                            </Grid>
                        </Grid>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Profile;
