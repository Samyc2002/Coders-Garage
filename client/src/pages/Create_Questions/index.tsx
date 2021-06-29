import React, { useEffect, useState } from 'react';
import { AppBar, Button, createStyles, CssBaseline, Divider, Grid, IconButton, makeStyles, Menu, MenuItem, Paper, TextField, Theme, Toolbar, Typography, useMediaQuery } from '@material-ui/core';
import { AddCircleRounded as AddCircleRoundedIcon } from '@material-ui/icons';
import { Scrollbars } from 'react-custom-scrollbars';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Fade from 'react-reveal/Fade';

import { createQuestion, getQuestion } from '../../actions/question';
import { updateUser } from '../../actions/auth';
import Footer from '../../components/footer';
import Logo from '../../assets/LogoBlue.png';

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
    title: {
      flexGrow: 1,
    },
    hide: {
      display: 'none',
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
      display: 'flex',
      justifyContent: 'center'
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
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
    heading: {
        fontFamily: "'Josefin Sans', sans-serif",
        fontWeight: 'bolder',
        color: theme.palette.primary.main
    },
    text: {
        fontFamily: "'Quicksand', sans-serif",
        fontWeight: 'bolder'
    },
    paper: {
        maxWidth: '600px',
        padding: theme.spacing(2)
    },
    error: {
        display: 'block',
        color: theme.palette.error.main
    }
  }),
);

const Create_Questions = () => {

    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const isTabletorMobile = useMediaQuery('(max-width: 600px)');

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [question, setQuestion] = useState({
        QuestionID: '',
        ProblemStatement: '',
        Input: '',
        Output: '',
        Constraints: '',
        SampleInput: '',
        SampleOutput: '',
        Explanation: ''
    });
    const [okay, setOkay] = useState(true);
    const [success, setSuccess] = useState(false);
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

    const handleSubmit = () => {

        setUser(JSON.parse(localStorage.getItem('profile') as string));

        try {
            
            dispatch(getQuestion(question));
            const result = JSON.parse(localStorage.getItem('tmp') as string);
            if(result?.data !== null) {

                setOkay(false);
            }
            else {

                setOkay(true);
                dispatch(createQuestion(question));
                const array = user.formData.questionsCreated;
                array.push(question.QuestionID);
                setUser({ ...user, formData: { ...user.formData, questionsCreated: array } });
                dispatch(updateUser(user.formData, user.token));
                setSuccess(true);
            }
        } catch (error) {
            
            console.log(error);
        }
    }

    return (
        <Scrollbars autoHide autoHideTimeout={2000} style={{ height: '100vh', width: '100vw' }}>
            <div>
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
											<a href="/interview" style={{ textDecoration: 'none', color: '#3f51b5', fontWeight: 'bold', fontFamily: "'Quicksand', sans-serif" }}>Interview</a>
										</Typography>
									</MenuItem>
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
									<a href="/interview" style={{ textDecoration: 'none', color: '#3f51b5', fontWeight: 'bold', fontFamily: "'Quicksand', sans-serif" }}>Interview</a>
								</Typography>
							</div>
						)}
					</Toolbar>
					<Divider/>
				</AppBar>
                <div className={classes.drawerHeader} />
                <main className={classes.content}>
                    <Paper className={classes.paper}>
                        <Typography variant="h4" gutterBottom className={classes.heading}>Create Question</Typography>
                        {success?(
                            <div>
                                <Typography variant="subtitle2" gutterBottom className={classes.text}>
                                    Question created. Head on to your profile to see it there
                                </Typography>
                                <Button variant="text" color="primary" onClick={() => history.goBack()}>
                                    GO BACK
                                </Button>
                            </div>
                        ):(
                            <div>
                                <Grid container spacing={3}>
                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            id="qId"
                                            name="qId"
                                            label="Question ID"
                                            fullWidth
                                            variant="outlined"
                                            onChange={(e) => setQuestion({ ...question, QuestionID: e.target.value })}
                                        />
                                        <Fade bottom collapse when={!okay}>
                                            <div className={classes.error}>
                                                Question ID already exists.
                                            </div>
                                        </Fade>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            id="ps"
                                            name="ps"
                                            label="Problem Statement"
                                            fullWidth
                                            variant="outlined"
                                            onChange={(e) => setQuestion({ ...question, ProblemStatement: e.target.value })}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            id="input"
                                            name="input"
                                            label="Input Description"
                                            fullWidth
                                            variant="outlined"
                                            onChange={(e) => setQuestion({ ...question, Input: e.target.value })}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            id="output"
                                            name="output"
                                            label="Output Description"
                                            fullWidth
                                            variant="outlined"
                                            onChange={(e) => setQuestion({ ...question, Output: e.target.value })}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            id="constraints"
                                            name="constraints"
                                            label="Constraints"
                                            fullWidth
                                            variant="outlined"
                                            onChange={(e) => setQuestion({ ...question, Constraints: e.target.value })}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            required
                                            id="sampleInput"
                                            name="sampleInput"
                                            label="Sample Input"
                                            fullWidth
                                            variant="outlined"
                                            onChange={(e) => setQuestion({ ...question, SampleInput: e.target.value })}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            required
                                            id="sampleOnput"
                                            name="sampleOnput"
                                            label="Sample Output"
                                            fullWidth
                                            variant="outlined"
                                            onChange={(e) => setQuestion({ ...question, SampleOutput: e.target.value })}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            id="explanation"
                                            name="explanation"
                                            label="Explanation"
                                            fullWidth
                                            variant="outlined"
                                            onChange={(e) => setQuestion({ ...question, Explanation: e.target.value })}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Button variant="contained" color="primary" onClick={handleSubmit} fullWidth>CREATE</Button>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Button variant="outlined" color="primary" onClick={() => history.goBack()} fullWidth>CANCEL</Button>
                                    </Grid>
                                </Grid>
                            </div>
                        )}
                    </Paper>
                </main>
                <div className={classes.drawerHeader} />
                <Footer/>
            </div>
        </Scrollbars>
    )
}

export default Create_Questions;
