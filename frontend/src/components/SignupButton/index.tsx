import React from 'react';
import { Button, useMediaQuery } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

import { useStyles } from './styles';

const Signup = () => {

    const isTabletorMobile = useMediaQuery('(max-width: 600px)');

    const classes = useStyles(isTabletorMobile)();

    const history = useHistory();

    return (
        <div>
            <Button variant={isTabletorMobile?'text':'contained'} size="large" className={classes.button} onClick={() => history.push('/signup')}>
                Signup
            </Button>
        </div>
    )
}

export default Signup;
