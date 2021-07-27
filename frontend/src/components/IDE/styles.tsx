import { createStyles, makeStyles, Theme } from "@material-ui/core";

export const useStyles = (isTabletorMobile: boolean) => makeStyles((theme: Theme) => createStyles({
    root: {
        borderRadius: '10px',
        overflow: 'hidden',
        marginBottom: '5vh',
        margin: '50px',
        marginLeft: isTabletorMobile?'10px':'50px',
        marginRight: isTabletorMobile?'10px':'50px'
    }
}));