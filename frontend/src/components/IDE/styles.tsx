import { createStyles, makeStyles, Theme } from "@material-ui/core";

export const useStyles = (isTabletorMobile: boolean) => makeStyles((theme: Theme) => createStyles({
    root: {
        width: isTabletorMobile?'90vw':'100vw',
        borderRadius: '10px',
        overflow: 'hidden',
        marginBottom: '5vh',
        margin: '50px',
        marginLeft: isTabletorMobile?'15px':'50px',
        marginRight: isTabletorMobile?'15px':'50px'
    },
    container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    }
}));