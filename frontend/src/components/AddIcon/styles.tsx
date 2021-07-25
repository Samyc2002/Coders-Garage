import { createStyles, makeStyles, Theme } from "@material-ui/core";

export const useStyles = makeStyles((theme: Theme) => createStyles({
    speedDial: {
        position: 'absolute',
        '&.MuiSpeedDial-directionUp': {
            bottom: theme.spacing(10),
            right: theme.spacing(10),
        },
        '&.MuiSpeedDial-directionUp .MuiFab-root': {
            width: '65px',
            height: '65px'
        }
    }
}));