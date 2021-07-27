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
    }
}));