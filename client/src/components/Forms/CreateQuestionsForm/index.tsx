import React, { useState } from 'react';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { useHistory} from 'react-router-dom';
import { Button, Grid, Paper, TextField, Typography, Grow } from '@material-ui/core';

import { useAppDispatch } from '../../../Hooks/reduxHooks';
import { createQuestion } from '../../../actions/question';
import TestCasesDrawer from '../../TestCasesDrawer';
import TagsDialog from '../../TagsDialog';
import { useStyles } from './styles';
import Card from '../../Card';

import Success from '../../../assets/images/Success.png';

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
    constraints: yup
        .string()
        .required(),
    sampleInput: yup
        .string()
        .required('One sample input is required'),
    sampleOutput: yup
        .string()
        .required('One sample output is required'),
    explanation: yup
        .string(),
    timeLimit: yup
        .number()
        .required(),
    memoryLimit: yup
        .number()
        .required()
});

interface Testcase{
    input: string,
    output: string
}

const CreateQuestionsForm = () => {

    const classes = useStyles();

    const dispatch = useAppDispatch();

    const history = useHistory();

    const [open, setOpen] = useState(false);
    const [sidebar, setSidebar] = useState(false);
    const [loading, setLoading] = useState(false);
    const [details, setDetails] = useState<any>(null);
    const [tags, setTags] = useState([] as string[]);
    const [testcases, setTestcases] = useState([] as Testcase[]);
    const user = JSON.parse(localStorage.getItem('profile') as string);

    const formik = useFormik({
        initialValues: {
            questionId: '',
            problemStatement: '',
            input: '',
            output: '',
            sampleInput: '',
            sampleOutput: '',
            explanation: '',
            constraints: '',
            timeLimit: 2,
            memoryLimit: 100000
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            const res = {
                QuestionID: values.questionId,
                ProblemStatement: values.problemStatement,
                Input: values.input,
                Output: values.output,
                Constraints: values.constraints,
                SampleInput: values.sampleInput,
                SampleOutput: values.sampleOutput,
                Explanation: values.explanation,
                Creator: user?.data.formData.Email,
                Tags: tags,
                TimeLimit: values.timeLimit,
                MemoryLimit: values.memoryLimit,
                TestCases: testcases
            }
            setLoading(true);
            dispatch(createQuestion(res))
            .then(() => {
                setDetails(JSON.parse(localStorage.getItem('question') as string));
            });
        }
    });

    const toggleOpen = () => {
        setOpen(!open);
    }

    const toggleSidebar = () => {
        setSidebar(!sidebar);
    }

    return (
        <div className={classes.container}>
            <Grow in timeout={1000}>
                {loading?(
                    <div className={classes.card}>
                        <Card image={Success}  heading="Interview Scheduled Successfully" body={JSON.stringify(details, null, 2)}>
                            <Button variant="contained" className={classes.button} size="large" fullWidth onClick={() => history.goBack()}>
                                Okay
                            </Button>
                        </Card>
                    </div>
                ):(
                    <Paper elevation={5} className={classes.root}>
                        <form onSubmit={formik.handleSubmit}>
                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                    <Typography variant="h4" color="primary" className={classes.title}>
                                        CREATE QUESTION
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
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        fullWidth
                                        id="constraints"
                                        name="constraints"
                                        label="Constraints"
                                        multiline
                                        rows={2}
                                        value={formik.values.constraints}
                                        onChange={formik.handleChange}
                                        error={formik.touched.constraints && Boolean(formik.errors.constraints)}
                                        helperText={formik.touched.constraints && formik.errors.constraints}
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
                                    <TextField
                                        variant="outlined"
                                        fullWidth
                                        id="timeLimit"
                                        name="timeLimit"
                                        label="Time Limit (in seconds)"
                                        type="number"
                                        value={formik.values.timeLimit}
                                        onChange={formik.handleChange}
                                        error={formik.touched.timeLimit && Boolean(formik.errors.timeLimit)}
                                        helperText={formik.touched.timeLimit && formik.errors.timeLimit}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        variant="outlined"
                                        fullWidth
                                        id="memoryLimit"
                                        name="memoryLimit"
                                        label="Memory Limit (in bytes)"
                                        type="number"
                                        value={formik.values.memoryLimit}
                                        onChange={formik.handleChange}
                                        error={formik.touched.memoryLimit && Boolean(formik.errors.memoryLimit)}
                                        helperText={formik.touched.memoryLimit && formik.errors.memoryLimit}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Button color="primary" onClick={toggleOpen} fullWidth>
                                        <Typography variant="subtitle1" color="primary" className={classes.text}>
                                            Select Tags
                                        </Typography>
                                    </Button>
                                    <TagsDialog toggleOpen={toggleOpen} tags={tags} setTags={setTags} open={open} action={toggleOpen} actionTitle="Select"/>
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
                                        <Typography variant="subtitle1" className={classes.text}>
                                            Create Question
                                        </Typography>
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                        <TestCasesDrawer sidebar={sidebar} toggleSidebar={toggleSidebar} testcases={testcases} setTestcases={setTestcases}/>
                    </Paper>
                )}
            </Grow>
        </div>
    )
}

export default CreateQuestionsForm;
