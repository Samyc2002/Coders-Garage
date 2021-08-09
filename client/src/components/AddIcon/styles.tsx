import { createStyles, makeStyles, Theme } from "@material-ui/core";

export const useStyles = (isTabletorMobile: boolean) => makeStyles((theme: Theme) => createStyles({
    speedDial: {
        position: 'absolute',
        '&.MuiSpeedDial-directionUp': {
            bottom: theme.spacing(isTabletorMobile?5:10),
            right: theme.spacing(isTabletorMobile?5:10),
        },
        '&.MuiSpeedDial-directionUp .MuiFab-root': {
            width: '65px',
            height: '65px'
        }
    }
}));