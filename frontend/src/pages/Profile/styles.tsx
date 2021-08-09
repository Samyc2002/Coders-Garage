import { alpha, createStyles, makeStyles, Theme } from "@material-ui/core";

export const useStyles = (isTabletorMobile: boolean) => makeStyles((theme: Theme) => createStyles({
    toolbar: theme.mixins.toolbar,
    root: {
        margin: theme.spacing(5),
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        [theme.breakpoints.down('sm')]: {
            margin: theme.spacing(3),
            marginTop: theme.spacing(5),
        }
    },
    container: {
        width: `calc(100% - ${theme.spacing(3)}px)`
    },
    headerTabs: {
        display: 'flex',
        flexDirection: isTabletorMobile?'row':'column',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer',
        '&:hover': {
            backgroundColor: isTabletorMobile?alpha(theme.palette.primary.light, 0.25):alpha(theme.palette.common.white, 0.25),
        },
        flexGrow: 1,
        padding: theme.spacing(1),
        margin: theme.spacing(1),
        borderRadius: '5%'
    },
    headerText: {
        color: isTabletorMobile?theme.palette.common.black:theme.palette.common.white,
        fontFamily: "'Poppins', sans-serif",
        fontWeight: 500
    },
    headerBorder: {
        height: isTabletorMobile?'40%':'3px',
        width: isTabletorMobile?'3px':'40%',
        borderRadius: '100px    ',
        backgroundColor: isTabletorMobile?theme.palette.primary.dark:theme.palette.common.white
    },
    headerActive: {
        color: isTabletorMobile?theme.palette.primary.dark:theme.palette.primary.light,
        fontFamily: "'Poppins', sans-serif",
        fontWeight: 500
    },
    sticky: {
        position: 'fixed'
    },
    vessel: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%'
    },
    hidden: {
        display: 'none'
    },
    center: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    }
}));