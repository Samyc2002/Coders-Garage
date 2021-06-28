import React, { useEffect, useState } from 'react';
import { AppBar, Avatar, Button, createStyles, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Grid, IconButton, makeStyles, Menu, MenuItem, Paper, TextField, Theme, Toolbar, Typography, useMediaQuery } from '@material-ui/core';
import { AddCircleRounded as AddCircleRoundedIcon } from '@material-ui/icons';
import { amber, blue, deepOrange, deepPurple, indigo, lightBlue, pink, teal } from '@material-ui/core/colors';
import { Scrollbars } from 'react-custom-scrollbars';
import { useHistory } from 'react-router-dom';
import FileBase64 from 'react-file-base64';
import { useDispatch } from 'react-redux';
import clsx from 'clsx';

import Footer from '../../components/footer';
import Logo from '../../assets/LogoBlue.png';
import { updateUser } from '../../actions/auth';
import './styles.css'

const useStyles = makeStyles((theme: Theme) => createStyles({

	root: {
		display: 'flex',
    	flexDirection: 'column',
		justifyContent: 'space-between',
        minHeight: '100vh'
    },
	orange: {
        color: theme.palette.getContrastText(deepOrange[500]),
        backgroundColor: deepOrange[500]
    },
    purple: {
        color: theme.palette.getContrastText(deepPurple[500]),
        backgroundColor: deepPurple[500]
    },
    pink: {
        color: theme.palette.getContrastText(pink[500]),
        backgroundColor: pink[500]
    },
    indigo: {
        color: theme.palette.getContrastText(indigo[500]),
        backgroundColor: indigo[500]
    },
    blue: {
        color: theme.palette.getContrastText(blue[500]),
        backgroundColor: blue[500]
    },
    lightBlue: {
        color: theme.palette.getContrastText(lightBlue[500]),
        backgroundColor: lightBlue[500]
    },
    teal: {
        color: theme.palette.getContrastText(teal[500]),
        backgroundColor: teal[500]
    },
    amber: {
        color: theme.palette.getContrastText(amber[500]),
        backgroundColor: amber[500]
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        boxShadow: 'none',
        backgroundColor: '#ffffff',
    },
      toolbar: {
		display: "flex",
		alignItems: "center",
		justifyContent: "flex-end",
		padding: theme.spacing(0, 1),
		// necessary for content to be below app bar
		...theme.mixins.toolbar
    },
	drawerHeader: {
		display: 'flex',
		alignItems: 'center',
		padding: theme.spacing(0, 1),
		// necessary for content to be below app bar
		...theme.mixins.toolbar,
		justifyContent: 'flex-start',
	},
	large: {
		width: theme.spacing(35),
		height: theme.spacing(35),
		marginBottom: theme.spacing(2),
		fontSize: theme.spacing(10)
	},
	text: {
		color: theme.palette.getContrastText(theme.palette.primary.contrastText),
		fontFamily: "'Quicksand', sans-serif",
		fontWeight: 'bolder'
	},
	btn: {
		fontFamily: "'Quicksand', sans-serif"		
	},
	cont: {
		paddingTop: theme.spacing(4)
	},
	grid: {
		display: 'flex',
		flexDirection: 'column',
    	alignItems: 'center',
		paddingRight: theme.spacing(4)
	},
	edge: {
		display: 'flex',
		flexDirection: 'column',
    	alignItems: 'center'
	},
	div: {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center'
	},
	paper: {
		paddingLeft: theme.spacing(2)
	}
}))

interface File{
	base64: string
}

