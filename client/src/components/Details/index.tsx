import React, { useState } from 'react';
import { Alert } from '@material-ui/lab';
import { Button, Grid, Paper, Snackbar, TextField, Typography, Grow } from '@material-ui/core';

import { emailInterviewee } from '../../actions/interview';
import { useAppDispatch } from '../../Hooks/reduxHooks';
import { useStyles } from './styles';

interface Iprops{
    interview: any,
    me: any,
    call: any,
    callUser: any,
    answerCall: any,
    callAccepted: any,
    ready: boolean,
    setReady: React.Dispatch<React.SetStateAction<boolean>>,
    stream: any
    callEnded: any
}

interface SnackProps{
    open: boolean,
    toggleOpen: () => void
}

const SuccessSnack = ({ open, toggleOpen }: SnackProps) => (
    <Snackbar open={open} autoHideDuration={6000} onClose={toggleOpen}>
        <Alert severity="success">
            Email Sent!
        </Alert>
    </Snackbar>
)

const FailureSnack = ({ open, toggleOpen }: SnackProps) => (
    <Snackbar open={open} autoHideDuration={6000} onClose={toggleOpen}>
        <Alert severity="error">
            Sorry something went wrong!
        </Alert>
    </Snackbar>
)

const Details = ({ interview, me, call, callUser, answerCall, callAccepted, ready, setReady, stream, callEnded }: Iprops) => {

    const isInterviewer = (interview?.InterviewerEmail === JSON.parse(localStorage.getItem('profile') as string)?.data.formData.Email);

    const classes = useStyles();

    const [id, setId] = useState('');
    const [success, setSuccess] = useState(false);
    const [open, setOpen] = useState(false);

    const dispatch = useAppDispatch();

    const toggleOpen = () => {
        setOpen(!open);
    }

    const handleEmail = () => {
        const data = {
            IntervieweeEmail: interview?.IntervieweeEmail,
            InterviewerEmail: interview?.InterviewerEmail,
            id: me
        }
        try {
            dispatch(emailInterviewee(data))
            .then(() => {
                setSuccess(true);
                toggleOpen();
            });
        } catch (error) {
            console.log(error);
            setSuccess(false);
            toggleOpen();
        }
    }
    
    return (
        <div>
            <Grow in>
                <Paper elevation={3} className={classes.paper}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Typography variant="h6" className={classes.heading}>
                                Hey there! {isInterviewer?'Please email your interviewee with your id and wait for him. Once he connects, you can click ready!':`Please check your email for an email from our side containing your interviewer's id. Once you get it, copy it and paste in the text field below. Then once you see your interviewer, you can click ready!` }
                            </Typography>
                        </Grid>
                        {isInterviewer?(
                            <>
                                <Grid item xs={6}>
                                    <Button variant="contained" color="primary" fullWidth>
                                        <Typography variant="body1" className={classes.heading} onClick={handleEmail}>
                                            Email Interviewee
                                        </Typography>
                                    </Button>
                                </Grid>
                                <Grid item xs={6}>
                                    <Button variant="text" color="primary" fullWidth disabled={(!stream) || (!callAccepted && callEnded)}>
                                        <Typography variant="body1" className={classes.heading} onClick={() => setReady(true)}>
                                            Ready
                                        </Typography>
                                    </Button>
                                </Grid>
                                {call.isReceivingCall && !callAccepted && (
                                    <Grid item xs={12} className={classes.answerCall}>
                                        <Typography variant="h6" className={classes.heading}>Interviewee Came &nbsp; &nbsp;</Typography>
                                        <Button variant="contained" color="primary" onClick={answerCall}>
                                            <Typography variant="body1" className={classes.heading}>
                                                Answer
                                            </Typography>
                                        </Button>
                                    </Grid>
                                )}
                            </>
                        ):(
                            <>
                                <Grid item xs={12}>
                                    <TextField
                                        id="id"
                                        name="id"
                                        label="Enter Interviewer ID send by email"
                                        value={id}
                                        onChange={(e) => setId(e.target.value)}
                                        fullWidth
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <Button variant="contained" color="primary" fullWidth>
                                        <Typography variant="body1" className={classes.heading} onClick={() => callUser(id)}>
                                            Connect
                                        </Typography>
                                    </Button>
                                </Grid>
                                <Grid item xs={6}>
                                    <Button variant="text" color="primary" fullWidth>
                                        <Typography variant="body1" className={classes.heading} onClick={() => setReady(true)}>
                                            Ready
                                        </Typography>
                                    </Button>
                                </Grid>
                            </>
                        )}
                    </Grid>
                </Paper>
            </Grow>
            {success?<SuccessSnack open={open} toggleOpen={toggleOpen}/>:<FailureSnack open={open} toggleOpen={toggleOpen}/>}
        </div>
    )
}

export default Details;
