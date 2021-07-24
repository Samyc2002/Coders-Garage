import React from 'react';
import { Button, useMediaQuery } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

import { useStyles } from './styles';

const SigninLogin = () => {

    const isTabletorMobile = useMediaQuery('(max-width: 600px)');

    const classes = useStyles(isTabletorMobile)();

    const history = useHistory();

    return (
        <div>
            <Button variant="text" size="large" className={classes.button} onClick={() => history.push('/signin')}>
                Signin/Login
            </Button>
        </div>
    )
}

export default SigninLogin;
