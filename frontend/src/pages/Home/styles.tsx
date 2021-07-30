import { createStyles, makeStyles, Theme } from "@material-ui/core";

const drawerWidth = 300;

export const useStyles = makeStyles((theme: Theme) => createStyles({
    toolbar: theme.mixins.toolbar,
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    typography: {
        fontFamily: "'Poppins', sans-serif",
        fontWeight: 500,
        textAlign: 'center'
    },
    button: {
        backgroundColor: theme.palette.primary.light,
        color: theme.palette.primary.dark,
        fontFamily: "'Poppins', sans-serif",
        fontWeight: 'bolder',
        borderRadius: '10px'
    },
    cards: {
        padding: theme.spacing(2)
    }
}));