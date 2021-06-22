import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import './styles.css'

const useStyles = makeStyles({
  root: {
    maxWidth: 275,
    maxHeight: 50,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

interface Content{
    heading: string,
    body: string | null,
    action: string
}

const SimpleCard = ({ heading, body, action }: Content) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography variant="subtitle1">
          { heading }
        </Typography>
        <Typography variant="h5">
          { body }
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">{ action }</Button>
      </CardActions>
    </Card>
  );
}

export default SimpleCard;