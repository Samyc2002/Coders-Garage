import React, { useState } from 'react';
import Zoom from 'react-reveal/Zoom';
import { Grid, Avatar, Button, Typography, Paper, Grow } from '@material-ui/core';

import { useStyles } from './styles';

interface Iprops{
    user: any
}

const Profile = ({ user }: Iprops) => {;

    const classes = useStyles();

    const [open, setOpen] = useState(false);

    const toggleOpen = () => {
        setOpen(!open);
    }

    return (
        <>
            <Grid container direction="column" justifyContent="center" alignItems="center" spacing={3}>
                <Grid item xs={12}>
                    <Zoom>
                        <Avatar src={user?.data.formData.Image} alt={user?.data.formData.UserName} className={classes.avatar}/>
                    </Zoom>
                </Grid>
                <Grid item xs={12}>
                    <Grow in>
                        <Paper elevation={5} className={classes.paper}>
                            <div className={classes.main}>
                                <Typography variant="h6" color="primary" gutterBottom className={classes.heading}>
                                    Personal Details
                                </Typography>
                                <Button variant="contained" color="primary">
                                    <Typography variant="body1" className={classes.heading} onClick={toggleOpen}>
                                        Edit
                                    </Typography>
                                </Button>
                            </div>
                            <Typography variant="body1" gutterBottom className={classes.heading}>
                                Name: {user?.data.formData.Name}
                            </Typography>
                            <Typography variant="body1" gutterBottom className={classes.heading}>
                                UserName: {user?.data.formData.UserName}
                            </Typography>
                            <Typography variant="body1" gutterBottom className={classes.heading}>
                                Email: {user?.data.formData.Email}
                            </Typography>
                            <Typography variant="body1" gutterBottom className={classes.heading}>
                                Country: {user?.data.formData.Country}
                            </Typography>
                            <Typography variant="body1" gutterBottom className={classes.heading}>
                                State: {user?.data.formData.State}
                            </Typography>
                            <Typography variant="body1" gutterBottom className={classes.heading}>
                                City: {user?.data.formData.City}
                            </Typography>
                            <Typography variant="body1" gutterBottom className={classes.heading}>
                                Institute: {user?.data.formData.Institute}
                            </Typography>
                        </Paper>
                    </Grow>
                </Grid>
            </Grid>
        </>
    )
}

export default Profile;
