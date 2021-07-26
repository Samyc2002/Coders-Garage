import React, { useState } from 'react';
import { useFormik } from 'formik';
import { Button, Drawer, Grid, TextField, useMediaQuery } from '@material-ui/core';

import { useStyles } from './styles';

interface Iprops{
    sidebar: boolean,
    toggleSidebar: () => void,
    language: string
}

const IdeDrawer = ({ sidebar, toggleSidebar, language }: Iprops) => {

    const isTabletorMobile = useMediaQuery('(max-width: 600px)');

    const classes = useStyles();

    const [output, setOutput] = useState('');

    const formik = useFormik({
        initialValues: {
            input: ''
        },
        onSubmit: (values) => {
            const res = {
                ...values,
                output
            }
            alert(JSON.stringify(res, null, 2));
        }
    });

    return (
        <div>
            <Drawer
                open={sidebar}
                onClose={toggleSidebar}
                anchor={isTabletorMobile?'bottom':'right'}
                variant="persistent"
            >
                <form onSubmit={formik.handleSubmit} className={classes.form}>
                    <Grid container spacing={3} className={classes.container}>
                        <Grid item xs={12}>
                            <div className={classes.toolbar}/>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                id="input"
                                name="input"
                                label="Input"
                                multiline
                                rows={isTabletorMobile?5:16}
                                variant="outlined"
                                value={formik.values.input}
                                onChange={formik.handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                id="output"
                                name="output"
                                label="Output"
                                multiline
                                disabled
                                rows={isTabletorMobile?5:16}
                                variant="outlined"
                                value={output}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Button variant="contained" color="primary" fullWidth type="submit">
                                Run
                            </Button>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Button variant="text" color="primary" fullWidth onClick={toggleSidebar}>
                                Cancel
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Drawer>
        </div>
    )
}

export default IdeDrawer;
