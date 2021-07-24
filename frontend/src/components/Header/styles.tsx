import { createStyles, makeStyles, Theme } from "@material-ui/core";

export const useStyles = (dashboard: boolean) => makeStyles((theme: Theme) => createStyles({
    root: {
      flexGrow: 1,
    },
    appbar: {
        backgroundColor: dashboard?'transparent':theme.palette.primary.dark,
        boxShadow: dashboard?'none':'0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)'
    },
    toolbar: {
		justifyContent: 'space-between',
		alignItems: 'center'
    },
    a: {
		cursor: 'pointer'
    },
    children: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between',
		flexGrow: 0.01
	},
	drawer: {
		width: '300px'
	}
  }),
);
