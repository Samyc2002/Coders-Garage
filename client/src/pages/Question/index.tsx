import React, { useEffect, useState } from 'react';
import { Grid, makeStyles, Paper, Theme, Typography, createStyles, CssBaseline, Toolbar, IconButton, Button, Menu, MenuItem, FormControl, InputLabel, Select, Divider, AppBar, useMediaQuery, Drawer, List, ListItem, ListItemIcon, ListItemText, TextField, Tabs, Tab, Snackbar } from '@material-ui/core';
import { Menu as MenuIcon, AddCircleRounded as AddCircleRoundedIcon, Brightness4Rounded as Brightness4RoundedIcon, Brightness7Rounded as Brightness7RoundedIcon, RotateLeftRounded as RotateLeftRoundedIcon, Close as CloseIcon, PlayArrowRounded as PlayArrowRoundedIcon, HomeRounded as HomeRoundedIcon, CodeRounded as CodeRoundedIcon, ComputerRounded as ComputerRoundedIcon, Palette as PaletteIcon, DashboardRounded as DashboardRoundedIcon, ExitToAppRounded as ExitToAppRoundedIcon } from '@material-ui/icons';
import { Scrollbars } from 'react-custom-scrollbars';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Alert } from '@material-ui/lab';
import axios, { Method } from 'axios';
import useSound from 'use-sound';
import clsx from 'clsx';

import { getEnvironmentVariables } from '../../environments/env';
import FailureSFX from '../../assets/sounds/Failure.mp3';
import SuccessSFX from '../../assets/sounds/Success.mp3';
import useLocalStorage from '../../Hooks/useLocalStore';
import SwitchSFX from '../../assets/sounds/Switch.mp3';
import { getQuestion } from '../../actions/question';
import Logo from '../../assets/images/LogoBlue.png';
import Footer from '../../components/footer';
import Ide from '../../components/IDE';

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
	  boxShadow: 'none',
      backgroundColor: '#ffffff',
    },
    appBarShift: {
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginRight: drawerWidth,
    },
    title: {
      flexGrow: 1,
    },
    hide: {
      display: 'none',
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
	  whiteSpace: "nowrap"
    },
    drawerPaper: {
      width: drawerWidth,
    },
    drawerHeader: {
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
      justifyContent: 'flex-start',
    },
	toolbar: {
		display: "flex",
		alignItems: "center",
		justifyContent: "flex-end",
		padding: theme.spacing(0, 1),
		// necessary for content to be below app bar
		...theme.mixins.toolbar
	},
    content: {
      flexGrow: 1,
    //   padding: theme.spacing(3),
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      [theme.breakpoints.up("sm")]: {
		paddingLeft: '2.5vw'
	  }
    },
    contentShift: {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginRight: 0,
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create("width", {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen
        })
    },
    drawerClose: {
        transition: theme.transitions.create("width", {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen
        }),
        overflowX: "hidden",
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up("sm")]: {
          width: theme.spacing(9) + 1
        },
        [theme.breakpoints.down("xs")]: {
            display: 'none',
            transition: 'ease-in-out'
        }
    },
	action: {
		[theme.breakpoints.up("sm")]: {
			paddingLeft: '8.5vw'
		},
		[theme.breakpoints.up("md")]: {
			paddingLeft: '6.5vw'
		},
		[theme.breakpoints.up("lg")]: {
			paddingLeft: '4.5vw'
		}
	},
	icon: {
		color: '#3f51b5'
	},
	text: {
		color: '#3f51b5'
	},
	back: {
		backgroundColor: '#cee8fc'
	},
    background: {
		height: '100vh',
		backgroundColor: '#ffffff',
		backgroundPosition: 'center',
        alignItems: 'center',
        justifyContent: 'center'
	},
    paper: {
        margin: '35px 0px',
        padding: '10px 20px',
        width: '600px'
    }
  }),
);

interface Model{
    method: Method,
    url: string,
    headers: any,
    data: string
}

