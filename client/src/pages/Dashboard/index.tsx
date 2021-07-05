import React, { useEffect, useState } from 'react';
import { CssBaseline, makeStyles, Theme, createStyles, AppBar, Toolbar, Typography, Divider, useMediaQuery, Button, Menu, MenuItem, IconButton } from '@material-ui/core';
import { AddCircleRounded as AddCircleRoundedIcon } from '@material-ui/icons'
import { Scrollbars } from 'react-custom-scrollbars';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import Landing from '../../components/landing';
import Dash from '../../components/dashboard';
import Footer from '../../components/footer';
import Logo from '../../assets/images/LogoBlue.png';

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
    }
  }),
);

const Dashboard = () => {

    const classes = useStyles();
	const history = useHistory();
	const dispatch = useDispatch();
    const isTabletorMobile = useMediaQuery('(max-width: 600px)');

	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile') as string));

	useEffect(() => {

		setUser(JSON.parse(localStorage.getItem('profile') as string));
	}, []);

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
			setUser(null);
		} catch (error) {

			console.log(error);
		}
		handleClose();
	}

	const render_small = () => {
		if(user?.token) {
			return (
				<div>
					<MenuItem onClick={handleClose}>
						<Typography variant="h6" noWrap color="primary" style={{ fontWeight: 'bold' }}>
							<a href="/profile" style={{ textDecoration: 'none', color: '#3f51b5', fontWeight: 'bold', fontFamily: "'Quicksand', sans-serif" }}>
								Profile
							</a>
						</Typography>
					</MenuItem>
					<MenuItem onClick={Logout}>
						<Typography variant="h6" noWrap color="primary" style={{ fontWeight: 'bold' }}>
							Logout
						</Typography>
					</MenuItem>
				</div>
			)
		}

		return (
			<div>
				<MenuItem onClick={handleClose}>
					<Typography variant="h6" noWrap color="primary" style={{ fontWeight: 'bold' }}>
						<a href="/login" style={{ textDecoration: 'none', color: '#3f51b5', fontWeight: 'bold', fontFamily: "'Quicksand', sans-serif" }}>
							Login
						</a>
					</Typography>
				</MenuItem>
			</div>
		)
	}

	const render_big = () => {
		if(user?.token) {
			return (
				<div>
					<Button variant="contained" color="primary" size="small" aria-controls="big-menu" aria-haspopup="true"  onClick={handleClick}>
						<Typography variant="h6" noWrap color="primary" style={{ fontWeight: 'bold', color: '#ffffff', fontFamily: "'Quicksand', sans-serif" }}>
							Profile
						</Typography>
					</Button>
					<Menu
						id="big-menu"
						anchorEl={anchorEl}
						keepMounted
						open={Boolean(anchorEl)}
						onClose={handleClose}
					>
						<MenuItem onClick={handleClose}>
							<Typography variant="h6" noWrap color="primary" style={{ fontWeight: 'bold' }}>
								<a href="/profile" style={{ textDecoration: 'none', color: '#3f51b5', fontWeight: 'bolder', fontFamily: "'Quicksand', sans-serif" }}>
									Dashboard
								</a>
							</Typography>
						</MenuItem>
						<MenuItem onClick={Logout}>
							<Typography variant="h6" noWrap color="primary" style={{ fontWeight: 'bold', color: '#3f51b5', fontFamily: "'Quicksand', sans-serif" }}>
								Logout
							</Typography>
						</MenuItem>
					</Menu>
				</div>
			)
		}

		return (
			<div>
				<Button variant="contained" color="primary" size="small" aria-controls="big-menu" aria-haspopup="true"  onClick={handleClick}>
					<Typography variant="h6" noWrap color="primary" style={{ fontWeight: 'bold' }}>
						<a href="/login" style={{ textDecoration: 'none', fontWeight: 'bold', color: '#ffffff', fontFamily: "'Quicksand', sans-serif" }}>
							Login
						</a>
					</Typography>
				</Button>
			</div>
		)
	}

    return (
		<Scrollbars autoHide autoHideTimeout={2000} style={{ height: '100vh', width: '100vw' }}>
			<div>
				<Landing/>
				<CssBaseline />
				<AppBar
					position="sticky"
					className={classes.appBar}
				>
					<Toolbar style={{ justifyContent: 'space-between' }}>
						<div style={{ display: 'flex', alignItems: 'center', transform: 'scale(0.7, 0.7)' }}>
							<a href="/">
								<img src={Logo} alt="Logo" style={{ maxWidth: isTabletorMobile?'25x':'50px' }}/>
							</a>
						</div>
						{isTabletorMobile?(
							<div>
								<Button aria-controls="small-menu" aria-haspopup="true" onClick={handleClick}>
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
									id="small-menu"
									anchorEl={anchorEl}
									keepMounted
									open={Boolean(anchorEl)}
									onClose={handleClose}
								>
									<MenuItem onClick={handleClose}>
										<Typography variant="h6" noWrap color="primary" style={{ paddingRight: '20px' }}>
											<a href="/home" style={{ textDecoration: 'none', color: '#3f51b5', fontWeight: 'bold', fontFamily: "'Quicksand', sans-serif" }}>Home</a>
										</Typography>
									</MenuItem>
									<MenuItem onClick={handleClose}>
										<Typography variant="h6" noWrap color="primary" style={{ fontWeight: 'bold', paddingRight: '20px' }}>
											<a href="/ide" style={{ textDecoration: 'none', color: '#3f51b5', fontWeight: 'bold', fontFamily: "'Quicksand', sans-serif" }}>IDE</a>
										</Typography>
									</MenuItem>
									<MenuItem onClick={handleClose}>
										<Typography variant="h6" noWrap color="primary" style={{ fontWeight: 'bold' }}>
											<a href="/interview_home" style={{ textDecoration: 'none', color: '#3f51b5', fontWeight: 'bold', fontFamily: "'Quicksand', sans-serif" }}>Interview</a>
										</Typography>
									</MenuItem>
									{render_small()}
								</Menu>
						  	</div>
						):(
							<div style={{ display: 'flex', alignItems: 'center' }}>
								<Typography variant="h6" noWrap color="primary" style={{ paddingRight: '20px' }}>
									<a href="/home" style={{ textDecoration: 'none', color: '#3f51b5', fontWeight: 'bold', fontFamily: "'Quicksand', sans-serif" }}>Home</a>
								</Typography>
								<Typography variant="h6" noWrap color="primary" style={{ fontWeight: 'bold', paddingRight: '20px' }}>
									<a href="/ide" style={{ textDecoration: 'none', color: '#3f51b5', fontWeight: 'bold', fontFamily: "'Quicksand', sans-serif" }}>IDE</a>
								</Typography>
								<Typography variant="h6" noWrap color="primary" style={{ fontWeight: 'bold', paddingRight: '20px' }}>
									<a href="/interview_home" style={{ textDecoration: 'none', color: '#3f51b5', fontWeight: 'bold', fontFamily: "'Quicksand', sans-serif" }}>Interview</a>
								</Typography>
								{render_big()}
							</div>
						)}
					</Toolbar>
					<Divider/>
				</AppBar>
				<Dash/>
				<Footer/>
			</div>
		</Scrollbars>
    )
}

export default Dashboard;
