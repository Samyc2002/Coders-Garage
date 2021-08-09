import React from 'react';
import { useHistory } from 'react-router-dom';
import { Dialog, DialogContent, DialogTitle, Typography, DialogActions, Button, DialogContentText } from '@material-ui/core';

import { handleLogout } from '../LogoutButton';
import { useStyles } from './styles';

const FormUnavailableDialog = () => {

    const classes = useStyles();

    const history = useHistory();

    return (
        <div className={classes.root}>
            <Dialog open>
                <DialogTitle>
                    <Typography variant="h6" color="primary" className={classes.text}>
                        Form Unavailable
                    </Typography>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <Typography variant="body2" className={classes.text}>
                            You are already Logged in. Please logout and try again to login with another account.
                        </Typography>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button variant="text" color="primary" onClick={handleLogout}>
                        <Typography variant="body1" className={classes.text}>
                            LOGOUT
                        </Typography>
                    </Button>
                    <Button variant="contained" color="primary" onClick={() => history.goBack()}>
                        <Typography variant="body1" className={classes.text}>
                            Cancel
                        </Typography>
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default FormUnavailableDialog;
