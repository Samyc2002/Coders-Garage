import React from 'react';
import { useHistory } from 'react-router-dom';
import { Dialog, DialogTitle, Typography, DialogContent, DialogContentText, DialogActions, Button } from '@material-ui/core';

import { useStyles } from './styles';

const SmallScreenDialog = () => {

    const classes = useStyles();

    const history = useHistory();
    
    return (
        <div>
            <Dialog open>
                <DialogTitle>
                    <Typography variant="h6" color="primary" className={classes.text}>
                        Unable to load the page.
                    </Typography>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <Typography variant="body2" className={classes.text}>
                            Your screen size is too small to join an interview. Please use a laptop or desktop to join.
                        </Typography>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button variant="text" color="primary" onClick={() => history.goBack()}>
                        <Typography variant="body1" className={classes.text}>
                            Go Back
                        </Typography>
                    </Button>
                    <Button variant="contained" color="primary" onClick={() => history.push('/')}>
                        <Typography variant="body1" className={classes.text}>
                            Go to main page
                        </Typography>
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default SmallScreenDialog;
