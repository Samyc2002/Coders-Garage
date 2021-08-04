import { createStyles, makeStyles, Theme } from "@material-ui/core";

export const useStyles = (isTabletorMobile: boolean) => makeStyles((theme: Theme) => createStyles({
    icon: {
        color: isTabletorMobile?theme.palette.primary.dark:theme.palette.common.white
    },
    toolbar: theme.mixins.toolbar,
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
        color: theme.palette.common.white
    },
    headerText: {
        fontFamily: "'Poppins', sans-serif",
        textTransform: 'capitalize'
    }
}));