import React from 'react';
import clsx from 'clsx';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { Button, Drawer, Grid, TextField, useMediaQuery } from '@material-ui/core';

import { useStyles } from './styles';

const validationSchema = yup.object({
    input: yup
        .string(),
    output: yup
        .string()
        .required('Output is required')
});

interface Testcase{
    input: string,
    output: string
}

interface Iprops{
    sidebar: boolean,
    toggleSidebar: () => void,
    testcases: Testcase[],
    setTestcases: React.Dispatch<React.SetStateAction<Testcase[]>>
}

const TestCasesDrawer = ({ sidebar, toggleSidebar, testcases, setTestcases }: Iprops) => {

    const isTabletorMobile = useMediaQuery('(max-width: 959px)');

    const classes = useStyles();

    const formik = useFormik({
        initialValues: {
            input: '',
            output: ''
        },
        validationSchema: validationSchema,
        onSubmit: (values, actions) => {
            alert(JSON.stringify(values, null, 2));
            setTestcases([ ...testcases, values ]);
            actions.resetForm();
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
                            <div className={clsx({ [classes.toolbar]: !isTabletorMobile })}/>
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
                                error={formik.touched.input && Boolean(formik.errors.input)}
                                helperText={formik.touched.input && formik.errors.input}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                id="output"
                                name="output"
                                label="Output"
                                multiline
                                rows={isTabletorMobile?5:16}
                                variant="outlined"
                                value={formik.values.output}
                                onChange={formik.handleChange}
                                error={formik.touched.output && Boolean(formik.errors.output)}
                                helperText={formik.touched.output && formik.errors.output}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Button variant="contained" color="primary" fullWidth type="submit">
                                Add Another
                            </Button>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Button variant="text" color="primary" fullWidth onClick={toggleSidebar}>
                                Done
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Drawer>
        </div>
    )
}

export default TestCasesDrawer;
