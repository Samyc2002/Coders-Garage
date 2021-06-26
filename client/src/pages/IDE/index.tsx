import React, { useState } from 'react';
import { AppBar, Button, createStyles, CssBaseline, Divider, Drawer, FormControl, Grid, IconButton, InputLabel, List, ListItem, ListItemIcon, ListItemText, makeStyles, Menu, MenuItem, Paper, Select, TextField, Theme, Toolbar, useMediaQuery } from '@material-ui/core';
import { AddCircleRounded as AddCircleRoundedIcon, ComputerRounded as ComputerRoundedIcon, HomeRounded as HomeRoundedIcon, CodeRounded as CodeRoundedIcon, Brightness7Rounded as Brightness7RoundedIcon, Brightness4Rounded as Brightness4RoundedIcon, RotateLeftRounded as RotateLeftRoundedIcon, Menu as MenuIcon, PlayArrowRounded as PlayArrowRoundedIcon, Close as CloseIcon, Palette as PaletteIcon, DashboardRounded as DashboardRoundedIcon, ExitToAppRounded as ExitToAppRoundedIcon } from '@material-ui/icons';
import { Scrollbars } from 'react-custom-scrollbars';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import clsx from 'clsx';

import 'codemirror/mode/clike/clike';
import 'codemirror/mode/python/python';
import 'codemirror/mode/ruby/ruby';
import 'codemirror/mode/swift/swift';

import useLocalStorage from '../../Hooks/useLocalStore';
import Ide from '../../components/IDE';
import Footer from '../../components/footer';
import Logo from '../../assets/LogoBlue.png';
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
      margin: 0,
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
	icon: {
		color: '#3f51b5'
	},
	text: {
		color: '#3f51b5'
	},
	back: {
		backgroundColor: '#cee8fc'
	}
  }),
);

const IDE = () => {

    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();
    const dark = "material-darker";
    const light = "eclipse";
    const isTabletorMobile = useMediaQuery('(max-width: 600px)');
    
    const [code, setCode] = useLocalStorage('code', '');
    const [open, setOpen] = useState(false);
    const [index, setIndex] = useState(-1);
    const [theme, setTheme] = useState(true);
	const [tab, setTab] = useState(false);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

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

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const Logout = () => {

		try {
			
			dispatch({ type: 'LOGOUT' });
			history.push('/');
		} catch (error) {

			console.log(error);
		}
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
        <Scrollbars autoHide autoHideTimeout={2000} style={{ height: '100vh', width: '100vw' }}>
            <div>
                <div className="IDE">
                    <CssBaseline />
                    <AppBar
                        position="fixed"
                        className={classes.appBar}
                    >
                        <Toolbar style={{ justifyContent: isTabletorMobile?'space-around':'space-between' }}>
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
                            {isTabletorMobile?(
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
                                            {language.map((value, i) => (
                                                <MenuItem value={i}>{value}</MenuItem>
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
                                    <ListItem button key="IDE" classes={{ root: classes.back }}>
                                        <ListItemIcon classes={{ root: classes.icon }}>
                                            <CodeRoundedIcon/>
                                        </ListItemIcon>
                                        <ListItemText classes={{ root: classes.text }}>
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
                        <Ide
                            value={code}
                            onChange={setCode}
                            language={modes[index]}
                            theme={theme?dark:light}
                        />
                    </main>
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
                </div>
                <Footer/>
            </div>
        </Scrollbars>
    )
}

export default IDE;
