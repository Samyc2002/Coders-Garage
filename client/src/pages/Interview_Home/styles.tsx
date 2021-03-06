import { createStyles, makeStyles, Theme } from "@material-ui/core";

export const useStyles = (isTabletorMobile: boolean, isMobile: boolean) => makeStyles((theme: Theme) => {

    const margin = isTabletorMobile?(isMobile?30:50):100;

    return (
        createStyles({
            toolbar: theme.mixins.toolbar,
            text: {
                color: theme.palette.primary.dark,
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
                marginLeft: '0'
            },
            headerDiv: {
                display: 'flex',
                flexDirection: isTabletorMobile?'column':'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexGrow: 0.01
            }
        })
    )
});