import React, { useState } from 'react';
import clsx from 'clsx';
import { FormControl, IconButton, InputLabel, MenuItem, Select, useMediaQuery } from '@material-ui/core';
import { Brightness7Rounded as Brightness7RoundedIcon, Brightness4Rounded as Brightness4RoundedIcon, RotateLeftRounded as RotateLeftRoundedIcon, PlayArrowRounded as PlayArrowRoundedIcon, Close as CloseIcon } from '@material-ui/icons';

import 'codemirror/mode/clike/clike';
import 'codemirror/mode/python/python';
import 'codemirror/mode/ruby/ruby';
import 'codemirror/mode/swift/swift';

import { useStyles } from './styles';
import Ide from '../../components/IDE';
import Header from '../../components/Header';
import useLocalStorage from '../../Hooks/useLocalStore';
import IdeDrawer from '../../components/General_IDE_Drawer';
import './styles.css';

const IDE = () => {

    const isTabletorMobile = useMediaQuery('(max-width: 1279px)')

    const classes = useStyles(isTabletorMobile)();

    const [code, setCode] = useLocalStorage('code', '');
    const [light, setLight] = useState(false);
    const [sidebar, setSidebar] = useState(false);
    const [index, setIndex] = useState(-1);

    const toggleSidebar = () => {
        setSidebar(!sidebar);
    }

    const resetCode = () => {
        setCode('');
    }

    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setIndex(event.target.value as number);
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

    return (
        <div>
            <Header>
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
                <IconButton onClick={resetCode} className={classes.icon}>
                    <RotateLeftRoundedIcon/>
                </IconButton>
                <IconButton onClick={() => setLight(!light)} className={classes.icon}>
                    {light?<Brightness7RoundedIcon/>:<Brightness4RoundedIcon/>}
                </IconButton>
                <IconButton onClick={() => setSidebar(!sidebar)} className={classes.icon}>
                    {sidebar?<CloseIcon/>:<PlayArrowRoundedIcon/>}
                </IconButton>
            </Header>
            <div className={classes.toolbar}/>
            <Ide value={code} onChange={setCode} isLight={light} language={modes[index]} />
            <IdeDrawer sidebar={sidebar} toggleSidebar={toggleSidebar} language={format[index]}/>
        </div>
    )
}

export default IDE;
