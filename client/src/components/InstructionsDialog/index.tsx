import React from 'react';
import { Dialog, DialogTitle, Typography, DialogContent, List, ListItem, ListItemText, DialogActions, Button } from '@material-ui/core';

import { useStyles } from './styles';

interface Iprops{
    open: boolean,
    toggleOpen: () => void
}

const InstructionsDialog = ({ open, toggleOpen}: Iprops) => {

    const classes = useStyles();

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
                        <ListItem component='li'>
                            <ListItemText>
                                <Typography>
                                    Some Instructions
                                </Typography>
                            </ListItemText>
                        </ListItem>
                        <ListItem component='li'>
                            <ListItemText>
                                <Typography>
                                    Some Instructions
                                </Typography>
                            </ListItemText>
                        </ListItem>
                        <ListItem component='li'>
                            <ListItemText>
                                <Typography>
                                    Some Instructions
                                </Typography>
                            </ListItemText>
                        </ListItem>
                        <ListItem component='li'>
                            <ListItemText>
                                <Typography>
                                    Some Instructions
                                </Typography>
                            </ListItemText>
                        </ListItem>
                        <ListItem component='li'>
                            <ListItemText>
                                <Typography>
                                    Some Instructions
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
