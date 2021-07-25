import { createStyles, makeStyles, Theme } from "@material-ui/core";

export const useStyles = (state: boolean) => makeStyles((theme: Theme) => createStyles({
    root: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '10px'
    },
    image: {
        maxWidth: theme.spacing(6)
    },
    text: {
        fontFamily: "'Zen Tokyo Zoo', cursive",
        marginLeft: theme.spacing(2),
        marginTop: '4px',
        color: state?theme.palette.primary.dark:theme.palette.common.white
    },
    icon: {
        color: state?theme.palette.common.black:theme.palette.common.white
    },
    aDiv: {
		cursor: 'pointer',
        display: 'flex'
    },
}));