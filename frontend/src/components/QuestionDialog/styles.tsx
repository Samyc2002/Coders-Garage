import { createStyles, makeStyles, Theme } from "@material-ui/core";

export const useStyles = makeStyles((theme: Theme) => createStyles({
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
    },
    text: {
        fontfamily: "'Poppins', sans-serif",
        fontWeight: 500,
        textAlign: 'center'
    }
}));