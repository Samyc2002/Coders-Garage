import React, { useState, useEffect } from 'react';
import Zoom from 'react-reveal/Zoom';
import { useHistory } from 'react-router-dom';
import { Button, Grid, Typography, Snackbar, useMediaQuery } from '@material-ui/core';
import { Code as CodeIcon, Computer as ComputerIcon, PersonOutline as PersonOutlineIcon, ExitToApp as ExitToAppIcon, FilterList as FilterListIcon, Create as CreateIcon, Dashboard as DashboardIcon } from '@material-ui/icons';

import { useStyles } from './styles';
import Card from '../../components/Card';
import Header from '../../components/Header';
import Search from '../../components/Search';
import Loading from '../../components/Loading';
import AddIcon from '../../components/AddIcon';
import TagsDialog from '../../components/TagsDialog';
import { useAppDispatch } from '../../Hooks/reduxHooks';
import { fetchQuestions, getQuestionByTags } from '../../actions/question';
import { handleLogout } from '../../components/LogoutButton';

const Home = () => {

    const isTabletorMobile = useMediaQuery('(max-width: 600px)');

    const classes = useStyles(isTabletorMobile)();

    const history = useHistory();

    const dispatch = useAppDispatch();

    const [open, setOpen] = useState(false);
    const [snack, setSnack] = useState(false);
    const [loading, setLoading] = useState(true);
    const [tags, setTags] = useState([] as string[]);
    const user = JSON.parse(localStorage.getItem('profile') as string);
    const [questions, setQuestions] = useState<any[]>(JSON.parse(localStorage.getItem('questions') as string));

    const searchByTags = () => {
        if(tags === []) {
            try {
                dispatch(fetchQuestions())
                .then(() => {
                    setQuestions(JSON.parse(localStorage.getItem('questions') as string));
                    localStorage.removeItem('questions');
                    toggleOpen();
                });
            } catch (error) {
                console.log(error);
            }
        } else {
            try {
                dispatch(getQuestionByTags(tags))
                .then(() => {
                    setQuestions(JSON.parse(localStorage.getItem('questions') as string));
                    localStorage.removeItem('questions');
                    toggleOpen();
                });
            } catch (error) {
                console.log(error);
            }
        }
    }

    const toggleOpen = () => {
        setOpen(!open);
    }

    useEffect(() => {
        try {
            dispatch(fetchQuestions())
            .then(() => {
                setQuestions(JSON.parse(localStorage.getItem('questions') as string));
                localStorage.removeItem('questions');
                setLoading(false);
                setSnack(false);
            });
        } catch (error) {
            setSnack(true);
            console.log(error);
        }
    }, [dispatch]);

    const elements = [
        {
            icon: user?<ExitToAppIcon/>:<PersonOutlineIcon/>,
            title: user?'Logout':'Login',
            action: user?handleLogout:() => history.push('/signin')
        },
        {
            icon: user?<DashboardIcon/>:<CreateIcon/>,
            title: user?'Dashboard':'Signup',
            action: user?() => history.push('/profile'):() => history.push('/signup')
        },
        {
            icon: <ComputerIcon/>,
            title: 'Interview',
            action: () => history.push('/interview_home')
        },
        {
            icon: <CodeIcon/>,
            title: 'IDE',
            action: () => history.push('/ide')
        },
        {
            icon: <FilterListIcon/>,
            title: 'Tags',
            action: () => setOpen(!open)
        }
    ]

    return (
        <div>
            {loading?(
                <div>
                    <Loading/>
                    <Snackbar
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                        open={snack}
                        autoHideDuration={6000}
                        onClose={() => setSnack(false)}
                        message="Something went wrong!"
                    />
                </div>
            ):(
                <div>
                    <Header>
                        <Search setChange={setQuestions}/>
                    </Header>
                    <div className={classes.toolbar}/>
                    <AddIcon elements={elements}/>
                    <Grid container spacing={isTabletorMobile?3:5} className={classes.cards}>
                        {questions?.map((value) => (
                            <>
                                {(value !== null) && (
                                    <Grid item key={value?._id}>
                                        <Zoom>
                                            <Card heading={value?.QuestionID} body={`made by ${value?.Creator}`}>
                                                <Button variant="contained" className={classes.button} size="large" fullWidth onClick={() => history.push(`/question/${value?.QuestionID}`)}>
                                                    <Typography variant="h6" className={classes.typography}>
                                                        Go to Question
                                                    </Typography>
                                                </Button>
                                            </Card>
                                        </Zoom>
                                    </Grid>
                                )}
                            </>
                        ))}
                    </Grid>
                    <TagsDialog toggleOpen={toggleOpen} tags={tags} setTags={setTags} open={open} action={searchByTags} actionTitle="Search"/>
                </div>
            )}
        </div>
    )
}

export default Home;
