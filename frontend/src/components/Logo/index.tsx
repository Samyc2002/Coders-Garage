import React from 'react';
import { Typography } from '@material-ui/core';

import logo from '../../assets/images/LogoWhite.png';
import { useStyles } from './styles';

const Logo = () => {

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <img src={logo} alt="logo" className={classes.image} />
            <Typography variant="h4" className={classes.text}>
                CODERS GARAGE
            </Typography>
        </div>
    )
}

export default Logo;
