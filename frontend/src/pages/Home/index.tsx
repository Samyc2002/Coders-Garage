import React from 'react';
import { useHistory } from 'react-router-dom';
import { Code as CodeIcon, Computer as ComputerIcon, PersonOutline as PersonOutlineIcon, ExitToApp as ExitToAppIcon } from '@material-ui/icons';

import Header from '../../components/Header';
import Search from '../../components/Search';
import AddIcon from '../../components/AddIcon';
import { useStyles } from './styles';

const Home = () => {

    const classes = useStyles();

    const history = useHistory();

    const handleLogout = () => {
        // logout logic
    }

    const elements = [
        {
            icon: <ExitToAppIcon/>,
            title: 'Logout',
            action: handleLogout
        },
        {
            icon: <PersonOutlineIcon/>,
            title: 'Dashboard',
            action: () => history.push('/profile')
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
        }
    ]

    return (
        <div>
            <Header>
                <Search/>
            </Header>
            <div className={classes.toolbar}/>
            <AddIcon elements={elements}/>
        </div>
    )
}

export default Home;
