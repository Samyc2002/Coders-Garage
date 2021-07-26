import { createStyles, makeStyles, Theme } from "@material-ui/core";

export const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {
        borderRadius: '10px',
        overflow: 'hidden',
        marginBottom: '5vh',
        margin: '50px'
    }
}));