import React from 'react';
import { Grid, List, ListItem, makeStyles, Typography } from '@material-ui/core';
import { Copyright } from '@material-ui/icons';

import './styles.css';

const useStyles = makeStyles((theme) => ({
    icon: {
      marginRight: theme.spacing(2),
    },
    heroContent: {
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(8, 0, 6),
    },
    heroButtons: {
      marginTop: theme.spacing(4),
    },
    cardGrid: {
      paddingTop: theme.spacing(8),
      paddingBottom: theme.spacing(8),
    },
    card: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
    },
    cardMedia: {
      paddingTop: '56.25%', // 16:9
    },
    cardContent: {
      flexGrow: 1,
    },
    footer: {
      backgroundColor: '#3f51b5',
      padding: theme.spacing(6),
      paddingLeft: '10.5vw',
    //   paddingBottom: '30px',
    },
}));

const Footer = () => {

    const classes = useStyles();
    
    return (
        <footer className={classes.footer}>
            <Grid container justify="center" spacing={3}>
                <Grid item xs={12} sm={6} justify="flex-start">
                    <Typography variant="h5" align="left" style={{ color: '#ffffff', fontFamily: "'Quicksand', sans-serif", fontWeight: 'bolder' }}>
                        QUICK LINKS
                    </Typography>
                    <List>
                        <ListItem className="li" disableGutters>
                            <a href="/" style={{ textDecoration: 'none' }}>
                                <Typography variant="subtitle1" style={{ color: '#ffffff',fontFamily: "'Quicksand', sans-serif" }}>Main Page</Typography>
                            </a>
                        </ListItem>
                        <ListItem className="li" disableGutters>
                            <a href="https://drive.google.com/file/d/1N5pfnjgjo8eoB571Ia0KvBgDLbKP0SPG/view?usp=sharing" style={{ textDecoration: 'none' }}>
                                <Typography variant="subtitle1" style={{ color: '#ffffff',fontFamily: "'Quicksand', sans-serif" }}>Problem Statement</Typography>
                            </a>
                        </ListItem>
                        <ListItem className="li" disableGutters>
                            <a href="https://github.com/Samyc2002/Coders-Garage" style={{ textDecoration: 'none' }}>
                                <Typography variant="subtitle1" style={{ color: '#ffffff',fontFamily: "'Quicksand', sans-serif" }}>Source Code</Typography>
                            </a>
                        </ListItem>
                    </List>
                </Grid>
                <Grid item xs={12} sm={6} justify="flex-start">
                    <Typography variant="h5" align="left" style={{ color: '#ffffff', fontFamily: "'Quicksand', sans-serif", fontWeight: 'bolder' }}>
                        CONTACT US
                    </Typography>
                    <List>
                        <ListItem className="li" disableGutters>
                            <a href="mailto:coders.garage.soi@gmail.com" style={{ textDecoration: 'none' }}>
                                <Typography variant="subtitle1" style={{ color: '#ffffff',fontFamily: "'Quicksand', sans-serif" }}>
                                    Email Us at <span style={{ fontWeight: 'bolder' }}>coders.garage.soi@gmail.com</span>
                                </Typography>
                            </a>
                        </ListItem>
                        <ListItem className="li" disableGutters>
                            <a href="tel:+919674950307" style={{ textDecoration: 'none' }}>
                                <Typography variant="subtitle1" style={{ color: '#ffffff',fontFamily: "'Quicksand', sans-serif" }}>
                                    Call Us at <span>+919674950307</span>
                                </Typography>
                            </a>
                        </ListItem>
                        <ListItem className="li" disableGutters>
                            <a href="https://goo.gl/maps/Dx94JeBTsarQ1UpGA" style={{ textDecoration: 'none' }}>
                                <Typography variant="subtitle1" style={{ color: '#ffffff',fontFamily: "'Quicksand', sans-serif" }}>
                                    Visit Us at <span style={{ fontWeight: 'bolder' }}>WALMI Campus, PB Road, near High Court, Karnataka 580011</span>
                                </Typography>
                            </a>
                        </ListItem>
                    </List>
                </Grid>
            </Grid>
        </footer>
    )
}

export default Footer;
