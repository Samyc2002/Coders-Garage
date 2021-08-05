import React from 'react';
import { useHistory } from 'react-router-dom';
import { Dialog, DialogContent, DialogTitle, Typography, DialogActions, Button, DialogContentText } from '@material-ui/core';

import { useStyles } from './styles';

interface Iprops{
    open: boolean
}

const InterviewCompletedDialog = ({ open }: Iprops) => {

    const classes = useStyles();

    const history = useHistory();
    
    return (
        <div className={classes.root}>
            <Dialog open={open}>
                <DialogTitle>
                    <Typography variant="h6" color="primary" className={classes.text}>
                        Interview Completed
                    </Typography>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <Typography variant="body2" className={classes.text}>
                            Congratulations! your interview was successfully submitted.
                        </Typography>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" color="primary" onClick={() => history.push('/interview_home')}>
                        <Typography variant="body1" className={classes.text}>
                            Understood
                        </Typography>
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default InterviewCompletedDialog;
