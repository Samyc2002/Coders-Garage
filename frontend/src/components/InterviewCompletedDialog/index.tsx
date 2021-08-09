import React from 'react';
import { useHistory } from 'react-router-dom';
import { Dialog, DialogContent, DialogTitle, Typography, DialogActions, Button, DialogContentText } from '@material-ui/core';

import { deleteInterview } from '../../actions/interview';
import { useAppDispatch } from '../../Hooks/reduxHooks';
import { useStyles } from './styles';

interface Iprops{
    open: boolean,
    RoomId: any
}

const InterviewCompletedDialog = ({ open, RoomId }: Iprops) => {

    const classes = useStyles();

    const dispatch = useAppDispatch();

    const history = useHistory();

    const handleClick = () => {
        try {
            dispatch(deleteInterview({ id: RoomId }))
            .then(() => {
                history.push('/interview_home');
            })
        } catch (error) {
            console.log(error);
        }
    }
    
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
                    <Button variant="contained" color="primary" onClick={handleClick}>
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
