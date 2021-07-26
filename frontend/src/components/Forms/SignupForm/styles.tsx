import { createStyles, makeStyles, Theme } from "@material-ui/core";

export const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {
        width: '60%',
        padding: '40px'
    },
    title: {
        fontFamily: "'Poppins', sans-serif",
        fontWeight: 600,
        textAlign: 'center'
    },
    image: {
        maxWidth: theme.spacing(2)
    },
    button: {
        fontFamily: "'Poppins', sans-serif",
        fontWeight: 500
    },
    hidden: {
        display: 'none'
    }
}));