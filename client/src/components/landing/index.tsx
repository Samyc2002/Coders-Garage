import { useMediaQuery } from '@material-ui/core';
import React from 'react';
import { Parallax } from 'react-parallax';
import Fade from 'react-reveal/Fade';
import Pulse from 'react-reveal/Pulse';

import Logo from '../../assets/LogoWhite.png';

const Background = 'https://images.unsplash.com/photo-1489875347897-49f64b51c1f8?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80';

const Landing = () => {

    const isTabletorMobile = useMediaQuery('(max-width: 600px)');

    return (
        <div>
            <Parallax bgImage={Background} strength={500}>
                <div style={{ minHeight: '100vh' }}>
                    <div style={{ ...insideStyles }}>
                        <Pulse>
                            <Fade>
                                <img src={Logo} alt="Logo" style={{ maxWidth: isTabletorMobile?'300px':'600px' }}/>
                            </Fade>
                        </Pulse>
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
    transform: "translate(-50%,-50%)"
  };

export default Landing;
