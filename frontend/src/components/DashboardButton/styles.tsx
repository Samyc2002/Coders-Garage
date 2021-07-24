import { createStyles, makeStyles, Theme } from "@material-ui/core";

export const useStyles = (isTabletorMobile: boolean) => makeStyles((theme: Theme) => createStyles({
    button: {
        backgroundColor: theme.palette.common.white,
        borderRadius: isTabletorMobile?'0':'100px',
        fontFamily: "'Poppins', sans-serif",
        color: theme.palette.primary.dark,
        width: '100%'
    }
}));