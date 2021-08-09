import { createStyles, makeStyles, Theme } from "@material-ui/core";

export const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {
        height: '100vh',
        width: '100vw'
    },
    text: {
        fontFamily: "'Poppins', sans-serif"
    }
}));