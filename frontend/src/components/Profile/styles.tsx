import { createStyles, makeStyles, Theme } from "@material-ui/core";

export const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {
        margin: theme.spacing(5)
    },
    avatar: {
        color: theme.palette.common.white,
        backgroundColor: theme.palette.primary.dark,
        width: theme.spacing(50),
        height: theme.spacing(50)
    },
    heading: {
        fontFamily: "'Poppins', sans-serif",
        fontWeight: 600
    },
    paper: {
        width: '100%',
        padding: theme.spacing(3),
    }
}));