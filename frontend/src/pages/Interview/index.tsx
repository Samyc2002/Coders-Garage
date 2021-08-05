import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import useSound from 'use-sound';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { FormControl, IconButton, InputLabel, MenuItem, Select, Grid, Typography, Snackbar } from '@material-ui/core';
import { Brightness7Rounded as Brightness7RoundedIcon, Brightness4Rounded as Brightness4RoundedIcon, RotateLeftRounded as RotateLeftRoundedIcon, PlayArrowRounded as PlayArrowRoundedIcon, Close as CloseIcon,  FileCopy as FileCopyIcon } from '@material-ui/icons';

import InterviewCompletedDialog from '../../components/InterviewCompletedDialog';
import IdeDrawer from '../../components/Submission_IDE_Drawer';
import { ContextProvider } from '../../config/SocketContext';
import { useAppDispatch } from '../../Hooks/reduxHooks';
import useLocalStorage from '../../Hooks/useLocalStore';
import SwitchSFX from '../../assets/sounds/Switch.mp3';
import { getInterview } from '../../actions/interview';
import { getQuestion } from '../../actions/question';
import Loading from '../../components/Loading';
import Header from '../../components/Header';
import IDE from '../../components/IDE';
import { useStyles } from './styles';

const Interview = (props: any) => {

    const classes = useStyles();

    const dispatch = useAppDispatch();

    const [switchSound] = useSound(SwitchSFX, { volume: 1 });

    const [index, setIndex] = useState(1);
    const [light, setLight] = useState(false);
    const [copied, setCopied] = useState(false);
    const [loading , setLoading] = useState(true);
    const [sidebar, setSidebar] = useState(false);
    const [questionNo, setQuestionNo] = useState(0);
    const [interviewCompleted, setInterviewCompleted] = useState(false);
    const [code, setCode] = useLocalStorage('code', `interview${props.match.params.id}`);
    const [question, setQuestion] = useState(JSON.parse(localStorage.getItem('question') as string));
    const [interview, setInterview] = useState(JSON.parse(localStorage.getItem('interview') as string));

    useEffect(() => {
        try {
            dispatch(getInterview({ RoomId: props.match.params.id }))
            .then(() => {
                setInterview(JSON.parse(localStorage.getItem('interview') as string));
                localStorage.removeItem('interview');
                setLoading(false);
            });
        } catch (error) {
            console.log(error);
        }
    }, [dispatch, interview.Questions, props.match.params.id]);

    useEffect(() => {
        try {
            dispatch(getQuestion({ QuestionID: interview?.Questions[questionNo] }))
            .then(() => {
                setQuestion(JSON.parse(localStorage.getItem('question') as string));
                localStorage.removeItem('question');
            });
        } catch (error) {
            console.log(error);
        }
    }, [dispatch, interview?.Questions, questionNo]);

    useEffect(() => {
        document.addEventListener('visibilitychange', () => {
            if(document.hidden) {
                setInterviewCompleted(true);
                console.log('Caught yah!');
            }
        });
    }, []);

    const toggleSidebar = () => {
        setSidebar(!sidebar);
    }

    const resetCode = () => {
        setCode('');
    }

    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setIndex(event.target.value as number);
    }

    const themeChange = () => {
        setLight(!light);
        switchSound();
    }

    const changeQuestion = (e: React.ChangeEvent<{ value: unknown }>) => {
        setQuestionNo(e.target.value as number);
    }
    
    const language = [ 'C', 'C++', 'C#', 'Java', 'Python3', 'Ruby', 'Kotlin', 'Swift' ];
    const format = [ 'c', 'cpp', 'csharp' , 'java', 'python3', 'ruby', 'kotlin', 'swift' ];
    const modes = [
        'text/x-c++src',
        'text/x-c++src',
        'text/x-c++src',
        'text/x-c++src',
        'text/x-python',
        'text/x-ruby',
        'text/x-c++src',
        'text/x-swift',
    ];

    return (
        <div>
            {loading?(
                <div>
                    <Loading/>
                </div>
            ):(
                <ContextProvider>
                    <div>
                        <Header>
                            <FormControl className={clsx(classes.formControl, 'language')} style={{ marginLeft: '10px' }}>
                                <InputLabel id="demo-simple-select-label">Language</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={index}
                                    onChange={handleChange}
                                >
                                    {language.map((value, i) => (
                                        <MenuItem value={i} key={i}>{value}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <IconButton onClick={resetCode} className={classes.icon}>
                                <RotateLeftRoundedIcon/>
                            </IconButton>
                            <IconButton onClick={themeChange} className={classes.icon}>
                                {light?<Brightness7RoundedIcon/>:<Brightness4RoundedIcon/>}
                            </IconButton>
                            <IconButton onClick={() => setSidebar(!sidebar)} className={classes.icon}>
                                {sidebar?<CloseIcon/>:<PlayArrowRoundedIcon/>}
                            </IconButton>
                        </Header>
                        <div className={classes.toolbar}/>
                        <Grid container className={classes.container}>
                            <Grid item xs={12} className={classes.header}>
                                <div className={classes.info}>
                                    <Typography variant="h6" className={classes.text}>
                                        Time Limit: {question?.TimeLimit} seconds
                                    </Typography>
                                    <Typography variant="h6" className={classes.text}>
                                        Memory Limit: {question?.MemoryLimit} bytes
                                    </Typography>
                                </div>
                                <div className={classes.info}>
                                    <FormControl className={classes.formControl} style={{ marginLeft: '10px' }}>
                                        <InputLabel id="demo-simple-select-label">Question</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={questionNo}
                                            onChange={changeQuestion}
                                        >
                                            {interview?.Questions?.map((value: string, i: number) => (
                                                <MenuItem value={i} key={i}>{value}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </div>
                            </Grid>
                            <Grid item xs={12} sm={3}>
                                <Grid container spacing={3} className={classes.problem}>
                                    <Grid item xs={12}>
                                        <Typography variant="h6" className={classes.heading}>
                                            Problem Statement
                                        </Typography>
                                        <Typography variant="body2" className={classes.text}>
                                            {question?.ProblemStatement}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography variant="h6" className={classes.heading}>
                                            Input
                                        </Typography>
                                        <Typography variant="body2" className={classes.text}>
                                            {question?.Input}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography variant="h6" className={classes.heading}>
                                            Output
                                        </Typography>
                                        <Typography variant="body2" className={classes.text}>
                                            {question?.Output}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography variant="h6" className={classes.heading}>
                                            Constraints
                                        </Typography>
                                        <Typography variant="body2" className={classes.text}>
                                            {question?.Constraints}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <div className={classes.copy}>
                                            <Typography variant="h6" className={classes.heading}>
                                                Sample Input
                                            </Typography>
                                            <CopyToClipboard text={question?.SampleInput} onCopy={() => setCopied(true)}>
                                                <IconButton>
                                                    <FileCopyIcon/>
                                                </IconButton>
                                            </CopyToClipboard>
                                        </div>
                                        <pre className={classes.text}>
                                            {question?.SampleInput}
                                        </pre>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <div className={classes.copy}>
                                            <Typography variant="h6" className={classes.heading}>
                                                Sample Output
                                            </Typography>
                                            <CopyToClipboard text={question?.SampleOutput} onCopy={() => setCopied(true)}>
                                                <IconButton>
                                                    <FileCopyIcon/>
                                                </IconButton>
                                            </CopyToClipboard>
                                        </div>
                                        <pre className={classes.text}>
                                            {question?.SampleOutput}
                                        </pre>
                                    </Grid>
                                    {question?.Explanation && (
                                        <Grid item xs={12}>
                                            <Typography variant="h6" className={classes.heading}>
                                                Explanation
                                            </Typography>
                                            <Typography variant="body2" className={classes.text}>
                                                {question?.Explanation}
                                            </Typography>
                                        </Grid>
                                    )}
                                </Grid>
                            </Grid>
                            <Grid item xs={12} sm={9}>
                                <div>
                                    <IDE value={code} onChange={setCode} isLight={light} language={modes[index]} />
                                </div>
                            </Grid>
                        </Grid>
                        <IdeDrawer sidebar={sidebar} toggleSidebar={toggleSidebar} language={format[index]} code={code} testcases={question?.TestCases} TimeLimit={question?.TimeLimit} MemoryLimit={question?.MemoryLimit} backup={{ input: question?.sampleInput, output: question?.sampleOutput}} question={question}/>
                        <InterviewCompletedDialog open={interviewCompleted} />
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
                </ContextProvider>
            )}
        </div>
    )
}

export default Interview;
