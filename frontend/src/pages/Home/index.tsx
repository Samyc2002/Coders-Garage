import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Grid, Typography } from '@material-ui/core';
import { Code as CodeIcon, Computer as ComputerIcon, PersonOutline as PersonOutlineIcon, ExitToApp as ExitToAppIcon, FilterList as FilterListIcon, Create as CreateIcon, Dashboard as DashboardIcon } from '@material-ui/icons';

import { useStyles } from './styles';
import Card from '../../components/Card';
import Header from '../../components/Header';
import Search from '../../components/Search';
import Loading from '../../components/Loading';
import AddIcon from '../../components/AddIcon';
import TagsDialog from '../../components/TagsDialog';
import { fetchQuestions } from '../../actions/question';
import { useAppDispatch } from '../../Hooks/reduxHooks';
import { handleLogout } from '../../components/LogoutButton';

const Home = () => {

    const classes = useStyles();

    const history = useHistory();

    const dispatch = useAppDispatch();

    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [tags, setTags] = useState([] as string[]);
    const user = JSON.parse(localStorage.getItem('profile') as string);
    const [questions, setQuestions] = useState<any[]>(JSON.parse(localStorage.getItem('questions') as string));

    const searchByTags = () => {
        // search by tags logic
        toggleOpen();
    }

    const toggleOpen = () => {
        setOpen(!open);
    }

    useEffect(() => {
        setLoading(true);
        try {
            dispatch(fetchQuestions())
            .then(() => {
                setQuestions(JSON.parse(localStorage.getItem('questions') as string));
                localStorage.removeItem('questions');
                setLoading(false);
            });
        } catch (error) {
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
                <Loading/>
            ):(
                <div>
                    <Header>
                        <Search/>
                    </Header>
                    <div className={classes.toolbar}/>
                    <AddIcon elements={elements}/>
                    <Grid container spacing={2} className={classes.cards}>
                        {questions?.map((value) => (
                            <Grid item>
                                <Card heading={value.QuestionID} body={value.Creator}>
                                    <Button variant="contained" className={classes.button} size="large" fullWidth onClick={() => history.push(`/question/${value._id}`)}>
                                        <Typography variant="h6" className={classes.typography}>
                                            Go to Question
                                        </Typography>
                                    </Button>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                    <TagsDialog toggleOpen={toggleOpen} tags={tags} setTags={setTags} open={open} action={searchByTags} actionTitle="Search"/>
                </div>
            )}
        </div>
    )
}

export default Home;
