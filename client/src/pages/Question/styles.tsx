import { createStyles, makeStyles, Theme } from "@material-ui/core";

export const useStyles = (isTabletorMobile: boolean) => makeStyles((theme: Theme) => createStyles({
    icon: {
        color: isTabletorMobile?theme.palette.primary.dark:theme.palette.common.white
    },
    toolbar: theme.mixins.toolbar,
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
        color: theme.palette.common.white
    },
    container: {
        padding: theme.spacing(2),
        marginLeft: '0px'
    },
    heading: {
        fontFamily: "'Poppins', sans-serif",
        fontWeight: 'bold',
        color: theme.palette.primary.dark
    },
    text: {
        fontFamily: "'Poppins', sans-serif",
        color: theme.palette.common.black
    },
    copy: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    info: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    problem: {
        marginLeft: theme.spacing(2)
    },
    headerText: {
        fontFamily: "'Poppins', sans-serif",
        textTransform: 'capitalize'
    }
}));