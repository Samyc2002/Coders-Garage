import { createStyles, makeStyles, Theme } from "@material-ui/core";

export const useStyles = makeStyles((theme: Theme) => createStyles({
    typography: {
        fontFamily: "'Poppins', sans-serif",
        fontWeight: 500,
        textAlign: 'center'
    },
    paper: {
        width: '80%',
        padding: theme.spacing(3),
        marginBottom: theme.spacing(3)
    }
}));