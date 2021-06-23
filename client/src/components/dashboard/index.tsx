import React from 'react';
import { Grid, Typography } from '@material-ui/core';

import Home from '../../assets/Home.png';
import IDE from '../../assets/IDE.png';
import Interview from '../../assets/Interview.png';

const index = () => {
    return (
        <div>
            <Grid container direction="row" justify="space-around" alignItems="center" style={{ paddingBottom: '30px' }}>
                <Grid item xs={12} sm={6} style={{ padding: '30px', paddingTop: '100px', paddingBottom: '100px' }}>
                    <Typography variant="h5" style={{ fontFamily: "'Josefin Sans', sans-serif", fontWeight: 'bolder' }}>
                        A Home Page where you can find literally everything
                    </Typography>
                    <Typography variant="subtitle2" style={{ fontFamily: "'Quicksand', sans-serif", fontWeight: 'bolder' }}>
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eum amet quas dolore, nostrum dolores delectus soluta laboriosam! Sunt corporis dolorum quasi aspernatur praesentium. Doloremque aliquam nostrum sint in ipsum necessitatibus.
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={6} style={{ display: 'flex', justifyContent: 'center' }}>
                    <img src={Home} alt="Home Icon" style={{ maxWidth: '300px' }}/>
                </Grid>
                <Grid item xs={12} sm={6} style={{ display: 'flex', justifyContent: 'center' }}>
                    <img src={IDE} alt="Home Icon" style={{ maxWidth: '300px' }}/>
                </Grid>
                <Grid item xs={12} sm={6} style={{ padding: '30px', paddingTop: '100px', paddingBottom: '100px' }}>
                    <Typography variant="h5" style={{ fontFamily: "'Josefin Sans', sans-serif", fontWeight: 'bolder' }}>
                        An IDE where you can code your day off
                    </Typography>
                    <Typography variant="subtitle2" style={{ fontFamily: "'Quicksand', sans-serif", fontWeight: 'bolder' }}>
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eum amet quas dolore, nostrum dolores delectus soluta laboriosam! Sunt corporis dolorum quasi aspernatur praesentium. Doloremque aliquam nostrum sint in ipsum necessitatibus.
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={6} style={{ padding: '30px', paddingTop: '100px', paddingBottom: '100px' }}>
                    <Typography variant="h5" style={{ fontFamily: "'Josefin Sans', sans-serif", fontWeight: 'bolder' }}>
                        A place where you can practice for interview
                    </Typography>
                    <Typography variant="subtitle2" style={{ fontFamily: "'Quicksand', sans-serif", fontWeight: 'bolder' }}>
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eum amet quas dolore, nostrum dolores delectus soluta laboriosam! Sunt corporis dolorum quasi aspernatur praesentium. Doloremque aliquam nostrum sint in ipsum necessitatibus.
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={6} style={{ display: 'flex', justifyContent: 'center' }}>
                    <img src={Interview} alt="Home Icon" style={{ maxWidth: '300px' }}/>
                </Grid>
            </Grid>
        </div>
    )
}

export default index;
