import { createStyles, makeStyles, Theme } from "@material-ui/core";

export const useStyles = (fullWidth: boolean) => makeStyles((theme: Theme) => createStyles({
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
    heading: {
      color: theme.palette.primary.dark,
      fontFamily: "'Poppins', sans-serif",
      fontWeight: 600,
      textAlign: 'center'
    },
    content: {
      paddingBottom: '16px'
    },
    actions: {
      width: fullWidth?'80%':'50%',
      marginBottom: fullWidth?'0px':'16px'
    }
  }));