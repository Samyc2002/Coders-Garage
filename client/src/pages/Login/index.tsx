import React, { useEffect, useState } from 'react';
import { Button, CssBaseline, makeStyles, Grid, Dialog, DialogTitle, DialogContent, DialogActions, useMediaQuery, useTheme, TextField, DialogContentText, Paper, Typography } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Fade from 'react-reveal/Fade';
import firebase from 'firebase';

import * as Providers from '../../config/authmethods';
import * as Methods from '../../authentication/auth';
import Google from '../../assets/images/Google.png';
import Facebook from '../../assets/images/Facebook.png';
import Github from '../../assets/images/Github.png';
import Twitter from '../../assets/images/Twitter.png';
import { signIn, signUp, createUser } from '../../actions/auth';

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
	
	const dispatch = useDispatch();
	const history = useHistory();

	const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile') as string));
	const [data, setData] = useState({
		firstName: '',
		lastName: '',
		Email: '',
		Password: ''
	});
	const [error1, setError1] = useState(false);
	const [error2, setError2] = useState(false);

	useEffect(() => {

		setUser(JSON.parse(localStorage.getItem('profile') as string));
	}, []);
	
	const login = async (provider: firebase.auth.AuthProvider) => {

		const res = await Methods.socialMediaAuth(provider);
		const name = res?.bc?.displayName;
		const email = res?.bc?.email;
		const token = res?.refreshToken;

		const result = {
			UserName: "",
			Image: "",
			Password: "",
			Email: email,
			Name: name,
			Institute: "",
			Country: "",
			State: "",
			City: "",
			questionsCreated: [""],
			questionsSolved: [""]
		}

		try {

			dispatch({ type: 'AUTH', data: { formData: result, token } });
			dispatch(createUser(result, token));
			setTimeout(() => history.push('/'), 1000);
		} catch (error) {
			
			console.log(error);
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

	const signin = () => {

		try {
			
			dispatch(signIn(data, history));
			const result = JSON.parse(localStorage.getItem('profile') as string);
			if(result?.formData === null) {
				setError1(true);
			}
		} catch (error) {
			
			console.log(error);
		}
	}

	const signup = () => {

		try {
			
			dispatch(signUp(data, history));
			const result = JSON.parse(localStorage.getItem('profile') as string);
			if(result.formData === null) {
				setError2(true);
			}
		} catch (error) {
			
			console.log(error);
		}
	}

	const render = () => {
		if(user?.token) {
			return (
				<Dialog
					fullScreen={fullScreen}
					open={true}
					aria-labelledby="responsive-dialog-title"
				>
					<DialogTitle id="responsive-dialog-title" style={{ display: 'flex', justifyContent: 'center' }}>Logout</DialogTitle>
					<DialogContent>
					<DialogContentText id="alert-dialog-description">
						You are already Logged in. Logout first to Login with a new id.
					</DialogContentText>
					</DialogContent>
					<DialogActions>
					<Button variant="contained" onClick={Logout} color="primary">
						Logout
					</Button>
					<Button variant="outlined" onClick={() => history.goBack()} color="primary">
						Cancel
					</Button>
					</DialogActions>
				</Dialog>
			)
		}

		return (
			<Dialog
				fullScreen={fullScreen}
				open={true}
				aria-labelledby="responsive-dialog-title"
			>
				<DialogTitle id="responsive-dialog-title" style={{ display: 'flex', justifyContent: 'center' }}>Login/Signup</DialogTitle>
				<DialogContent>
					<Grid container spacing={2} style={{ paddingBottom: '10px' }}>
						<Grid item xs={12}>
							<Fade top collapse when={error1}>
								<Paper color="error">
									<Typography variant="h6" color="error">
										Either user doesn't exist or password is incorrect. Please try again.
									</Typography>
								</Paper>
							</Fade>
						</Grid>
						<Grid item xs={12}>
							<Fade top collapse when={error2}>
								<Paper color="error">
									<Typography variant="h6" color="error">
										User already exists.
									</Typography>
								</Paper>
							</Fade>
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextField
								id="fname"
								label="First Name"
								type="text"
								fullWidth
								onChange={(e) => setData({ ...data, firstName: e.target.value })}
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextField
								id="lname"
								label="Last Name"
								type="text"
								fullWidth
								onChange={(e) => setData({ ...data, lastName: e.target.value })}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								required
								id="email"
								label="Email"
								type="email"
								fullWidth
								onChange={(e) => setData({ ...data, Email: e.target.value })}
							/>
						</Grid>
						<Grid item xs={12} style={{ paddingBottom: '10px' }}>
							<TextField
								required
								id="password"
								label="Password"
								type="password"
								fullWidth
								onChange={(e) => setData({ ...data, Password: e.target.value })}
							/>
						</Grid>
						<Grid item xs={6} sm={3} justify="center" style={{ display: 'flex' }}>
							<img src={Google} alt="Google Login" style={{ maxWidth: '50px', cursor: 'pointer' }} onClick={() => login(Providers.googleProvider)}/>
						</Grid>
						<Grid item xs={6} sm={3} justify="center" style={{ display: 'flex' }}>
							<img src={Facebook} alt="Facebook Login" style={{ maxWidth: '50px', cursor: 'pointer' }} onClick={() => login(Providers.facebookProvider)}/>
						</Grid>
						<Grid item xs={6} sm={3} justify="center" style={{ display: 'flex' }}>
							<img src={Github} alt="Github Login" style={{ maxWidth: '50px', cursor: 'pointer' }} onClick={() => login(Providers.githubProvider)}/>
						</Grid>
						<Grid item xs={6} sm={3} justify="center" style={{ display: 'flex' }}>
							<img src={Twitter} alt="Twitter Login" style={{ maxWidth: '50px', cursor: 'pointer' }} onClick={() => login(Providers.twitterProvider)}/>
						</Grid>
					</Grid>
				</DialogContent>
				<DialogActions>
					<Grid container spacing={2}>
						<Grid item xs={12} sm={6}>
							<Button variant="contained" color="primary" fullWidth onClick={signin}>
								Signin
							</Button>
						</Grid>
						<Grid item xs={12} sm={6}>
							<Button variant="outlined" color="primary" fullWidth onClick={signup}>
								Signup
							</Button>
						</Grid>
					</Grid>
				</DialogActions>
			</Dialog>
		)
	}
	
	return (
		<div>
			<CssBaseline />
			<Grid container className={classes.background}/>
			{render()}
		</div>
	);
}