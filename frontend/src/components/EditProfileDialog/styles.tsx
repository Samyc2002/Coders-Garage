import { createStyles, makeStyles, Theme } from "@material-ui/core";

export const useStyles = makeStyles((theme: Theme) => createStyles({
    button: {
        fontFamily: "'Poppins', sans-serif",
        fontWeight: 500
    },
    text: {
        fontFamily: "'Poppins', sans-serif",
        textAlign: 'center'
    },
    title: {
        fontFamily: "'Poppins', sans-serif",
        fontWeight: 600,
        textAlign: 'center'
    },
    form: {
        margin: theme.spacing(3)
    }
}));