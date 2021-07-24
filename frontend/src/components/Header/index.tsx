import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, useMediaQuery, SwipeableDrawer } from '@material-ui/core';
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

    const [open, setOpen] = useState(false);

    const toggleOpen = () => {
        setOpen(!open);
    }

    return (
        <div className={classes.root}>
            <AppBar position="fixed" className={classes.appbar}>
                <Toolbar variant={isTabletorMobile?'regular':'dense'} className={classes.toolbar}>
                    <div onClick={() => history.push('/')} className={classes.a}>
                        <Logo changeState={toggleOpen}/>
                    </div>
					{!isTabletorMobile && (
						<div className={classes.children}>
							{ children }
						</div>
					)}
                </Toolbar>
            </AppBar>
            <SwipeableDrawer anchor="left" open={open} onOpen={toggleOpen} onClose={toggleOpen}>
                <div className={classes.drawer}>
					{ children }
				</div>
            </SwipeableDrawer>
        </div>
    )
}

export default Header;
