import React from 'react';
import { useHistory } from 'react-router-dom';
import { Dialog, DialogContent, DialogTitle, Typography, DialogActions, Button, DialogContentText } from '@material-ui/core';

import { useStyles } from './styles';

const UnauthorisedDialog = () => {

    const classes = useStyles();

    const history = useHistory();

    return (
        <div className={classes.root}>
            <Dialog open>
                <DialogTitle>
                    <Typography variant="h6" color="primary" className={classes.text}>
                        Unauthorised
                    </Typography>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <Typography variant="body2" className={classes.text}>
                            You need to be logged in to access this page. Please Login or Signup then try again.
                        </Typography>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button variant="text" color="primary" onClick={() => history.push('/signin')}>
                        <Typography variant="body1" className={classes.text}>
                            LOGIN
                        </Typography>
                    </Button>
                    <Button variant="contained" color="primary" onClick={() => history.push('/signup')}>
                        <Typography variant="body1" className={classes.text}>
                            SIGNUP
                        </Typography>
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default UnauthorisedDialog;
