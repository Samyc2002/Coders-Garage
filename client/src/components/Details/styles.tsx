import { createStyles, makeStyles, Theme } from "@material-ui/core";

export const useStyles = makeStyles((theme: Theme) => createStyles({
    paper: {
        width: '60%',
        padding: theme.spacing(3),
        marginright: theme.spacing(3)
    },
    heading: {
        fontFamily: "'Poppins', sans-serif"
    },
    answerCall: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
}));