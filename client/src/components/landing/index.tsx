import React from 'react';
import { Parallax } from 'react-parallax';
import Fade from 'react-reveal/Fade';
import Wobble from 'react-reveal/Wobble';

import Logo from '../../assets/Logo';

const Background = 'https://images.unsplash.com/photo-1489875347897-49f64b51c1f8?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80';

const Landing = () => {
    return (
        <div>
            <Parallax bgImage={Background} strength={500}>
                <div style={{ height: '100vh' }}>
                    <div style={insideStyles}>
                        <Wobble>
                            <Fade>
                                <Logo col="#ffffff"/>
                            </Fade>
                        </Wobble>
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
    transform: "translate(-50%,-50%) scale(3, 3)"
  };

export default Landing;
