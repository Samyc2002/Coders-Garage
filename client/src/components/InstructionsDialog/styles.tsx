import { createStyles, makeStyles, Theme } from "@material-ui/core";

export const useStyles = makeStyles((theme: Theme) => createStyles({
    heading: {
        fontFamily: "'Poppins', sans-serif",
        fontWeight: 600,
        textAlign: 'center'
    },
    text: {
        fontFamily: "'Poppins', sans-serif",
        fontWeight: 600
    }
}));