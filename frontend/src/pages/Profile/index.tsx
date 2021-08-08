import React, { useState } from 'react';
import clsx from 'clsx';
import { Typography, useMediaQuery } from '@material-ui/core';

import QuestionsCreated from '../../components/QuestionsCreated';
import QuestionsSolved from '../../components/QuestionsSolved';
import ProfileData from '../../components/Profile';
import Header from '../../components/Header';
import { useStyles } from './styles';

const Profile = () => {

    const isTabletorMobile = useMediaQuery('(max-width: 1279px)');

    const classes = useStyles(isTabletorMobile)();
    
    const [activeTab, setActiveTab] = useState(0);
    const user = JSON.parse(localStorage.getItem('profile') as string);

    const Tabs = [ <ProfileData user={user} />, <QuestionsCreated />, <QuestionsSolved /> ];

    return (
        <div>
            <Header>
                <div className={classes.headerTabs} onClick={() => setActiveTab(0)}>
                    <Typography variant="body1" className={clsx({ [classes.headerText]: (activeTab !== 0), [classes.headerActive]: (activeTab === 0) })}>
                        Profile
                    </Typography>
                    <div className={clsx({ [classes.headerBorder]: !isTabletorMobile && (activeTab === 0) })}/>
                </div>
                <div className={classes.headerTabs} onClick={() => setActiveTab(1)}>
                    <Typography variant="body1" className={clsx({ [classes.headerText]: (activeTab !== 1), [classes.headerActive]: (activeTab === 1) })}>
                        Questions Created
                    </Typography>
                    <div className={clsx({ [classes.headerBorder]: !isTabletorMobile && (activeTab === 1) })}/>
                </div>
                <div className={classes.headerTabs} onClick={() => setActiveTab(2)}>
                    <Typography variant="body1" className={clsx({ [classes.headerText]: (activeTab !== 2), [classes.headerActive]: (activeTab === 2) })}>
                        Questions Solved
                    </Typography>
                    <div className={clsx({ [classes.headerBorder]: !isTabletorMobile && (activeTab === 2) })}/>
                </div>
            </Header>
            <div className={classes.toolbar}/>
            {Tabs[activeTab]}
        </div>
    )
}

export default Profile;
