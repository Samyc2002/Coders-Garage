import { createStyles, makeStyles, Theme } from "@material-ui/core";

export const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {
      maxWidth: 345,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    },
    media: {
      height: 180
    },
    typography: {
      fontFamily: "'Poppins', sans-serif",
      fontWeight: 600,
      textAlign: 'center'
    },
    content: {
      paddingBottom: '16px'
    },
    actions: {
      width: '50%',
      marginBottom: '16px'
    }
  }));