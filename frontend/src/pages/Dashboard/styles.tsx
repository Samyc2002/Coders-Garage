import { createStyles, makeStyles, Theme } from "@material-ui/core";
import background from '../../assets/images/Background.jpg'

export const useStyles = (isTabletorMobile: boolean) => makeStyles((theme: Theme) => {

    const margin = isTabletorMobile?50:100;

    return (
        createStyles({
            root: {
                height: '100vh',
                [theme.breakpoints.up('lg')]: {
                    backgroundImage: `url(${background})`,
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover'
                }
            },
            toolbar: theme.mixins.toolbar,
            text: {
                color: isTabletorMobile?theme.palette.primary.dark:theme.palette.common.white,
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 600
            },
            container: {
                width: `calc(100% - ${margin}px)`,
                margin: `${margin}px`
            },
            cards: {
                margin: theme.spacing(3),
                width: `calc(100% - ${theme.spacing(3)}px)`,
                marginTop: theme.spacing(5),
                marginLeft: '0',
                alignItems: 'center'
            },
            card: {
                flexGrow: 1
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
            },
            headerDiv: {
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexGrow: 0.01
            }
        })
    )
});