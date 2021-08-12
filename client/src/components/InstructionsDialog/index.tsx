import React from 'react';
import { Dialog, DialogTitle, Typography, DialogContent, List, ListItem, ListItemText, DialogActions, Button } from '@material-ui/core';

import { useStyles } from './styles';

interface Iprops{
    open: boolean,
    toggleOpen: () => void
}

const InstructionsDialog = ({ open, toggleOpen}: Iprops) => {

    const classes = useStyles();

    const instructions = [
        'The default language selected is C++. Whenever starting a question, Write the question code and the language you are using as the first two comments in separate lines so that the interviewer knows what language you are using and what question you are solving currently.',
        'Whenever asking a question from interviewer, write them as comments and frame your question as clear as possible for the interviewer to understand. The interviewer will answer it as comments as well.',
        "Whatever be the matter, please don't leave the page unless you are sure that you want to end the interview. Once you leave, you can never come back again.",
        "In case of any support from the interviewer's side in case you leave the page by mistake, drop him an email. You will find his email ID in the to section of the email that gave you the Room ID",
        "After the time is over or your interview is completed (or in case you leave the page by accident or whatever reason), a dialog box will pop up confirming whether your interview was submitted successfully. Click on understood to return to the main page. If you reload or go back from browser, then your interview will be cancelled and it won't be evaluated afterwards."
    ];

    return (
        <div>
            <Dialog
                open={open}
                onClose={(event, reason) => {
                    if(!reason) {
                        toggleOpen();
                    }
                }}
                maxWidth='sm'
                fullWidth
            >
                <DialogTitle>
                    <Typography variant="h6" color="primary" className={classes.heading}>
                        Instructions
                    </Typography>
                </DialogTitle>
                <DialogContent>
                    <List component='ol'>
                        {instructions.map((value, index) => (
                            <ListItem component='li'>
                                <ListItemText>
                                    <Typography variant="body2" className={classes.text}>
                                        {`${index+1}. ${value}`}
                                    </Typography>
                                </ListItemText>
                            </ListItem>
                        ))}
                        <ListItem component='li'>
                            <ListItemText>
                                <Typography variant="body2" className={classes.text}>
                                    For any issues or problems, drop us an email at <a href="mailto:coders.garage.soi@gmail.com">coders.garage.soi@gmail.com</a>
                                </Typography>
                            </ListItemText>
                        </ListItem>
                        <ListItem component='li'>
                            <ListItemText>
                                <Typography variant="body2" className={classes.text}>
                                    To contribute to our project, please visit <a href="https://github.com/Samyc2002/Coders-Garage">github.com/Samyc2002/Coders-Garage</a> and read the README.md file before you start anything.
                                </Typography>
                            </ListItemText>
                        </ListItem>
                        <ListItem component='li'>
                            <ListItemText>
                                <Typography variant="body2" className={classes.text}>
                                    Good luck for the Interview :)
                                </Typography>
                            </ListItemText>
                        </ListItem>
                    </List>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" color="primary" onClick={toggleOpen}>
                        <Typography variant="body1" className={classes.heading}>
                            Understood
                        </Typography>
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default InstructionsDialog;
