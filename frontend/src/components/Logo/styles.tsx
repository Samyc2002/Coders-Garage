import { createStyles, makeStyles, Theme } from "@material-ui/core";

export const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '10px'
    },
    image: {
        maxWidth: theme.spacing(5)
    },
    text: {
        fontFamily: "'Zen Tokyo Zoo', cursive",
        marginLeft: theme.spacing(2),
        marginTop: '4px'
    }
}));