const Question = (props: any) => {

    const QID = props.match.params.id;
    const dark = "material-darker";
    const light = "eclipse";
    const dispatch = useDispatch();
    const history = useHistory();
    const classes = useStyles();
    const isTabletorMobile = useMediaQuery('(max-width: 600px)');

    const [code, setCode] = useLocalStorage('code', '');
    const [index, setIndex] = useState(-1);
    const [theme, setTheme] = useState(true);
    const [content, setContent] = useState(0);
    const [tab, setTab] = useState(false);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [open, setOpen] = useState(false);
    const [question, setQuestion] = useState<any>(JSON.parse(localStorage.getItem('tmp') as string)?.data);
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [time, setTime] = useState('');
    const [memory, setMemory] = useState(0);
    const [snack, setSnack] = useState(false);
    const [type, setType] = useState(true);
    const [successSound] = useSound(SuccessSFX, { volume: 1 });
    const [errorSound] = useSound(FailureSFX, { volume: 1 });
    const [switchSound] = useSound(SwitchSFX, { volume: 1 });
    const [WA, setWA] = useState(false);
    const [TLE, setTLE] = useState(false);
    const [MLE, setMLE] = useState(false);
    const [CE, setCE] = useState(false);
    const [err, setErr] = useState('');
    const [submitSnack, setSubmitSnack] = useState(false);

    const alert_type = type?"success":"error";

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

    useEffect(() => {
        dispatch(getQuestion({ QuestionID: QID }));
        setTimeout(() => setQuestion(JSON.parse(localStorage.getItem('tmp') as string)?.data), 200);
    }, [QID, dispatch]);

    const problemStatement = () => (
		<Paper elevation={0} className={classes.action}>
			<Grid container direction="column" spacing={3} style={{ paddingBottom: '30px', paddingTop: '10px' }}>
				<Grid item>
					<Typography variant="h5" gutterBottom style={{ fontFamily: "'Josefin Sans', sans-serif", fontWeight: 'bolder' }}>
						Problem Statement
					</Typography>
					<Typography variant="subtitle1" gutterBottom style={{ fontFamily: "'Quicksand', sans-serif", fontWeight: 'bold' }}>
						{question?.ProblemStatement}
					</Typography>
				</Grid>
				<Grid item>
					<Typography variant="h5" gutterBottom style={{ fontFamily: "'Josefin Sans', sans-serif", fontWeight: 'bolder' }}>
						Input
					</Typography>
					<Typography variant="subtitle1" gutterBottom style={{ fontFamily: "'Quicksand', sans-serif", fontWeight: 'bold' }}>
                        {question?.Input}
					</Typography>
				</Grid>
				<Grid item>
					<Typography variant="h5" gutterBottom style={{ fontFamily: "'Josefin Sans', sans-serif", fontWeight: 'bolder' }}>
						Output
					</Typography>
					<Typography variant="subtitle1" gutterBottom style={{ fontFamily: "'Quicksand', sans-serif", fontWeight: 'bold' }}>
                        {question?.Output}
					</Typography>
				</Grid>
				<Grid item>
					<Typography variant="h5" gutterBottom style={{ fontFamily: "'Josefin Sans', sans-serif", fontWeight: 'bolder' }}>
                    Constraints
					</Typography>
					<Typography variant="subtitle1" gutterBottom style={{ fontFamily: "'Quicksand', sans-serif", fontWeight: 'bold' }}>
                        <pre>{question?.Constraints}</pre>
					</Typography>
				</Grid>
				<Grid item>
					<Typography variant="h5" gutterBottom style={{ fontFamily: "'Josefin Sans', sans-serif", fontWeight: 'bolder' }}>
						Sample Input
					</Typography>
					<Typography variant="subtitle1" gutterBottom style={{ fontFamily: "'Quicksand', sans-serif", fontWeight: 'bold' }}>
                        <pre>{question?.SampleInput}</pre>
					</Typography>
				</Grid>
				<Grid item>
					<Typography variant="h5" gutterBottom style={{ fontFamily: "'Josefin Sans', sans-serif", fontWeight: 'bolder' }}>
						Sample Output
					</Typography>
					<Typography variant="subtitle1" gutterBottom style={{ fontFamily: "'Quicksand', sans-serif", fontWeight: 'bold' }}>
                        <pre>{question?.SampleOutput}</pre>
					</Typography>
				</Grid>
				<Grid item>
					<Typography variant="h5" gutterBottom style={{ fontFamily: "'Josefin Sans', sans-serif", fontWeight: 'bolder' }}>
						Explanation
					</Typography>
					<Typography variant="subtitle1" gutterBottom style={{ fontFamily: "'Quicksand', sans-serif", fontWeight: 'bolder' }}>
                        {question?.Explanation}
					</Typography>
				</Grid>
			</Grid>
		</Paper>
	);

	const editor = () => (
		<div className={classes.action} style={{ paddingTop: '30px', paddingRight: '2.5vw', paddingLeft: '7.5vw', width: '99vw' }}>
			<Ide
				value={code}
				onChange={setCode}
				language={modes[index]}
				theme={theme?dark:light}
			/>
		</div>
	);

	const submissions = () => (
		<Paper elevation={0} className={classes.action}></Paper>
	);

	const setAction = () => {
		switch (content) {
			case 0:	return problemStatement();
			case 1: return editor();
			case 2: return submissions();
			default: return <p>Nothing for you lol</p>
		}
	}

    const handleclick = () => {

        setSnack(true);
    };

    const compileRun = (lang: string) => {

        setOutput('');

        const config: Model = {

            method: 'POST',
            url: `${getEnvironmentVariables().url}/create`,
            headers: {
                'x-rapidapi-key': `${getEnvironmentVariables().apiKey}`,
                'x-rapidapi-host': 'paiza-io.p.rapidapi.com',
                'Content-Type': 'application/json'
            },
            data: JSON.stringify({
                source_code: code,
                language: lang,
                input: input
            })
        }

        axios(config)
            .then((response) => {
    
                setTimeout(() => {
    
                    axios.get(`${getEnvironmentVariables().url}/get_details`, {
    
                        params: {
                            id: response.data?.id
                        },
                        headers: {
                            'x-rapidapi-key': `${getEnvironmentVariables().apiKey}`,
                            'x-rapidapi-host': 'paiza-io.p.rapidapi.com'
                        }
                    })
                    .then((res) => {
                        
                        setOutput(res.data?.stdout || res.data.build_stderr);
                        setTime(res.data.time);
                        setMemory(res.data.memory);
                        handleclick();
                        if(res.data.build_stderr) {
                            setType(false);
                            errorSound();
                        }
                        else {
                            setType(true);
                            successSound();
                        }
                    })
                    .catch((err) => console.log(err));
                }, 1000);
            })
            .catch((err) => console.log(err));
    }

    const Logout = () => {

		try {
			
			dispatch({ type: 'LOGOUT' });
			history.push('/');
		} catch (error) {

			console.log(error);
		}
	}

    const handleTab = () => {
		setTab(!tab);
	}
    
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setIndex(event.target.value as number);
    };

    const handleReset = () => {
        setCode("");
    }

	const handleTheme = () => {
        setTheme(!theme);
        switchSound();
    }

    const handleDrawer = () => {
        setOpen(!open);
    };

    const handleContent = (event: React.ChangeEvent<{}>, newContent: number) => {
		setContent(newContent);
	}

    const handleclose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setSnack(false);
    };

    const handlekilik = () => {

        setSubmitSnack(true);
    };

    const handleSubmit = (lang: string) => {

        for(let testcase of question?.Testcases) {

            const config: Model = {

                method: 'POST',
                url: `${getEnvironmentVariables().url}/create`,
                headers: {
                    'x-rapidapi-key': `${getEnvironmentVariables().apiKey}`,
                    'x-rapidapi-host': 'paiza-io.p.rapidapi.com',
                    'Content-Type': 'application/json'
                },
                data: JSON.stringify({
                    source_code: code,
                    language: lang,
                    input: testcase.input
                })
            }

            axios(config)
                .then((response) => {
        
                    setTimeout(() => {
        
                        axios.get(`${getEnvironmentVariables().url}/get_details`, {
        
                            params: {
                                id: response.data?.id
                            },
                            headers: {
                                'x-rapidapi-key': `${getEnvironmentVariables().apiKey}`,
                                'x-rapidapi-host': 'paiza-io.p.rapidapi.com'
                            }
                        })
                        .then((res) => {
                            
                            if(res.data?.stderr) {
                                setErr(res.data?.stderr);
                                return;
                            }
                            setWA(testcase.output !== res.data?.stdout);
                            setTLE(res.data.time > question?.TimeLimit);
                            setMLE(res.data.memory > question?.MemoryLimit);
                            handlekilik();
                            if(res.data.build_stderr) setCE(true);
                            else setCE(false);

                            if(WA || TLE || MLE || CE) {
                                setType(false);
                                if(WA) setErr('Wrong Answer');
                                if(TLE) setErr('Time Limit Exceeded');
                                if(MLE) setErr('Memory Limit Exceeded');
                                if(CE) setErr('Compilation Error');
                                errorSound();
                            }
                            else {
                                setType(true);
                                successSound();
                            }
                        })
                        .catch((err) => console.log(err));
                    }, 1000);
                })
                .catch((err) => console.log(err));
        }
    }

    const handlekilos = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setSubmitSnack(false);
    };

    return (
        <Scrollbars autoHide autoHideTimeout={2000} style={{ height: '100vh', width: '100vw' }}>
            <div>
                <CssBaseline/>
                <AppBar
                    position="fixed"
                    className={classes.appBar}
                >
                    <Toolbar style={{ justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <IconButton
                                color="primary"
                                aria-label="open tabs"
                                edge="end"
                                title="Tabs"
                                style={{
                                    marginRight: '10px'
                                }}
                                onClick={handleTab}
                            >
                                <MenuIcon/>
                            </IconButton>
                            <div style={{ display: 'flex', alignItems: 'center', transform: 'scale(0.7, 0.7)' }}>
                                <a href="/">
                                    <img src={Logo} alt="Logo" style={{ maxWidth: isTabletorMobile?'25px':'50px' }}/>
                                </a>
                            </div>
                        </div>
                        {(content===1) && (
                            isTabletorMobile?(
                                <div>
                                    <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                                        <IconButton
                                            color="primary"
                                            aria-label="open tabs"
                                            edge="end"
                                            title="Tabs"
                                        >
                                            <AddCircleRoundedIcon/>
                                        </IconButton>
                                    </Button>
                                    <Menu
                                        id="simple-menu"
                                        anchorEl={anchorEl}
                                        keepMounted
                                        open={Boolean(anchorEl)}
                                        onClose={handleClose}
                                    >
                                        <MenuItem>
                                            <FormControl className={classes.formControl} style={{ marginLeft: '10px' }}>
                                                <InputLabel id="demo-simple-select-label">Language</InputLabel>
                                                <Select
                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                    value={language[index]}
                                                    onChange={handleChange}
                                                >
                                                    {language.map((value, index) => (
                                                        <MenuItem value={index}>{value}</MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                        </MenuItem>
                                        <MenuItem onClick={handleTheme}>Editor Theme</MenuItem>
                                        <MenuItem onClick={handleReset}>Reset Code</MenuItem>
                                        <MenuItem onClick={handleDrawer}>Compile and Run</MenuItem>
                                    </Menu>
                                </div>
                            ):(
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <FormControl className={classes.formControl} style={{ marginLeft: '10px' }}>
                                        <InputLabel id="demo-simple-select-label">Language</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={language[index]}
                                            onChange={handleChange}
                                        >
                                            {language.map((value, index) => (
                                                <MenuItem value={index}>{value}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                    <IconButton
                                        color="primary"
                                        aria-label="open drawer"
                                        edge="end"
                                        onClick={handleTheme}
                                        title="IDE theme"
                                        style={{
                                            marginLeft: '10px'
                                        }}
                                    >
                                        {theme?<Brightness4RoundedIcon/>:<Brightness7RoundedIcon/>}
                                    </IconButton>
                                    <IconButton
                                        color="primary"
                                        aria-label="open drawer"
                                        edge="end"
                                        onClick={handleReset}
                                        title="Reset Code"
                                        style={{
                                            marginLeft: '10px'
                                        }}
                                    >
                                        <RotateLeftRoundedIcon/>
                                    </IconButton>
                                    <IconButton
                                        color="primary"
                                        aria-label="open drawer"
                                        edge="end"
                                        onClick={handleDrawer}
                                        title="Run"
                                        style={{
                                            marginLeft: '10px'
                                        }}
                                    >
                                        {open?<CloseIcon />:<PlayArrowRoundedIcon />}
                                    </IconButton>
                                </div>
                            )
                        )}
                    </Toolbar>
                    <Divider/>
                </AppBar>
                <div className={classes.drawerHeader} />
                <Drawer
                    variant="permanent"
                    className={clsx(classes.drawer, {
                        [classes.drawerOpen]: tab,
                        [classes.drawerClose]: !tab
                    })}
                    classes={{
                        paper: clsx({
                        [classes.drawerOpen]: tab,
                        [classes.drawerClose]: !tab
                        })
                    }}
                    onMouseEnter={() => (!tab && setTab(true))}
                    onMouseLeave={handleTab}
                >
                    <div>
                        <div className={classes.toolbar}/>
                        <List>
                            <a href="/home" style={{ textDecoration: 'none', color: '#121212' }}>
                                <ListItem button key="Home">
                                    <ListItemIcon>
                                        <HomeRoundedIcon/>
                                    </ListItemIcon>
                                    <ListItemText>
                                        Home
                                    </ListItemText>
                                </ListItem>
                            </a>
                            <a href="/ide" style={{ textDecoration: 'none', color: '#121212' }}>
                                <ListItem button key="IDE">
                                    <ListItemIcon>
                                        <CodeRoundedIcon/>
                                    </ListItemIcon>
                                    <ListItemText>
                                        IDE
                                    </ListItemText>
                                </ListItem>
                            </a>
                            <a href="/interview" style={{ textDecoration: 'none', color: '#121212' }}>
                                <ListItem button key="Interview" classes={{ root: classes.back }}>
                                    <ListItemIcon classes={{ root: classes.icon }}>
                                        <ComputerRoundedIcon/>
                                    </ListItemIcon>
                                    <ListItemText classes={{ root: classes.text }}>
                                        Interview
                                    </ListItemText>
                                </ListItem>
                            </a>
                        </List>
                    </div>
                    <div>
                        <List>
                            <ListItem button key="Theme">
                                <ListItemIcon>
                                    <PaletteIcon/>
                                </ListItemIcon>
                                <ListItemText>
                                    Theme
                                </ListItemText>
                            </ListItem>
                            <a href="/profile" style={{ textDecoration: 'none', color: '#121212' }}>
                                <ListItem button key="Dashboard">
                                    <ListItemIcon>
                                        <DashboardRoundedIcon/>
                                    </ListItemIcon>
                                    <ListItemText>
                                        Dashboard
                                    </ListItemText>
                                </ListItem>
                            </a>
                            <ListItem button key="Logout" onClick={Logout}>
                                <ListItemIcon>
                                    <ExitToAppRoundedIcon/>
                                </ListItemIcon>
                                <ListItemText>
                                    Logout
                                </ListItemText>
                            </ListItem>
                        </List>
                    </div>
                </Drawer>
                <main className={classes.content}>
                    <Paper square elevation={0}>
                        <Tabs
                            value={content}
                            indicatorColor="primary"
                            textColor="primary"
                            onChange={handleContent}
                            variant={isTabletorMobile?"scrollable":"standard"}
                            centered
                        >
                            <Tab label="Problem Statement"/>
                            <Tab label="IDE"/>
                            <Tab label="Submission"/>
                        </Tabs>
                        <Divider/>
                    </Paper>
                    {setAction()}
                </main>
                {(content===1) && (
                    <Drawer
                        className={classes.drawer}
                        variant="persistent"
                        anchor="right"
                        open={open}
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                    >
                        <Grid item style={{ height: '20px' }}/>
                        <Toolbar/>
                        <Grid container justify="center" direction="column">
                            <Grid item xl={12}>
                                <Paper elevation={3} style={{ display: 'flex', marginLeft: '10px', marginRight: '10px', justifyContent: 'center', alignItems: 'center' }}>
                                    <TextField
                                        id="outlined-multiline-static"
                                        label="Input"
                                        multiline
                                        rows={15}
                                        variant="standard"
                                        style={{
                                            margin: '10px',
                                            color: '#121212'
                                        }}
                                        onChange={(e) => setInput(e.target.value)}
                                    />
                                </Paper>
                            </Grid>
                            <Grid item style={{ height: '20px' }}/>
                            <Grid item xl={12}>
                                <Paper elevation={3} style={{ display: 'flex', marginLeft: '10px', marginRight: '10px', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                                    <TextField
                                        id="outlined-multiline-static"
                                        label="output"
                                        multiline
                                        rows={15}
                                        variant="standard"
                                        style={{
                                            margin: '10px',
                                            color: '#121212'
                                        }}
                                        disabled
                                        autoFocus
                                        value={output}
                                    />
                                </Paper>
                            </Grid>
                            <Grid item style={{ height: '20px' }}/>
                            <Button color="primary" variant="contained" style={{ marginLeft: '10px', marginRight: '10px' }} onClick={() => compileRun(format[index])}>Run</Button>
                            <Button color="primary" variant="contained" style={{ marginLeft: '10px', marginRight: '10px' }} onClick={() => handleSubmit(format[index])}>Submit</Button>
                        </Grid>
                    </Drawer>
                )}
                <Snackbar open={snack} autoHideDuration={6000} onClose={handleclose}>
                    <Alert onClose={handleclose} severity={alert_type}>
                        {type?`Compilation Successful in ${time} seconds and needed ${memory} bytes!`:`Compilation Error`}
                    </Alert>
                </Snackbar>
                <Snackbar open={submitSnack} autoHideDuration={6000} onClose={handlekilos}>
                    <Alert onClose={handlekilos} severity={alert_type}>
                        {(err==='')?'Accepted':err}
                    </Alert>
                </Snackbar>
                <Footer/>
            </div>
        </Scrollbars>
    )
}

export default Question;
