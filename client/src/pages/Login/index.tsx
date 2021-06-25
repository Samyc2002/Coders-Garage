import React from 'react';
import { Button, CssBaseline, makeStyles, Grid, Dialog, DialogTitle, DialogContent, DialogActions, useMediaQuery, useTheme, TextField } from '@material-ui/core';
import firebase from 'firebase';

import * as Providers from '../../config/authmethods';
import * as Methods from '../../authentication/auth';
import Google from '../../assets/Google.png';
import Facebook from '../../assets/Facebook.png';
import Github from '../../assets/Github.png';
import Twitter from '../../assets/Twitter.png';

const useStyles = makeStyles((theme) => ({
	background: {
		height: '100vh',
		backgroundImage: 'url(https://images.unsplash.com/photo-1489875347897-49f64b51c1f8?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80)',
		backgroundRepeat: 'no-repeat',
		backgroundColor: '#ffffff',
		backgroundSize: 'cover',
		backgroundPosition: 'center'
	}
}));

export default function SignIn() {

	const classes = useStyles();
	const theme = useTheme();
	const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

	const login = async (provider: firebase.auth.AuthProvider) => {
		const res = await Methods.socialMediaAuth(provider);
		console.log(res);
	}

	return (
		<div>
			<CssBaseline />
			<Grid container className={classes.background}/>
			<Dialog
				fullScreen={fullScreen}
				open={true}
				aria-labelledby="responsive-dialog-title"
			>
				<DialogTitle id="responsive-dialog-title" style={{ display: 'flex', justifyContent: 'center' }}>Login/Signup</DialogTitle>
				<DialogContent>
					<Grid container spacing={2} style={{ paddingBottom: '10px' }}>
						<Grid item xs={12} sm={6}>
							<TextField
								id="fname"
								label="First Name"
								type="text"
								fullWidth
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextField
								id="lname"
								label="Last Name"
								type="text"
								fullWidth
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								required
								id="username"
								label="Username"
								type="text"
								fullWidth
							/>
						</Grid>
						<Grid item xs={12} style={{ paddingBottom: '10px' }}>
							<TextField
								required
								id="password"
								label="Password"
								type="password"
								fullWidth
							/>
						</Grid>
						<Grid item xs={6} sm={3} justify="center" style={{ display: 'flex' }}>
							<img src={Google} alt="Google Login" style={{ maxWidth: '50px' }}/>
						</Grid>
						<Grid item xs={6} sm={3} justify="center" style={{ display: 'flex' }}>
							<img src={Facebook} alt="Facebook Login" style={{ maxWidth: '50px' }}/>
						</Grid>
						<Grid item xs={6} sm={3} justify="center" style={{ display: 'flex' }}>
							<img src={Github} alt="Github Login" style={{ maxWidth: '50px' }}/>
						</Grid>
						<Grid item xs={6} sm={3} justify="center" style={{ display: 'flex' }}>
							<img src={Twitter} alt="Twitter Login" style={{ maxWidth: '50px' }}/>
						</Grid>
					</Grid>
				</DialogContent>
				<DialogActions>
					<Grid container spacing={2}>
						<Grid item xs={12} sm={6}>
							<Button variant="contained" color="primary" fullWidth>
								Login
							</Button>
						</Grid>
						<Grid item xs={12} sm={6}>
							<Button variant="outlined" color="primary" fullWidth>
								Signup
							</Button>
						</Grid>
					</Grid>
				</DialogActions>
			</Dialog>
		</div>
	);
}