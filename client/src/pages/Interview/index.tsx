import React, { useContext, useState, useEffect } from 'react';
import { AppBar, createStyles, CssBaseline, Divider, IconButton, makeStyles, Toolbar, Typography, Theme, Drawer, List, ListItem, ListItemIcon, ListItemText, Paper, Tabs, Tab, Grid, FormControl, InputLabel, Select, MenuItem, useMediaQuery, Button, Menu, TextField } from '@material-ui/core';
import { Menu as MenuIcon, HomeRounded as HomeRoundedIcon, CodeRounded as CodeRoundedIcon, ComputerRounded as ComputerRoundedIcon, Brightness4Rounded as Brightness4RoundedIcon, Brightness7Rounded as Brightness7RoundedIcon, RotateLeftRounded as RotateLeftRoundedIcon, Close as CloseIcon, PlayArrowRounded as PlayArrowRoundedIcon, AddCircleRounded as AddCircleRoundedIcon, Palette as PaletteIcon, DashboardRounded as DashboardRoundedIcon, ExitToAppRounded as ExitToAppRoundedIcon } from '@material-ui/icons';
import { Scrollbars } from 'react-custom-scrollbars';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import clsx from 'clsx';

import { SocketContext } from '../../config/SocketContext';
import { emailInterviewee } from '../../actions/interview';
import Logo from '../../assets/images/LogoBlue.png';
import UserVideo from '../../components/userVideo';
import MyVideo from '../../components/myVideo';
import Ide from '../../components/IDE_collab';
import Footer from '../../components/footer';
import './styles.css';

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

