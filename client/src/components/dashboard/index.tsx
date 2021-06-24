import React, { useState } from 'react';
import { Grid, Typography, useMediaQuery } from '@material-ui/core';
import VisibilitySensor from 'react-visibility-sensor';
import Zoom from 'react-reveal/Zoom';
import Slide from 'react-reveal/Slide';

import Home from '../../assets/Home.png';
import IDE from '../../assets/IDE.png';
import Interview from '../../assets/Interview.png';

const Dashboard = () => {

    const isTabletorMobile = useMediaQuery('(max-width: 700px)');

    const [home, setHome] = useState(false);
    const [ide, setIde] = useState(false);
    const [interview, setInterview] = useState(false);

    return (
        <div>
            <Grid container direction="row" justify="space-around" alignItems="center" style={{ paddingBottom: '30px' }}>
                <Grid item xs={12} sm={6} style={{ padding: '30px', paddingTop: '100px', paddingBottom: '100px' }}>
                    <VisibilitySensor onChange={() => setHome(true)}>
                        <Slide left={!isTabletorMobile} top={isTabletorMobile} when={home}>
                            <div>
                                <Typography variant="h5" style={{ fontFamily: "'Josefin Sans', sans-serif", fontWeight: 'bolder' }}>
                                    A Home Page where you can find literally everything
                                </Typography>
                                <Typography variant="subtitle2" style={{ fontFamily: "'Quicksand', sans-serif", fontWeight: 'bolder' }}>
                                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eum amet quas dolore, nostrum dolores delectus soluta laboriosam! Sunt corporis dolorum quasi aspernatur praesentium. Doloremque aliquam nostrum sint in ipsum necessitatibus.
                                </Typography>
                            </div>
                        </Slide>
                    </VisibilitySensor>
                </Grid>
                <Grid item xs={12} sm={6} style={{ display: 'flex', justifyContent: 'center' }}>
                    <VisibilitySensor onChange={() => setHome(true)}>
                        <Zoom when={home}>
                                <img src={Home} alt="Home Icon" style={{ maxWidth: '300px' }}/> 
                        </Zoom>
                    </VisibilitySensor>
                </Grid>
                {isTabletorMobile?(
                    <Grid container direction="row" justify="space-around" alignItems="center" style={{ paddingBottom: '30px' }}>
                        <Grid item xs={12} sm={6} style={{ padding: '30px', paddingTop: '100px', paddingBottom: '100px' }}>
                            <VisibilitySensor onChange={() => setIde(true)}>
                                <Slide top when={ide}>
                                    <div>
                                        <Typography variant="h5" style={{ fontFamily: "'Josefin Sans', sans-serif", fontWeight: 'bolder' }}>
                                            An IDE where you can code your day off
                                        </Typography>
                                        <Typography variant="subtitle2" style={{ fontFamily: "'Quicksand', sans-serif", fontWeight: 'bolder' }}>
                                            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eum amet quas dolore, nostrum dolores delectus soluta laboriosam! Sunt corporis dolorum quasi aspernatur praesentium. Doloremque aliquam nostrum sint in ipsum necessitatibus.
                                        </Typography>
                                    </div>
                                </Slide>
                            </VisibilitySensor>
                        </Grid>
                        <Grid item xs={12} sm={6} style={{ display: 'flex', justifyContent: 'center' }}>
                            <VisibilitySensor onChange={() => setIde(true)}>
                                <Zoom when={ide}>
                                        <img src={IDE} alt="IDE Icon" style={{ maxWidth: '300px' }}/> 
                                </Zoom>
                            </VisibilitySensor>
                        </Grid>
                    </Grid>
                ):(
                    <Grid container direction="row" justify="space-around" alignItems="center" style={{ paddingBottom: '30px' }}>
                        <Grid item xs={12} sm={6} style={{ display: 'flex', justifyContent: 'center' }}>
                            <VisibilitySensor onChange={() => setIde(true)}>
                                <Zoom when={ide}>
                                        <img src={IDE} alt="IDE Icon" style={{ maxWidth: '300px' }}/> 
                                </Zoom>
                            </VisibilitySensor>
                        </Grid>
                        <Grid item xs={12} sm={6} style={{ padding: '30px', paddingTop: '100px', paddingBottom: '100px' }}>
                            <VisibilitySensor onChange={() => setIde(true)}>
                                <Slide right when={ide}>
                                    <div>
                                        <Typography variant="h5" style={{ fontFamily: "'Josefin Sans', sans-serif", fontWeight: 'bolder' }}>
                                            An IDE where you can code your day off
                                        </Typography>
                                        <Typography variant="subtitle2" style={{ fontFamily: "'Quicksand', sans-serif", fontWeight: 'bolder' }}>
                                            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eum amet quas dolore, nostrum dolores delectus soluta laboriosam! Sunt corporis dolorum quasi aspernatur praesentium. Doloremque aliquam nostrum sint in ipsum necessitatibus.
                                        </Typography>
                                    </div>
                                </Slide>
                            </VisibilitySensor>
                        </Grid>
                    </Grid>
                )}
                <Grid item xs={12} sm={6} style={{ padding: '30px', paddingTop: '100px', paddingBottom: '100px' }}>
                    <VisibilitySensor onChange={() => setInterview(true)}>
                        <Slide left={!isTabletorMobile} top={isTabletorMobile} when={interview}>
                            <div>
                                <Typography variant="h5" style={{ fontFamily: "'Josefin Sans', sans-serif", fontWeight: 'bolder' }}>
                                    A place where you can practice for interview
                                </Typography>
                                <Typography variant="subtitle2" style={{ fontFamily: "'Quicksand', sans-serif", fontWeight: 'bolder' }}>
                                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eum amet quas dolore, nostrum dolores delectus soluta laboriosam! Sunt corporis dolorum quasi aspernatur praesentium. Doloremque aliquam nostrum sint in ipsum necessitatibus.
                                </Typography>
                            </div>
                        </Slide>
                    </VisibilitySensor>
                </Grid>
                <Grid item xs={12} sm={6} style={{ display: 'flex', justifyContent: 'center' }}>
                    <VisibilitySensor onChange={() => setInterview(true)}>
                        <Zoom when={interview}>
                                <img src={Interview} alt="IDE Icon" style={{ maxWidth: '300px' }}/> 
                        </Zoom>
                    </VisibilitySensor>
                </Grid>
            </Grid>
        </div>
    )
}

export default Dashboard;