const Profile = () => {

    const classes = useStyles();
	const dispatch = useDispatch();
	const history = useHistory();
	const isTabletorMobile = useMediaQuery('(max-width: 600px)');

	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const [user, setUser] = useState<any>(JSON.parse(localStorage.getItem('profile') as string));
	const [update, setUpdate] = useState<any>(JSON.parse(localStorage.getItem('profile') as string));
	const [open, setOpen] = useState(false);

	useEffect(() => {

		setUser(JSON.parse(localStorage.getItem('profile') as string));
	}, []);

	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleclose = () => {
		setOpen(false);
	};

	const handleSubmit = () => {

		setUser(JSON.parse(localStorage.getItem('profile') as string));

		try {
			
			dispatch(updateUser(update.formData, update.token));
			setUser(update);
			handleclose();
		} catch (error) {
			
			console.log(error)
		}
	}

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

    return (
        <Scrollbars autoHide autoHideTimeout={2000} style={{ height: '100vh', width: '100vw' }}>
            <div className={classes.root}>
				<div>
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
												<a href="/interview" style={{ textDecoration: 'none', color: '#3f51b5', fontWeight: 'bold', fontFamily: "'Quicksand', sans-serif" }}>Interview</a>
											</Typography>
											<MenuItem onClick={Logout}>
												<Typography variant="h6" noWrap color="primary" style={{ fontWeight: 'bold' }}>
													Logout
												</Typography>
											</MenuItem>
										</MenuItem>
									</Menu>
								</div>
							):(
								<div style={{ display: 'flex', alignItems: 'center' }}>
									<Typography variant="h6" noWrap color="primary" style={{ paddingLeft: '20px' }}>
										<a href="/home" style={{ textDecoration: 'none', color: '#3f51b5', fontWeight: 'bold', fontFamily: "'Quicksand', sans-serif" }}>Home</a>
									</Typography>
									<Typography variant="h6" noWrap color="primary" style={{ fontWeight: 'bold', paddingLeft: '20px' }}>
										<a href="/ide" style={{ textDecoration: 'none', color: '#3f51b5', fontWeight: 'bold', fontFamily: "'Quicksand', sans-serif" }}>IDE</a>
									</Typography>
									<Typography variant="h6" noWrap color="primary" style={{ fontWeight: 'bold', paddingLeft: '20px' }}>
										<a href="/interview" style={{ textDecoration: 'none', color: '#3f51b5', fontWeight: 'bold', fontFamily: "'Quicksand', sans-serif" }}>Interview</a>
									</Typography>
									<Button variant="contained" color="primary" size="small" aria-controls="big-menu" aria-haspopup="true" style={{ marginLeft: '20px' }} onClick={Logout}>
										<Typography variant="h6" noWrap color="primary" style={{ fontWeight: 'bold', color: '#ffffff', fontFamily: "'Quicksand', sans-serif" }}>
											Logout
										</Typography>
									</Button>
								</div>
							)}
						</Toolbar>
						<Divider/>
					</AppBar>
					<Grid container className={classes.cont}>
						<Grid item xs={12} sm={4} className={classes.edge}>
							{(user?.formData?.Image === '')?(
								<Avatar alt={user?.formData?.Image} className={clsx({[classes.purple]:true, [classes.large]: true})}>{user?.formData?.Name?.[0]}</Avatar>
							):(
								<Avatar alt={user?.formData?.Image} src={user?.formData?.Image} className={clsx({[classes.purple]:true, [classes.large]: true})}/>
							)}
							<Typography variant="h6" gutterBottom className={classes.text}>{user?.formData?.Name}</Typography>
							<div className={classes.div}>
								<Typography variant="subtitle2" gutterBottom className={classes.text}>{user?.formData?.UserName}</Typography>
								<Button variant="text" color="primary" className={classes.btn} onClick={handleClickOpen}>Edit</Button>
							</div>
						</Grid>
						<Grid item xs={12} sm={4} className={classes.grid}>
							<Paper elevation={3}>
								<Typography variant="h6" gutterBottom className={clsx({[classes.text]: true, [classes.paper]: true})}>
									Solved questions
								</Typography>
								<Divider/>
								{((user?.formData?.questionsSolved?.length === 1) && (user?.formData?.questionsSolved?.[0] === ""))?(
									<Typography variant="subtitle2" gutterBottom className={clsx({[classes.text]: true, [classes.paper]: true})}>
										You have not Solved any questions yet. Head on to the Home page to start your journey.
									</Typography>
								):user?.formData?.questionsSolved?.map((value: string) => (
									<div>
										<Typography variant="subtitle2" gutterBottom className={clsx({[classes.text]: true, [classes.paper]: true})}>{value}</Typography>
										<Divider variant="middle"/>
									</div>
								))}
							</Paper>
						</Grid>
						<Grid item xs={12} sm={4} className={classes.grid}>
							<Paper elevation={3}>
								<Typography variant="h6" gutterBottom className={clsx({[classes.text]: true, [classes.paper]: true})}>
									Created questions
								</Typography>
								<Divider/>
								{((user?.formData?.questionsCreated?.length === 1) && (user?.formData?.questionsCreated?.[0] === ""))?(
									<Typography variant="subtitle2" gutterBottom className={clsx({[classes.text]: true, [classes.paper]: true})}>
										You have not Created any questions yet. Head on to the Home page to start your journey.
									</Typography>
								):user?.formData?.questionsCreated?.map((val: string) => (
									<div>
										<Typography variant="subtitle2" gutterBottom className={clsx({[classes.text]: true, [classes.paper]: true})}>{val}</Typography>
										<Divider variant="middle"/>
									</div>
								))}
							</Paper>
						</Grid>
					</Grid>
					<Dialog open={open} onClose={handleclose} aria-labelledby="form-dialog-title" fullScreen={isTabletorMobile}>
						<DialogTitle id="form-dialog-title">Edit Profile</DialogTitle>
						<DialogContent>
							<Grid container spacing={2}>
								<Grid item xs={12}>
									<TextField
										margin="dense"
										id="name"
										label="Name"
										type="text"
										fullWidth
										onChange={(e) => setUpdate({ ...update, formData: { ...update.formData, Name: e.target.value } })}
									/>	
								</Grid>
								<Grid item xs={12}>
									<TextField
										margin="dense"
										id="username"
										label="Username"
										type="text"
										fullWidth
										onChange={(e) => setUpdate({ ...update, formData: { ...update.formData, UserName: e.target.value } })}
									/>
								</Grid>
								<Grid item xs={12}>
									<TextField
										margin="dense"
										id="password"
										label="Password"
										type="password"
										fullWidth
										onChange={(e) => setUpdate({ ...update, formData: { ...update.formData, Password: e.target.value } })}
									/>
								</Grid>
								<Grid item xs={12}>
									<TextField
										margin="dense"
										id="country"
										label="Country"
										type="text"
										fullWidth
										onChange={(e) => setUpdate({ ...update, formData: { ...update.formData, Country: e.target.value } })}
									/>
								</Grid>
								<Grid item xs={12}>
									<TextField
										margin="dense"
										id="state"
										label="State"
										type="text"
										fullWidth
										onChange={(e) => setUpdate({ ...update, formData: { ...update.formData, State: e.target.value } })}
									/>
								</Grid>
								<Grid item xs={12}>
									<TextField
										margin="dense"
										id="city"
										label="City"
										type="text"
										fullWidth
										onChange={(e) => setUpdate({ ...update, formData: { ...update.formData, City: e.target.value } })}
									/>
								</Grid>
								<Grid item xs={12}>
									<TextField
										margin="dense"
										id="institute"
										label="Institute"
										type="text"
										fullWidth
										onChange={(e) => setUpdate({ ...update, formData: { ...update.formData, Institute: e.target.value } })}
									/>
								</Grid>
								<Grid item xs={12} sm={6}>
									<Typography variant="subtitle2" gutterBottom className={classes.text}>Upload Profile Picture</Typography>
								</Grid>
								<Grid item xs={12} sm={6}>
									<FileBase64
										type="file"
										multiple={false}
										onDone={({ base64 }: File) => setUpdate({ ...update, formData: { ...update.formData, Image: base64 } })}
									/>
								</Grid>
							</Grid>
						</DialogContent>
						<DialogActions>
							<Button onClick={handleSubmit} color="primary">
								Update Profile
							</Button>
							<Button onClick={handleclose} color="primary">
								Cancel
							</Button>
						</DialogActions>
					</Dialog>
				</div>
				<div>
					<Footer/>
				</div>
            </div>
        </Scrollbars>
    )
}

export default Profile;
