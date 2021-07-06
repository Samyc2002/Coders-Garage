import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import './styles.css'
import { CardActionArea, CardMedia } from '@material-ui/core';

const useStyles = makeStyles({
	root: {
		width: 345
	},
	media: {
		height: 140,
	},
});

interface Content{
    image: string,
    heading: string,
    body: string | null,
    handleClick?: any,
	children?:React.ReactChild
}

const SimpleCard = ({ image, heading, body, handleClick, children }: Content) => {
	const classes = useStyles();

	return (
		<Card className={classes.root}>
		<CardActionArea onClick={handleClick}>
			<CardMedia
				className={classes.media}
				image={image}
				title={heading}
			/>
			<CardContent>
			<Typography gutterBottom variant="h5" component="h2">{ heading }</Typography>
			<Typography variant="body2" color="textSecondary" component="p">{ body }</Typography>
			</CardContent>
			{children}
		</CardActionArea>
		</Card>
	);
}

export default SimpleCard;