import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import './styles.css'
import { CardActionArea, CardMedia } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

interface Content{
    image: string,
    heading: string,
    body: string | null,
    action: string,
    handleClick: any
}

const SimpleCard = ({ image, heading, body, action, handleClick }: Content) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={image}
          title={heading}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">{ heading }</Typography>
          <Typography variant="body2" color="textSecondary" component="p">{ body }</Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary" onClick={handleClick}>{ action }</Button>
      </CardActions>
    </Card>
  );
}

export default SimpleCard;