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
    listItem: {
        textAlign: 'center'
    },
    listItemSelected: {
        backgroundColor: theme.palette.primary.dark,
        color: theme.palette.common.white
    },
    button: {
        color: theme.palette.primary.dark,
        margin: '5px',
        marginBottom: '10px'
    },
    buttonText: {
        fontfamily: "'Poppins', sans-serif",
        fontWeight: 500,
    }
}));