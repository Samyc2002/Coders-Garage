import React, { useState, useEffect, useContext } from 'react';
import clsx from 'clsx';
import useSound from 'use-sound';
import Countdown from "react-countdown";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { FormControl, IconButton, InputLabel, MenuItem, Select, Grid, Typography, Snackbar, useMediaQuery } from '@material-ui/core';
import { Brightness7Rounded as Brightness7RoundedIcon, Brightness4Rounded as Brightness4RoundedIcon, RotateLeftRounded as RotateLeftRoundedIcon, PlayArrowRounded as PlayArrowRoundedIcon, Close as CloseIcon,  FileCopy as FileCopyIcon } from '@material-ui/icons';

import InterviewCompletedDialog from '../../components/InterviewCompletedDialog';
import SmallScreenDialog from '../../components/SmallScreenDialog';
import IdeDrawer from '../../components/Submission_IDE_Drawer';
import { SocketContext } from '../../config/SocketContext';
import InstructionsDialog from '../../components/InstructionsDialog';
import { useAppDispatch } from '../../Hooks/reduxHooks';
import SwitchSFX from '../../assets/sounds/Switch.mp3';
import { getInterview } from '../../actions/interview';
import { getQuestion } from '../../actions/question';
import UserVideo from '../../components/userVideo';
import MyVideo from '../../components/myVideo';
import Loading from '../../components/Loading';
import Details from '../../components/Details';
import Header from '../../components/Header';
import { InterviewIde } from '../../components/IDE';
import Slide from 'react-reveal/Slide';
import Zoom from 'react-reveal/Zoom';
import Fade from 'react-reveal/Fade';
import Spin from 'react-reveal/Spin';
import { useStyles } from './styles';

const Interview = (props: any) => {

    const isTabletorMobile = useMediaQuery('(max-width: 1279px)')

    const classes = useStyles();

    const dispatch = useAppDispatch();

    const [switchSound] = useSound(SwitchSFX, { volume: 1 });

    const [index, setIndex] = useState(1);
    const [snack, setSnack] = useState(false);
    const [ready, setReady] = useState(false);
    const [light, setLight] = useState(false);
    const [copied, setCopied] = useState(false);
    const [sidebar, setSidebar] = useState(false);
    const [loading , setLoading] = useState(true);
    const [questionNo, setQuestionNo] = useState(0);
    const [instructions, setInstructions] = useState(false);
    const [interviewCompleted, setInterviewCompleted] = useState(true);
    const [question, setQuestion] = useState(JSON.parse(localStorage.getItem('question') as string));
    const [interview, setInterview] = useState(JSON.parse(localStorage.getItem('interview') as string));
    const isInterviewer = (interview?.InterviewerEmail === JSON.parse(localStorage.getItem('profile') as string)?.data.formData.Email);
    const { stream, callAccepted, callEnded, setName, call, answerCall, me, callUser, code, setCode }: any = useContext(SocketContext);

    useEffect(() => {
        try {
            dispatch(getInterview({ RoomId: props.match.params.id }))
            .then(() => {
                setInterview(JSON.parse(localStorage.getItem('interview') as string));
                localStorage.removeItem('interview');
                localStorage.setItem('RoomID', props.match.params.id );
                setLoading(false);
                setSnack(false);
            });
        } catch (error) {
            setSnack(true);
            console.log(error);
        }
    }, [dispatch, isInterviewer, props.match.params.id]);

    useEffect(() => {
        try {
            dispatch(getQuestion({ QuestionID: interview?.Questions[questionNo] }))
            .then(() => {
                setQuestion(JSON.parse(localStorage.getItem('question') as string));
                localStorage.removeItem('question');
                setSnack(false);
            });
        } catch (error) {
            setSnack(true);
            console.log(error);
        }
    }, [dispatch, interview?.Questions, questionNo]);

    useEffect(() => {
        if(!isInterviewer) {
            document.addEventListener('visibilitychange', () => {
                if(document.hidden && ready) {
                    setInterviewCompleted(true);
                    console.log('Caught yah!');
                }
            });
        }
    }, [isInterviewer, ready]);

    useEffect(() => {
        setName(isInterviewer?'Interviewer':'Interviewee');
    }, [isInterviewer, setName]);

    const toggleSidebar = () => {
        setSidebar(!sidebar);
    }

    const toggleInstructions = () => {
        setInstructions(!instructions);
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
            {isTabletorMobile?(
                <div>
                    <SmallScreenDialog/>
                </div>
            ):(
                <div>
                    {loading?(
                        <div>
                            <Loading/>
                            <Snackbar
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                open={snack}
                                autoHideDuration={6000}
                                onClose={() => setSnack(false)}
                                message="Something went wrong!"
                            />
                        </div>
                    ):(
                        <div>
                            <div>
                                {!isInterviewer && <InstructionsDialog open={instructions} toggleOpen={toggleInstructions}/>}
                                <Header>
                                    <Fade>
                                        <Countdown date={Date.now() + interview?.Duration*60000} onComplete={() => setInterviewCompleted(true)} />
                                    </Fade>
                                    <Slide top>
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
                                    </Slide>
                                    <Spin>
                                        <IconButton onClick={resetCode} className={classes.icon}>
                                            <RotateLeftRoundedIcon/>
                                        </IconButton>
                                    </Spin>
                                    <Zoom>
                                        <IconButton onClick={themeChange} className={classes.icon}>
                                            {light?<Brightness7RoundedIcon/>:<Brightness4RoundedIcon/>}
                                        </IconButton>
                                    </Zoom>
                                    <Fade right>
                                        <IconButton onClick={() => setSidebar(!sidebar)} className={classes.icon}>
                                            {isTabletorMobile?'Run your Code':(sidebar?<CloseIcon/>:<PlayArrowRoundedIcon/>)}
                                        </IconButton>
                                    </Fade>
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
                                            <InterviewIde value={code} onChange={setCode} isLight={light} language={modes[index]} interviewMode />
                                        </div>
                                    </Grid>
                                </Grid>
                                <IdeDrawer sidebar={sidebar} toggleSidebar={toggleSidebar} language={format[index]} code={code} testcases={question?.TestCases} TimeLimit={question?.TimeLimit} MemoryLimit={question?.MemoryLimit} backup={{ input: question?.sampleInput, output: question?.sampleOutput}} question={question}/>
                                <InterviewCompletedDialog open={interviewCompleted && ready && !isInterviewer} RoomId={interview?._id} />
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
                            {/* {!ready?(
                                <div>
                                    <Header/>
                                    <div className={classes.toolbar}/>
                                    <Grid container justifyContent="center" alignItems="center" className={classes.intro}>
                                        <Grid item xs={12} className={classes.details}>
                                            <Details interview={interview} me={me} call={call} callUser={callUser} answerCall={answerCall} callAccepted={callAccepted} ready={ready} setReady={setReady} stream={stream} callEnded={callEnded}/>
                                        </Grid>
                                    </Grid>
                                </div>
                            ):(
                            )}
                            <div className={classes.video}>
                                {stream && (<MyVideo/>)}
                            </div>
                            <div className={classes.video}>
                                {callAccepted && !callEnded && (<UserVideo/>)}
                            </div> */}
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}

export default Interview;
