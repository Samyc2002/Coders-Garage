import React, { useState } from 'react';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { Button, Grid, Paper, TextField, Typography } from '@material-ui/core';

import TestCasesDrawer from '../../TestCasesDrawer';
import TagsDialog from '../../TagsDialog';
import { useStyles } from './styles';

const validationSchema = yup.object({
    questionId: yup
        .string()
        .strict()
        .uppercase('Question ID must be in uppercase')
        .required('Question ID is required'),
    problemStatement: yup
        .string()
        .required('Problem Statement is required'),
    input: yup
        .string()
        .required('Input Description is required'),
    output: yup
        .string()
        .required('Output Description is required'),
    sampleInput: yup
        .string()
        .required('One sample input is required'),
    sampleOutput: yup
        .string()
        .required('One sample output is required'),
    explanation: yup
        .string()
});

interface Testcase{
    input: string,
    output: string
}

const CreateQuestionsForm = () => {

    const classes = useStyles();

    const [open, setOpen] = useState(false);
    const [tags, setTags] = useState([] as string[]);
    const [sidebar, setSidebar] = useState(false);
    const [testcases, setTestcases] = useState([] as Testcase[]);

    const formik = useFormik({
        initialValues: {
            questionId: '',
            problemStatement: '',
            input: '',
            output: '',
            sampleInput: '',
            sampleOutput: '',
            explanation: ''
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            alert(JSON.stringify(values, null, 2));
            createQuestion();
        }
    });

    const createQuestion = () => {
        // create a new question logic
    }

    const toggleOpen = () => {
        setOpen(!open);
    }

    const toggleSidebar = () => {
        setSidebar(!sidebar);
    }

    return (
        <div className={classes.container}>
            <Paper elevation={5} className={classes.root}>
                <form onSubmit={formik.handleSubmit}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Typography variant="h4" color="primary" className={classes.title}>
                                SIGNUP
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                id="questionId"
                                name="questionId"
                                label="Question ID"
                                value={formik.values.questionId}
                                onChange={formik.handleChange}
                                error={formik.touched.questionId && Boolean(formik.errors.questionId)}
                                helperText={formik.touched.questionId && formik.errors.questionId}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                id="problemStatement"
                                name="problemStatement"
                                label="Problem Statement"
                                multiline
                                rows={4}
                                value={formik.values.problemStatement}
                                onChange={formik.handleChange}
                                error={formik.touched.problemStatement && Boolean(formik.errors.problemStatement)}
                                helperText={formik.touched.problemStatement && formik.errors.problemStatement}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                id="input"
                                name="input"
                                label="Input Description"
                                multiline
                                rows={2}
                                value={formik.values.input}
                                onChange={formik.handleChange}
                                error={formik.touched.input && Boolean(formik.errors.input)}
                                helperText={formik.touched.input && formik.errors.input}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                id="output"
                                name="output"
                                label="Output Description"
                                multiline
                                rows={2}
                                value={formik.values.output}
                                onChange={formik.handleChange}
                                error={formik.touched.output && Boolean(formik.errors.output)}
                                helperText={formik.touched.output && formik.errors.output}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                id="sampleInput"
                                name="sampleInput"
                                label="Sample Input"
                                multiline
                                rows={4}
                                value={formik.values.sampleInput}
                                onChange={formik.handleChange}
                                error={formik.touched.sampleInput && Boolean(formik.errors.sampleInput)}
                                helperText={formik.touched.sampleInput && formik.errors.sampleInput}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                id="sampleOutput"
                                name="sampleOutput"
                                label="Sample Output"
                                multiline
                                rows={4}
                                value={formik.values.sampleOutput}
                                onChange={formik.handleChange}
                                error={formik.touched.sampleOutput && Boolean(formik.errors.sampleOutput)}
                                helperText={formik.touched.sampleOutput && formik.errors.sampleOutput}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                id="explanation"
                                name="explanation"
                                label="Explanation"
                                multiline
                                rows={2}
                                value={formik.values.explanation}
                                onChange={formik.handleChange}
                                error={formik.touched.explanation && Boolean(formik.errors.explanation)}
                                helperText={formik.touched.explanation && formik.errors.explanation}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Button color="primary" onClick={toggleOpen} fullWidth>
                                <Typography variant="subtitle1" color="primary" className={classes.text}>
                                    Select Tags
                                </Typography>
                            </Button>
                            <TagsDialog toggleOpen={toggleOpen} tags={tags} setTags={setTags} open={open} action={() => alert(JSON.stringify(tags, null, 2))} actionTitle="Select"/>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Button color="primary" onClick={toggleSidebar} fullWidth>
                                <Typography variant="subtitle1" color="primary" className={classes.text}>
                                    Add Test Cases
                                </Typography>
                            </Button>
                        </Grid>
                        <Grid item xs={12}>
                            <Button variant="contained" color="primary" fullWidth type="submit">
                                Create Question
                            </Button>
                        </Grid>
                    </Grid>
                </form>
                <TestCasesDrawer sidebar={sidebar} toggleSidebar={toggleSidebar} testcases={testcases} setTestcases={setTestcases}/>
            </Paper>
        </div>
    )
}

export default CreateQuestionsForm;
