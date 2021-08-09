import React, { useContext } from 'react';
import { Paper, useMediaQuery } from '@material-ui/core';
import { Controlled as CodeMirror } from 'react-codemirror2';

import { SocketContext } from '../../config/SocketContext';
import { useStyles } from './styles';
import './styles.css';

import 'codemirror/mode/clike/clike';
import 'codemirror/mode/python/python';
import 'codemirror/mode/ruby/ruby';
import 'codemirror/mode/swift/swift';
import 'codemirror/addon/edit/matchbrackets';
import 'codemirror/addon/edit/matchtags';
import 'codemirror/addon/edit/closebrackets';
import 'codemirror/addon/edit/closetag';
import 'codemirror/addon/comment/comment';
import 'codemirror/addon/fold/foldcode';
import 'codemirror/addon/fold/foldgutter';
import 'codemirror/addon/fold/brace-fold';
import 'codemirror/addon/fold/comment-fold';
import 'codemirror/addon/fold/indent-fold';
import 'codemirror/addon/selection/active-line';

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
                        autofocus: true,
                        lineWrapping: true,
                        mode: language,
                        theme: isLight?light:dark,
                        lineNumbers: true,
                        extraKeys: {
                            'Cmd-/' : 'toggleComment',
                            'Ctrl-/' : 'toggleComment'
                        },
                        autocorrect: true,
                        matchBrackets: true,
                        autoCloseBrackets: true,
                        matchTags: true,
                        autoCloseTags: true,
                        foldGutter: true,
                        gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
                        styleActiveLine: true
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
                        autofocus: true,
                        lineWrapping: true,
                        mode: language,
                        theme: isLight?light:dark,
                        lineNumbers: true,
                        extraKeys: {
                            'Cmd-/' : 'toggleComment',
                            'Ctrl-/' : 'toggleComment'
                        },
                        autocorrect: true,
                        matchBrackets: true,
                        autoCloseBrackets: true,
                        matchTags: true,
                        autoCloseTags: true,
                        foldGutter: true,
                        gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
                        styleActiveLine: true
                    }}
                    autoCursor
                    autoScroll
                />
            </Paper>
        </div>
    )
}

export default Ide;