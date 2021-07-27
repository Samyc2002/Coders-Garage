import { createStyles, makeStyles, Theme } from "@material-ui/core";

export const useStyles = makeStyles((theme: Theme) => createStyles({
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    root: {
        width: '40%',
        padding: '40px',
        margin: theme.spacing(10),
        [theme.breakpoints.down('md')]: {
            width: '60%'
        },
        [theme.breakpoints.down('sm')]: {
            margin: theme.spacing(2),
            marginTop: theme.spacing(6),
            width: '80%'
        }
    },
    title: {
        fontFamily: "'Poppins', sans-serif",
        fontWeight: 600,
        textAlign: 'center'
    },
    text:{
        textAlign: 'center',
        fontFamily: "'Poppins', sans-serif",
        fontWeight: 500
    }
}));