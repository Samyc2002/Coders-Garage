import { createStyles, makeStyles, Theme } from "@material-ui/core";

export const useStyles = makeStyles((theme: Theme) => createStyles({
    table: {
        minWidth: 650,
    },
    typography: {
        fontFamily: "'Poppins', sans-serif",
        fontWeight: 500,
        textAlign: 'center'
    },
    paper: {
        width: '80%',
        padding: theme.spacing(3)
    }
}));