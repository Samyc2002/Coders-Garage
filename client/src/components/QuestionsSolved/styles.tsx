import { createStyles, makeStyles, Theme } from "@material-ui/core";

export const useStyles = makeStyles((theme: Theme) => createStyles({
    table: {
        width: '100%'
    },
    typography: {
        fontFamily: "'Poppins', sans-serif",
        fontWeight: 500,
        textAlign: 'center'
    },
    paper: {
        width: '100%',
        padding: theme.spacing(3),
        [theme.breakpoints.down('sm')]: {
            width: '88%',
            padding: theme.spacing(2)
        }
    }
}));