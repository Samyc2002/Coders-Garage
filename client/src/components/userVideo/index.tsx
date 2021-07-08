import React, { useRef, useEffect, useContext } from 'react';
import { useSpring, animated, to } from '@react-spring/web';
import { useDrag, useHover, usePinch } from 'react-use-gesture';
import { makeStyles, createStyles, Theme } from '@material-ui/core';

import { SocketContext } from '../../config/SocketContext';

import './styles.css';

const useStyles = makeStyles((theme: Theme) => createStyles({
    video: {
        width: '550px',
        zIndex: 10000,
        [theme.breakpoints.down('xs')]: {
            width: '300px',
        },
        marginBottom: '-15px'
    },
}));

const UserVideo = () => {

    const classes = useStyles();

    useEffect(() => {
        const preventDefault = (e: Event) => e.preventDefault()
        document.addEventListener('gesturestart', preventDefault)
        document.addEventListener('gesturechange', preventDefault)
    
        return () => {
          document.removeEventListener('gesturestart', preventDefault)
          document.removeEventListener('gesturechange', preventDefault)
        }

    }, []);

    const domTarget = useRef(null);

    const [{ x, y, rotateX, rotateY, rotateZ, zoom, scale }, api] = useSpring(() => ({
            rotateX: 0,
            rotateY: 0,
            rotateZ: 0,
            scale: 0.75,
            zoom: 0,
            x: 0,
            y: 0,
            config: { mass: 10, tension: 350, friction: 80 }
        })
    );

    useDrag(
        ({ active, offset: [x, y] }) => {
            api({ x, y, rotateX: 0, rotateY: 0, scale: active ? 0.75 : 0.85 });
        },
        { domTarget, eventOptions: { passive: false } }
    );

    usePinch(
        ({ offset: [d, a] }) => {
            api({ zoom: d / 200, rotateZ: a })
        },
        { domTarget, eventOptions: { passive: false } }
    );

    useHover(
        ({ hovering }) => {
            !hovering && api({ rotateX: 0, rotateY: 0, scale: 0.75 });
        },
        { domTarget, eventOptions: { passive: false } }
    );

    const { userVideo }: any = useContext(SocketContext);

    return (
        <div className="container">
            <animated.div
                ref={domTarget}
                className="card"
                style={{
                    transform: 'perspective(600px)',
                    x,
                    y,
                    scale: to([scale, zoom], (s, z) => s + z),
                    rotateX,
                    rotateY,
                    rotateZ,
                }}>
                    <div className={classes.video}>
                        <video ref={userVideo} autoPlay/>
                    </div>
            </animated.div>
        </div>
    )
}

export default UserVideo;
