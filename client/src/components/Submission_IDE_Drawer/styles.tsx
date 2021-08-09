import { createStyles, makeStyles, Theme } from "@material-ui/core";

export const useStyles = makeStyles((theme: Theme) => createStyles({
    container: {
        width: '100%',
        padding: theme.spacing(3),
        overflowX: 'hidden'
    },
    form: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    toolbar: theme.mixins.toolbar
}));