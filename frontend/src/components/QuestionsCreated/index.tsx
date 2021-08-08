import React from 'react';
import { useHistory } from 'react-router-dom';
import { List, ListItem, ListItemText, Paper, Typography, Grow } from '@material-ui/core';

import { useStyles } from './styles';

interface Iprops{
    user: any,
}

const QuestionsCreated = ({ user }: Iprops) => {

    const classes = useStyles();

    const history = useHistory();

    const questions: any[] = user?.data.formData.questionsCreated;

    return (
        <div>
            <Grow in>
                <Paper elevation={3} className={classes.paper}>
                    <List>
                        <ListItem>
                            <ListItemText>
                                <Typography variant="h6" color="primary" className={classes.typography}>
                                    Questions Created
                                </Typography>
                            </ListItemText>
                        </ListItem>
                        {questions.map((value) => (
                            <>
                                {(value !== '') && (
                                    <ListItem button onClick={() => history.push(`/question/${value}`)}>
                                        <ListItemText>
                                            <Typography variant="body1" className={classes.typography}>
                                                {value}
                                            </Typography>
                                        </ListItemText>
                                    </ListItem>
                                )}
                            </>
                        ))}
                    </List>
                </Paper>
            </Grow>
        </div>
    )
}

export default QuestionsCreated;
