import { createStyles, makeStyles, Theme } from "@material-ui/core";
import background from '../../assets/images/Background.jpg'

export const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {
        height: '100vh',
        width: '100vw',
        backgroundImage: `url(${background})`,
        backgroundSize: '100% 100%'
    },
    toolbar: theme.mixins.toolbar,
    text: {
        color: theme.palette.common.white,
        fontFamily: "'Poppins', sans-serif",
        fontWeight: 600,
        fontSize: theme.spacing(10)
    },
    container: {
        width: 'calc(100% - 100px)',
        margin: '100px'
    },
    cards: {
        margin: theme.spacing(3),
        width: `calc(100% - ${theme.spacing(3)}px)`,
        marginTop: theme.spacing(5),
        marginLeft: '0'
    },
    button: {
        backgroundColor: theme.palette.primary.light,
        color: theme.palette.primary.dark,
        fontFamily: "'Poppins', sans-serif",
        fontWeight: 'bolder',
        borderRadius: '10px'
    },
    typography: {
        fontFamily: "'Poppins', sans-serif",
        fontWeight: 500,
        textAlign: 'center'
    }
}));