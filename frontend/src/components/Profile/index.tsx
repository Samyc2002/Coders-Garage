import React from 'react';
import { Grid, Avatar, Button, Typography, Paper } from '@material-ui/core';

import { useStyles } from './styles';

interface Iprops{
    user: any
}

const Profile = ({ user }: Iprops) => {;

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Grid container>
                <Grid item xs={12} sm={6}>
                    <Grid container direction="column" justifyContent="center" alignItems="center" spacing={3}>
                        <Grid item xs={12}>
                            <Avatar src={user?.data.formData.Image} alt={user?.data.formData.UserName} className={classes.avatar}/>
                        </Grid>
                        <Grid item xs={12}>
                            <Button variant="contained" color="primary" fullWidth>
                                <Typography variant="body1" className={classes.heading}>
                                    Edit
                                </Typography>
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Grid container direction="column" justifyContent="center" alignItems="center" spacing={3}>
                        <Grid item xs={12}>
                            <Paper elevation={5} className={classes.paper}>
                                <Typography variant="h6" color="primary" gutterBottom className={classes.heading}>
                                    Personal Details
                                </Typography>
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
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    )
}

export default Profile;
