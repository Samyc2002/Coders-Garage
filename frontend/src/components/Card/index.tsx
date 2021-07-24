import React from 'react';
import { Card, CardMedia, CardContent, CardActions, Typography } from '@material-ui/core';

import { useStyles } from './styles';

interface Iprops{
    image: string,
    heading?: string,
    body: string,
    children: React.ReactNode
}

const CardComponent = ({ image, heading, body, children}: Iprops) => {

    const classes = useStyles();

    return (
        <div>
            <Card className={classes.root} elevation={5}>
                <div>
                    <CardMedia
                        className={classes.media}
                        image={image}
                        title="image"
                    />
                    <CardContent className={classes.content}>
                        {heading && (
                            <Typography variant="h4" gutterBottom className={classes.typography}>
                                { heading }
                            </Typography>
                        )}
                        <Typography variant="h6" className={classes.typography}>
                            { body }
                        </Typography>
                    </CardContent>
                </div>
                <CardActions className={classes.actions}>
                    { children }
                </CardActions>
            </Card>
        </div>
    )
}

export default CardComponent;