const Interview = () => {

    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();
    const dark = "material-darker";
    const light = "eclipse";
    const isTabletorMobile = useMediaQuery('(max-width: 600px)');
    const isInterviewer = (JSON.parse(localStorage.getItem('room') as string)?.InterviewerEmail === JSON.parse(localStorage.getItem('profile') as string)?.formData.Email);
	const isInterviewee = (JSON.parse(localStorage.getItem('room') as string)?.IntervieweeEmail === JSON.parse(localStorage.getItem('profile') as string)?.formData.Email);
    const { stream, callAccepted, callEnded, call, setName, answerCall, me, callUser, code, setCode }: any = useContext(SocketContext);

    const [open, setOpen] = useState(false);
    const [index, setIndex] = useState(-1);
	const [theme, setTheme] = useState(true);
    const [tab, setTab] = useState(false);
	const [content, setContent] = useState(0);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [ready, setReady] = useState(false);
    const [room, setRoom] = useState({
        RoomId: JSON.parse(localStorage.getItem('room') as string)?.RoomId,
        InterviewerEmail: JSON.parse(localStorage.getItem('room') as string)?.InterviewerEmail,
        IntervieweeEmail: JSON.parse(localStorage.getItem('room') as string)?.IntervieweeEmail,
        Duration: JSON.parse(localStorage.getItem('room') as string)?.Duration,
        StartTime: JSON.parse(localStorage.getItem('room') as string)?.StartTime,
        id: ''
    });
    const [id, setId] = useState('');

    useEffect(() => {
        if(isInterviewer) setName("Interviewer");
        if(isInterviewee) setName("Interviewee");
    }, [isInterviewee, isInterviewer, setName]);

	const handleDrawer = () => {
        setOpen(!open);
    };

	const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setIndex(event.target.value as number);
    };

	const handleReset = () => {
        setCode("");
    }

	const handleTheme = () => {
        setTheme(!theme);
    }
    
    const handleTab = () => {
		setTab(!tab);
	}

	const handleContent = (event: React.ChangeEvent<{}>, newContent: number) => {
		setContent(newContent);
	}

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

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

	const problemStatement = () => (
		<Paper elevation={0} className={classes.action}>
			<Grid container direction="column" spacing={3} style={{ paddingBottom: '30px', paddingTop: '10px' }}>
				<Grid item>
					<Typography variant="h5" gutterBottom style={{ fontFamily: "'Josefin Sans', sans-serif", fontWeight: 'bolder' }}>
						Problem Statement
					</Typography>
					<Typography variant="subtitle1" gutterBottom style={{ fontFamily: "'Quicksand', sans-serif", fontWeight: 'bold' }}>
						The actual shit
					</Typography>
				</Grid>
				<Grid item>
					<Typography variant="h5" gutterBottom style={{ fontFamily: "'Josefin Sans', sans-serif", fontWeight: 'bolder' }}>
						Input
					</Typography>
					<Typography variant="subtitle1" gutterBottom style={{ fontFamily: "'Quicksand', sans-serif", fontWeight: 'bold' }}>
						Input description
					</Typography>
				</Grid>
				<Grid item>
					<Typography variant="h5" gutterBottom style={{ fontFamily: "'Josefin Sans', sans-serif", fontWeight: 'bolder' }}>
						Output
					</Typography>
					<Typography variant="subtitle1" gutterBottom style={{ fontFamily: "'Quicksand', sans-serif", fontWeight: 'bold' }}>
						Output description
					</Typography>
				</Grid>
				<Grid item>
					<Typography variant="h5" gutterBottom style={{ fontFamily: "'Josefin Sans', sans-serif", fontWeight: 'bolder' }}>
						Constraints
					</Typography>
					<Typography variant="subtitle1" gutterBottom style={{ fontFamily: "'Quicksand', sans-serif", fontWeight: 'bold' }}>
						Constraints
					</Typography>
				</Grid>
				<Grid item>
					<Typography variant="h5" gutterBottom style={{ fontFamily: "'Josefin Sans', sans-serif", fontWeight: 'bolder' }}>
						Sample Input
					</Typography>
					<Typography variant="subtitle1" gutterBottom style={{ fontFamily: "'Quicksand', sans-serif", fontWeight: 'bold' }}>
						Sample Input
					</Typography>
				</Grid>
				<Grid item>
					<Typography variant="h5" gutterBottom style={{ fontFamily: "'Josefin Sans', sans-serif", fontWeight: 'bolder' }}>
						Sample Output
					</Typography>
					<Typography variant="subtitle1" gutterBottom style={{ fontFamily: "'Quicksand', sans-serif", fontWeight: 'bold' }}>
						Sample Output
					</Typography>
				</Grid>
				<Grid item>
					<Typography variant="h5" gutterBottom style={{ fontFamily: "'Josefin Sans', sans-serif", fontWeight: 'bolder' }}>
						Explanation
					</Typography>
					<Typography variant="subtitle1" gutterBottom style={{ fontFamily: "'Quicksand', sans-serif", fontWeight: 'bolder' }}>
						Explanation
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

    const Logout = () => {

		try {
			
			dispatch({ type: 'LOGOUT' });
			history.push('/');
		} catch (error) {

			console.log(error);
		}
	}

    const handleEmail = () => {
        setRoom({ ...room, id: me });
        console.log(room);
        dispatch(emailInterviewee(room));
    }
    
    return (
        <Scrollbars autoHide autoHideTimeout={2000} style={{ height: '100vh', width: '100vw' }}>
            <div>
                <CssBaseline />
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
                    <div style={{ position: 'fixed', zIndex: 9999 }}>
                        { stream && (<MyVideo/>)}
                    </div>
                    {ready?(
                        <div>
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
                        </div>
                    ):(
                        <Grid container className={classes.background}>
                            <Grid container direction="column" justify="center" alignItems="center">
                                {isInterviewer && (
                                    <Paper className={classes.paper}>
                                        <Grid container spacing={3}>
                                            <Grid item xs={12} sm={6}>
                                                <Button variant="contained" color="primary" fullWidth onClick={handleEmail}>Email Interviewee</Button>
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <Button color="primary" fullWidth onClick={() => setReady(true)}>Ready</Button>
                                            </Grid>
                                            {call.isReceivingCall && !callAccepted && (
                                                <Grid item xs={12}>
                                                <div style={{display: 'flex', justifyContent: 'center'}}>
                                                    <Typography variant="h6" style={{ fontFamily: "'Quicksand', sans-serif" }}>Interviewee Came &nsp;</Typography>
                                                    <Button variant="contained" color="primary" onClick={answerCall}>
                                                        Answer
                                                    </Button>
                                                </div>
                                                </Grid>
                                            )}
                                        </Grid>
                                    </Paper>
                                )}
                                {isInterviewee && (
                                    <Paper className={classes.paper}>
                                        <Grid container spacing={3}>
                                            <Grid item xs={12}>
                                                <TextField
                                                    name="id"
                                                    id="id"
                                                    label="Enter id sent via email to you"
                                                    fullWidth
                                                    required
                                                    value={id}
                                                    onChange={(e) => setId(e.target.value)}
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <Button variant="contained" color="primary" fullWidth onClick={() => callUser(id)}>Connect</Button>
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <Button color="primary" fullWidth onClick={() => setReady(true)}>Ready</Button>
                                            </Grid>
                                        </Grid>
                                    </Paper>
                                )}
                            </Grid>
                        </Grid>
                    )}
                    <div style={{ position: 'fixed', zIndex: 9999 }}>
                        {callAccepted && !callEnded && (<UserVideo/>)}
                    </div>
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
                                    />
                                </Paper>
                            </Grid>
                            <Grid item style={{ height: '20px' }}/>
                            <Button color="primary" variant="contained" style={{ marginLeft: '10px', marginRight: '10px' }}>Run</Button>
                        </Grid>
                    </Drawer>
                )}
                <Footer/>
            </div>
        </Scrollbars>
    )
}

export default Interview;