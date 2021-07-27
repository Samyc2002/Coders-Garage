import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Code as CodeIcon, Computer as ComputerIcon, PersonOutline as PersonOutlineIcon, ExitToApp as ExitToAppIcon, FilterList as FilterListIcon } from '@material-ui/icons';

import Header from '../../components/Header';
import Search from '../../components/Search';
import AddIcon from '../../components/AddIcon';
import TagsDialog from '../../components/TagsDialog';
import { handleLogout } from '../../components/LogoutButton';
import { useStyles } from './styles';

const Home = () => {

    const classes = useStyles();

    const history = useHistory();

    const searchByTags = () => {
        // search by tags logic
        toggleOpen();
    }

    const toggleOpen = () => {
        setOpen(!open);
    }

    const [open, setOpen] = useState(false);
    const [tags, setTags] = useState([] as string[]);

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
        },
        {
            icon: <FilterListIcon/>,
            title: 'Tags',
            action: () => setOpen(!open)
        }
    ]

    return (
        <div>
            <Header>
                <Search/>
            </Header>
            <div className={classes.toolbar}/>
            <AddIcon elements={elements}/>
            <TagsDialog toggleOpen={toggleOpen} tags={tags} setTags={setTags} open={open} action={searchByTags} actionTitle="Search"/>
        </div>
    )
}

export default Home;
