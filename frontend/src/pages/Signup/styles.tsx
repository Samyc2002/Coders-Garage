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
            }
        })
    )
});