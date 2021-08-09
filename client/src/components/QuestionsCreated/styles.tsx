import { createStyles, makeStyles, Theme } from "@material-ui/core";

export const useStyles = makeStyles((theme: Theme) => createStyles({
    typography: {
        fontFamily: "'Poppins', sans-serif",
        fontWeight: 500,
        textAlign: 'center'
    },
    paper: {
        width: '100%',
        padding: theme.spacing(3),
        marginBottom: theme.spacing(3),
        [theme.breakpoints.down('md')]: {
            width: '100%'
        },
        [theme.breakpoints.down('sm')]: {
            width: '80%'
        }
    }
}));