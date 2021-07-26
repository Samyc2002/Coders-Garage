import React from 'react';
import { Paper } from '@material-ui/core';
import { Controlled as CodeMirror } from 'react-codemirror2';

import { useStyles } from './styles';
import './styles.css';

interface Iprops {
    value: any,
    onChange: any,
    language: string,
    isLight: boolean
}

const Ide = ({ value, onChange, language, isLight }: Iprops) => {

    const classes = useStyles();

    const light = "eclipse";
    const dark = "material-darker";

    return (
        <div>
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

export default Ide;