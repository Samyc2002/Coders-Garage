import React, { useState } from 'react';
import { AppBar, CssBaseline, IconButton, makeStyles, Toolbar, createStyles, Theme, useMediaQuery, Divider, Drawer, List, ListItem, ListItemIcon, ListItemText, Button, Menu, MenuItem, Typography } from '@material-ui/core';
import { Menu as MenuIcon, HomeRounded as HomeRoundedIcon, CodeRounded as CodeRoundedIcon, ComputerRounded as ComputerRoundedIcon, AddCircleRounded as AddCircleRoundedIcon, Palette as PaletteIcon, DashboardRounded as DashboardRoundedIcon, ExitToAppRounded as ExitToAppRoundedIcon } from '@material-ui/icons';
import { Scrollbars } from 'react-custom-scrollbars';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import clsx from 'clsx';

import Logo from '../../assets/images/LogoBlue.png';
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
	}
  }),
);

const Home = () => {

    const classes = useStyles();
	const history = useHistory();
	const dispatch = useDispatch();
    const isTabletorMobile = useMediaQuery('(max-width: 600px)');
    
    const [tab, setTab] = useState(false);
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

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
                        <div>
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
										<MenuItem onClick={handleClose}>
											<Typography variant="h6" noWrap color="primary" style={{ paddingRight: '20px' }}>
												<a href="/home" style={{ textDecoration: 'none', color: '#3f51b5', fontWeight: 'bold', fontFamily: "'Quicksand', sans-serif" }}>Practice</a>
											</Typography>
										</MenuItem>
										<MenuItem onClick={handleClose}>
											<Typography variant="h6" noWrap color="primary" style={{ paddingRight: '20px' }}>
												<a href="/home" style={{ textDecoration: 'none', color: '#3f51b5', fontWeight: 'bold', fontFamily: "'Quicksand', sans-serif" }}>1v1</a>
											</Typography>
										</MenuItem>
										<MenuItem onClick={handleClose}>
											<Typography variant="h6" noWrap color="primary" style={{ fontWeight: 'bold', paddingRight: '20px' }}>
												<a href="/ide" style={{ textDecoration: 'none', color: '#3f51b5', fontWeight: 'bold', fontFamily: "'Quicksand', sans-serif" }}>Contests</a>
											</Typography>
										</MenuItem>
									</Menu>
								</div>
							):(
								<div style={{ display: 'flex', alignItems: 'center' }}>
									<Typography variant="h6" noWrap color="primary" style={{ paddingRight: '20px' }}>
										<a href="/home" style={{ textDecoration: 'none', color: '#3f51b5', fontWeight: 'bold', fontFamily: "'Quicksand', sans-serif" }}>Practice</a>
									</Typography>
									<Typography variant="h6" noWrap color="primary" style={{ paddingRight: '20px' }}>
										<a href="/home" style={{ textDecoration: 'none', color: '#3f51b5', fontWeight: 'bold', fontFamily: "'Quicksand', sans-serif" }}>1v1</a>
									</Typography>
									<Typography variant="h6" noWrap color="primary" style={{ fontWeight: 'bold', paddingRight: '20px' }}>
										<a href="/ide" style={{ textDecoration: 'none', color: '#3f51b5', fontWeight: 'bold', fontFamily: "'Quicksand', sans-serif" }}>Contests</a>
									</Typography>
								</div>
							)}
                        </div>
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
								<ListItem button key="Home" classes={{ root: classes.back }}>
									<ListItemIcon classes={{ root: classes.icon }}>
										<HomeRoundedIcon/>
									</ListItemIcon>
									<ListItemText classes={{ root: classes.text }}>
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

                </main>
                <Footer/>
            </div>
        </Scrollbars>
    )
}

export default Home;
