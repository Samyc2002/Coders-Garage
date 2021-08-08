import React, { useState, useEffect } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Close as CloseIcon,  FileCopy as FileCopyIcon } from '@material-ui/icons';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Snackbar, IconButton, Grow } from '@material-ui/core';

import { useAppDispatch } from '../../Hooks/reduxHooks';
import { getSubmissions } from '../../actions/submission';
import { useStyles } from './styles';

interface Iprops{
    user: any
}

const QuestionsSolved = ({ user }: Iprops) => {

    const classes = useStyles();

    const dispatch = useAppDispatch();

    const [copied, setCopied] = useState(false);
    const [questions, setQuestions] = useState([] as any[]);

    useEffect(() => {
        try{
            dispatch(getSubmissions({ Creator: user?.data.formData.Email }))
            .then(() => {
                setQuestions(JSON.parse(localStorage.getItem('submission') as string));
                localStorage.removeItem('submission');
            });
        } catch(error) {
            console.log(error);
        }
    }, [dispatch, user?.data.formData.Email]);

    return (
        <div>
            <Grow in>
                <TableContainer elevation={3} component={Paper} classes={{ root: classes.paper }}>
                    <Typography variant="h6" color="primary" className={classes.typography}>
                        Submissions
                    </Typography>
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Question ID</TableCell>
                                <TableCell align="center">Language</TableCell>
                                <TableCell align="center">Status</TableCell>
                                <TableCell align="center">Code</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {questions.map((question) => (
                                <TableRow key={question._id}>
                                    <TableCell component="th" scope="row">
                                        {question.QuestionID}
                                    </TableCell>
                                    <TableCell align="center">{question.Language}</TableCell>
                                    <TableCell align="center">{question.Status}</TableCell>
                                    <TableCell align="center">
                                        <CopyToClipboard text={question.Code} onCopy={() => setCopied(true)}>
                                            <IconButton>
                                                <FileCopyIcon/>
                                            </IconButton>
                                        </CopyToClipboard>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grow>
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                open={copied}
                autoHideDuration={6000}
                onClose={() => setCopied(false)}
                message="Copied to Clipboard"
                action={
                    <React.Fragment>
                        <IconButton size="small" aria-label="close" color="inherit" onClick={() => setCopied(false)}>
                            <CloseIcon fontSize="small" />
                        </IconButton>
                    </React.Fragment>
                }
            />
        </div>
    )
}

export default QuestionsSolved;
