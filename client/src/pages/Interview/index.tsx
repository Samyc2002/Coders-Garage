import React, { useState } from 'react';
import { AppBar, createStyles, CssBaseline, Divider, IconButton, makeStyles, Toolbar, Typography, Theme, Drawer, List, ListItem, ListItemIcon, ListItemText, Paper, Tabs, Tab, Grid, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import { Menu as MenuIcon, HomeRounded as HomeRoundedIcon, CodeRounded as CodeRoundedIcon, ComputerRounded as ComputerRoundedIcon, Brightness4Rounded as Brightness4RoundedIcon, Brightness7Rounded as Brightness7RoundedIcon, RotateLeftRounded as RotateLeftRoundedIcon, Close as CloseIcon, PlayArrowRounded as PlayArrowRoundedIcon } from '@material-ui/icons';
import clsx from 'clsx';

import Footer from '../../components/footer';
import useLocalStorage from '../../Hooks/useLocalStore';
import Ide from '../../components/IDE';
import Logo from '../../assets/Logo';
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
	}
  }),
);

const Interview = () => {

    const classes = useStyles();
    const dark = "material-darker";
    const light = "eclipse";

	const [code, setCode] = useLocalStorage('code', '');
    const [open, setOpen] = useState(false);
    const [index, setIndex] = useState(-1);
	const [theme, setTheme] = useState(true);
    const [tab, setTab] = useState(false);
	const [content, setContent] = useState(0);

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
		<div className={classes.action} style={{ paddingTop: '30px', paddingRight: '2.5vw' }}>
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

    return (
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
                                <Logo col="#3f51b5"/>
                            </a>
                        </div>
                    </div>
                    {(content===1) && (
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
                        <ListItem button key="Interview">
                            <ListItemIcon>
                                <ComputerRoundedIcon/>
                            </ListItemIcon>
                            <ListItemText>
                                Interview
                            </ListItemText>
                        </ListItem>
                    </a>
                </List>
            </Drawer>
            <main className={classes.content}>
                <Paper square elevation={0}>
					<Tabs
						value={content}
						indicatorColor="primary"
						textColor="primary"
						onChange={handleContent}
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
            <Footer/>
        </div>
    )
}

export default Interview;