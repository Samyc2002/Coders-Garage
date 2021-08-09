import React from 'react';
import { Button, useMediaQuery } from '@material-ui/core';

import { useStyles } from './styles';

export const handleLogout = () => {
    localStorage.removeItem('profile');
    window.location.reload();
}

const SigninLogin = () => {

    const isTabletorMobile = useMediaQuery('(max-width: 1279px)');

    const classes = useStyles(isTabletorMobile)();

    return (
        <div>
            <Button variant="text" size="large" className={classes.button} onClick={handleLogout}>
                Logout
            </Button>
        </div>
    )
}

export default SigninLogin;
