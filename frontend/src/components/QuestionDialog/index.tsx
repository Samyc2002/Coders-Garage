import React from 'react';
import clsx from 'clsx';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, List, ListItem, ListItemText, Typography } from '@material-ui/core';

import { useStyles } from './styles';

interface Iprops{
    questions: string[],
    setQuestions: React.Dispatch<React.SetStateAction<string[]>>,
    open: boolean,
    toggleOpen: () => void,
    userQuestions: string[]
}

const QuestionDrawer = ({ questions, setQuestions, open, toggleOpen, userQuestions }: Iprops) => {

    const classes = useStyles();

    const changeQuestions = (val: string) => {
        if(!questions.includes(val)) {
            setQuestions([ ...questions, val ]);
        }
        else {
            setQuestions(questions.filter(question => question!==val));
        }
    }

    const cancel = () => {
        setQuestions([]);
        toggleOpen();
    }

    return (
        <div>
            <Dialog
                open={open}
                onClose={(event, reason) => {
                    if(!reason) {
                        toggleOpen();
                    }
                }}
                maxWidth="sm"
                fullWidth
            >
                <DialogTitle className={classes.listItem}>
                    Select Questions
                </DialogTitle>
                {(userQuestions.length === 1)?(
                    <DialogContent dividers>
                        <Typography className={classes.text}>
                            No Questions Created
                        </Typography>
                    </DialogContent>
                ):(
                    <DialogContent dividers>
                        <List>
                            {userQuestions.map((value) => (
                                <ListItem onClick={() => changeQuestions(value)} key={value} className={clsx(classes.listItem, { [classes.listItemSelected]: questions.includes(value) })}>
                                    <ListItemText>
                                        {value}
                                    </ListItemText>
                                </ListItem>
                            ))}
                        </List>
                    </DialogContent>
                )}
                <DialogActions>
                    <Button variant="contained" color="primary" size="large" onClick={toggleOpen}>
                        <Typography variant="subtitle1" className={classes.buttonText}>
                            Select
                        </Typography>
                    </Button>
                    <Button color="primary" size="large" onClick={cancel}>
                        <Typography variant="subtitle1" className={classes.buttonText}>
                            Cancel
                        </Typography>
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default QuestionDrawer;
