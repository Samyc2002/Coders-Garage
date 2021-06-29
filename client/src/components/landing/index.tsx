import { Grid, Typography, useMediaQuery } from '@material-ui/core';
import React from 'react';
import { Parallax } from 'react-parallax';
import Fade from 'react-reveal/Fade';
import Rotate from 'react-reveal/Rotate';
import Slide from 'react-reveal/Slide';

import Logo from '../../assets/LogoWhite.png';
import hr from '../../assets/hr.png';

const Background = 'https://images.unsplash.com/photo-1489875347897-49f64b51c1f8?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80';

const Landing = () => {

    const isTabletorMobile = useMediaQuery('(max-width: 600px)');

    return (
        <div>
            <Parallax bgImage={Background} strength={500}>
                <div style={{ minHeight: '100vh' }}>
                    <div style={{ ...insideStyles }}>
                        <Slide left>
                            <img src={hr} alt="hr" style={{ maxWidth: isTabletorMobile?'200px':'400px', maxHeight: '3px', marginBottom: '20px' }}/>
                        </Slide>
                        <br/>
                        <Fade>
                            <Rotate>
                                <img src={Logo} alt="Logo" style={{ maxWidth: isTabletorMobile?'50px':'100px' }}/>
                            </Rotate>
                            <Slide top>
                                <Typography variant="h5" style={{ fontFamily: "'Quicksand', sans-serif", fontWeight: 'bolder', color: 'white' }}>WELCOME TO</Typography>
                            </Slide>
                            <Grid container justify="center" spacing={1}>
                                <Grid item>
                                    <Slide bottom>
                                    <Typography variant="h4" style={{ fontFamily: "'Josefin Sans', sans-serif", fontWeight: 'bolder', color: 'white' }}>CODERS</Typography>
                                    </Slide>
                                </Grid>
                                <Grid item>
                                    <Slide bottom>
                                        <Typography variant="h4" style={{ fontFamily: "'Josefin Sans', sans-serif", fontWeight: 'bolder', color: 'white' }}>GARAGE</Typography>
                                    </Slide>
                                </Grid>
                            </Grid>
                        </Fade>
                        <Slide right>
                            <img src={hr} alt="hr" style={{ maxWidth: isTabletorMobile?'200px':'400px', maxHeight: '3px', marginTop: '10px' }}/>
                        </Slide>
                    </div>
                </div>
            </Parallax>
        </div>
    )
}

const insideStyles: React.CSSProperties = {
    background: "transparent",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  };

export default Landing;
