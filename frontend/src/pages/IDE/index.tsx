import React, { useState } from 'react';
import clsx from 'clsx';
import useSound from 'use-sound';
import Zoom from 'react-reveal/Zoom';
import Fade from 'react-reveal/Fade';
import Slide from 'react-reveal/Slide';
import Spin from 'react-reveal/Spin';
import { useHistory } from 'react-router-dom';
import { Button, FormControl, IconButton, InputLabel, MenuItem, Select, Typography, useMediaQuery } from '@material-ui/core';
import { Brightness7Rounded as Brightness7RoundedIcon, Brightness4Rounded as Brightness4RoundedIcon, RotateLeftRounded as RotateLeftRoundedIcon, PlayArrowRounded as PlayArrowRoundedIcon, Close as CloseIcon, ExitToApp as ExitToAppIcon, PersonOutline as PersonOutlineIcon, Computer as ComputerIcon, HomeRounded as HomeRoundedIcon, Create as CreateIcon, Dashboard as DashboardIcon } from '@material-ui/icons';

import 'codemirror/mode/clike/clike';
import 'codemirror/mode/python/python';
import 'codemirror/mode/ruby/ruby';
import 'codemirror/mode/swift/swift';

import './styles.css';
import { useStyles } from './styles';
import Ide from '../../components/IDE';
import Header from '../../components/Header';
import AddIcon from '../../components/AddIcon';
import SwitchSFX from '../../assets/sounds/Switch.mp3';
import useLocalStorage from '../../Hooks/useLocalStore';
import IdeDrawer from '../../components/General_IDE_Drawer';
import {  handleLogout} from '../../components/LogoutButton';

const IDE = () => {

    const isTabletorMobile = useMediaQuery('(max-width: 1279px)')

    const classes = useStyles(isTabletorMobile)();

    const history = useHistory();

    const [switchSound] = useSound(SwitchSFX, { volume: 1 });

    const [code, setCode] = useLocalStorage('code', '');
    const [light, setLight] = useState(false);
    const [sidebar, setSidebar] = useState(false);
    const [index, setIndex] = useState(-1);
    
    const user = JSON.parse(localStorage.getItem('profile') as string);

    const toggleSidebar = () => {
        setSidebar(!sidebar);
    }

    const resetCode = () => {
        setCode('');
    }

    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setIndex(event.target.value as number);
    }

    const themeChange = () => {
        setLight(!light);
        switchSound();
    }

    const language = [ 'C', 'C++', 'C#', 'Java', 'Python3', 'Ruby', 'Kotlin', 'Swift' ];
    const format = [ 'c', 'cpp', 'csharp' , 'java', 'python3', 'ruby', 'kotlin', 'swift' ];
    const modes = [
        'text/x-c++src',
        'text/x-c++src',
        'text/x-c++src',
        'text/x-c++src',
        'text/x-python',
        'text/x-ruby',
        'text/x-c++src',
        'text/x-swift',
    ];

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
            icon: <HomeRoundedIcon/>,
            title: 'Home',
            action: () => history.push('/home')
        }
    ]

    return (
        <div>
            <Header>
                {isTabletorMobile?(
                    <FormControl className={clsx(classes.formControl, 'language')} style={{ marginLeft: '10px' }}>
                        <InputLabel id="demo-simple-select-label">Language</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={language[index]}
                            onChange={handleChange}
                        >
                            {language.map((value, i) => (
                                <MenuItem value={i}>{value}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                ):(
                    <Slide top>
                        <FormControl className={clsx(classes.formControl, 'language')} style={{ marginLeft: '10px' }}>
                            <InputLabel id="demo-simple-select-label">Language</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={language[index]}
                                onChange={handleChange}
                            >
                                {language.map((value, i) => (
                                    <MenuItem value={i}>{value}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Slide>
                )}
                {isTabletorMobile?(
                    <Button onClick={resetCode} className={classes.icon}>
                        <Typography variant="body1" className={classes.headerText}>
                            Reset Code
                        </Typography>
                    </Button>
                ):(
                    <Spin>
                        <IconButton onClick={resetCode} className={classes.icon}>
                            <RotateLeftRoundedIcon/>
                        </IconButton>
                    </Spin>
                )}
                {isTabletorMobile?(
                    <Button onClick={themeChange} className={classes.icon}>
                        <Typography variant="body1" className={classes.headerText}>
                            Change IDE Theme
                        </Typography>
                    </Button>
                ):(
                    <Zoom>
                        <IconButton onClick={themeChange} className={classes.icon}>
                            {light?<Brightness7RoundedIcon/>:<Brightness4RoundedIcon/>}
                        </IconButton>
                    </Zoom>
                )}
                {isTabletorMobile?(
                    <Button onClick={() => setSidebar(!sidebar)} className={classes.icon}>
                        <Typography variant="body1" className={classes.headerText}>
                            Run your Code
                        </Typography>
                    </Button>
                ):(
                    <Fade right>
                        <IconButton onClick={() => setSidebar(!sidebar)} className={classes.icon}>
                            {isTabletorMobile?'Run your Code':(sidebar?<CloseIcon/>:<PlayArrowRoundedIcon/>)}
                        </IconButton>
                    </Fade>
                )}
            </Header>
            <div className={classes.toolbar}/>
            <Ide value={code} onChange={setCode} isLight={light} language={modes[index]} />
            <IdeDrawer sidebar={sidebar} toggleSidebar={toggleSidebar} language={format[index]} code={code}/>
            <AddIcon elements={elements}/>
        </div>
    )
}

export default IDE;
