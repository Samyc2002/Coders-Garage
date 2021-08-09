import { createStyles, makeStyles, Theme } from "@material-ui/core";

export const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {
        marginBottom: theme.spacing(5)
    },
    avatar: {
        color: theme.palette.common.white,
        backgroundColor: theme.palette.primary.dark,
        width: theme.spacing(50),
        height: theme.spacing(50),
        [theme.breakpoints.down('md')]: {
            width: theme.spacing(30),
            height: theme.spacing(30),
        }
    },
    heading: {
        fontFamily: "'Poppins', sans-serif",
        fontWeight: 600
    },
    paper: {
        width: '100%',
        padding: theme.spacing(3),
        [theme.breakpoints.down('sm')]: {
            width: '90%'
        }
    },
    main: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
}));