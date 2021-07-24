import { createStyles, makeStyles, Theme } from "@material-ui/core";

export const useStyles = (isTabletorMobile: boolean) => makeStyles((theme: Theme) => createStyles({
    button: {
        borderRadius: isTabletorMobile?'0':'100px',
        fontFamily: "'Poppins', sans-serif",
        color: isTabletorMobile?theme.palette.primary.dark:theme.palette.common.white,
        width: '100%'
    }
}));