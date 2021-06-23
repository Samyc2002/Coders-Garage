import React from 'react';
import { CssBaseline, makeStyles, Theme, createStyles, AppBar, Toolbar, Typography, Divider } from '@material-ui/core';
import { Scrollbars } from 'react-custom-scrollbars';

import Landing from '../../components/landing';
import Dash from '../../components/dashboard';
import Footer from '../../components/footer';
import Logo from '../../assets/Logo';

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
								<Logo col="#3f51b5"/>
							</a>
						</div>
						<div style={{ display: 'flex', alignItems: 'center' }}>
							<Typography variant="h6" noWrap color="primary" style={{ paddingRight: '20px' }}>
								<a href="/home" style={{ textDecoration: 'none', color: '#3f51b5', fontWeight: 'bold', fontFamily: "'Quicksand', sans-serif" }}>Home</a>
							</Typography>
							<Typography variant="h6" noWrap color="primary" style={{ fontWeight: 'bold', paddingRight: '20px' }}>
								<a href="/ide" style={{ textDecoration: 'none', color: '#3f51b5', fontWeight: 'bold', fontFamily: "'Quicksand', sans-serif" }}>IDE</a>
							</Typography>
							<Typography variant="h6" noWrap color="primary" style={{ fontWeight: 'bold' }}>
								<a href="/interview" style={{ textDecoration: 'none', color: '#3f51b5', fontWeight: 'bold', fontFamily: "'Quicksand', sans-serif" }}>Interview</a>
							</Typography>
						</div>
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
