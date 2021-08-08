import React, { useContext } from 'react';
import { Paper, useMediaQuery } from '@material-ui/core';
import { Controlled as CodeMirror } from 'react-codemirror2';

import { SocketContext } from '../../config/SocketContext';
import { useStyles } from './styles';
import './styles.css';

interface Iprops {
    value: any,
    onChange: any,
    language: string,
    isLight: boolean,
    interviewMode?: boolean
}

const Ide = ({ value, onChange, language, isLight }: Iprops) => {

    const isTabletorMobile = useMediaQuery('(max-width: 600px)');

    const classes = useStyles(isTabletorMobile)();

    const light = "eclipse";
    const dark = "material-darker";

    return (
        <div className={classes.container}>
            <Paper elevation={5} className={classes.root}>
                <CodeMirror
                    value={value}
                    onBeforeChange={(editor, data, value) => {
                        onChange(value);
                    }}
                    options={{
                        mode: language,
                        theme: isLight?light:dark,
                        lineNumbers: true,
                        autocorrect: true,
                    }}
                    autoCursor
                    autoScroll
                />
            </Paper>
        </div>
    )
}

export const InterviewIde = ({ value, onChange, language, isLight, interviewMode }: Iprops) => {

    const { sendChange }: any = useContext(SocketContext)

    const isTabletorMobile = useMediaQuery('(max-width: 600px)');

    const classes = useStyles(isTabletorMobile)();

    const light = "eclipse";
    const dark = "material-darker";

    return (
        <div className={classes.container}>
            <Paper elevation={5} className={classes.root}>
                <CodeMirror
                    value={value}
                    onBeforeChange={(editor, data, value) => {
                        onChange(value);
                        sendChange(value);
                    }}
                    options={{
                        mode: language,
                        theme: isLight?light:dark,
                        lineNumbers: true,
                        autocorrect: true,
                    }}
                    autoCursor
                    autoScroll
                />
            </Paper>
        </div>
    )
}

export default Ide;