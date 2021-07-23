import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, useMediaQuery } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

import Logo from '../Logo';
import { useStyles } from './styles';

interface Iprops{
    children: React.ReactNode
}

const Header = ({ children }: Iprops) => {

    const history = useHistory();
    
    const [dashboard, setDashboard] = useState(false);
    
    useEffect(() => {
        if(history.location.pathname === '/') {
            setDashboard(true);
        }
        else {
            setDashboard(false);
        }
    }, [history.location.pathname])
    
    const classes = useStyles(dashboard)();

    const isTabletorMobile = useMediaQuery('(max-width: 600px)');

    return (
        <div className={classes.root}>
            <AppBar position="fixed" className={classes.appbar}>
                <Toolbar variant={isTabletorMobile?'regular':'dense'} className={classes.toolbar}>
                    <a href="/" className={classes.a}>
                        <Logo/>
                    </a>
                    <div>
                        { children }
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default Header;
