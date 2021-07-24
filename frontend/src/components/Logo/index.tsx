import React from 'react';
import { IconButton, Typography, useMediaQuery } from '@material-ui/core';
import { Menu as MenuIcon } from '@material-ui/icons';

import logo from '../../assets/images/LogoWhite.png';
import { useStyles } from './styles';

interface Iprops{
    changeState: () => void
}

const Logo = ({ changeState }: Iprops) => {

    const classes = useStyles();

    const isTabletorMobile = useMediaQuery('(max-width: 600px)')

    return (
        <div className={classes.root}>
            {isTabletorMobile && (
                <IconButton onClick={changeState}>
                    <MenuIcon className={classes.icon}/>
                </IconButton>
            )}
            {!isTabletorMobile && (<img src={logo} alt="logo" className={classes.image} />)}
            <Typography variant={isTabletorMobile?'h6':'h4'} className={classes.text}>
                CODERS GARAGE
            </Typography>
        </div>
    )
}

export default Logo;
