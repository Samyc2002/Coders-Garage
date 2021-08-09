import React from 'react';
import { useHistory } from 'react-router-dom';
import { IconButton, Typography, useMediaQuery } from '@material-ui/core';
import { Menu as MenuIcon } from '@material-ui/icons';

import logo from '../../assets/images/LogoWhite.png';
import { useStyles } from './styles';

interface Iprops{
    changeState: () => void,
    state: boolean
}

const Logo = ({ changeState, state }: Iprops) => {

    const history = useHistory();
    
    const classes = useStyles(state)();

    const isTabletorMobile = useMediaQuery('(max-width: 1279px)')

    return (
        <div className={classes.root}>
            {isTabletorMobile && (
                <IconButton onClick={changeState}>
                    <MenuIcon className={classes.icon}/>
                </IconButton>
            )}
            <div onClick={() => history.push('/')} className={classes.aDiv}>
                {!isTabletorMobile && (<img src={logo} alt="logo" className={classes.image} />)}
                <Typography variant={isTabletorMobile?'h6':'h4'} className={classes.text}>
                    CODERS GARAGE
                </Typography>
            </div>
        </div>
    )
}

export default Logo;
