import React, { useContext } from 'react';
import { Controlled as CodeMirror } from 'react-codemirror2';
import { Paper } from '@material-ui/core';

import { SocketContext } from '../../config/SocketContext';
import './styles.css';

interface Iprops {
    value: any,
    onChange: any,
    language: string,
    theme: string
}

const Ide = ({ value, onChange, language, theme }: Iprops) => {

    const { sendChange }: any = useContext(SocketContext)

    return (
        <Paper elevation={5} style={{ borderRadius: '10px', overflow: 'hidden', marginBottom: '5vh' }}>
            <CodeMirror
                value={value}
                onBeforeChange={(editor, data, value) => {
                    onChange(value);
                    sendChange(value);
                }}
                options={{
                    mode: language,
                    theme: theme,
                    lineNumbers: true,
                    autocorrect: true,
                }}
                autoCursor
                autoScroll
            />
        </Paper>
    )
}

export default Ide;
