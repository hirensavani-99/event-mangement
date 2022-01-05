import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';

import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { Collapse } from '@material-ui/core';

import picture from '../../../assets/kites.jpg'

const useStyles = makeStyles({
  root: {
    maxWidth: 300,
    maxHeight: 350,
    background: 'rgba(0,0,0,0.5)',
    margin: '20px',
  },
  media: {
    height: 230,
    width: 300
  },
  title: {
    fontFamily: 'Nunito',
    fontWeight: 'bold',
    fontSize: '2rem',
    color: '#fff',
  },
  desc: {
    fontFamily: 'Nunito',
    fontSize: '1.1rem',
    color: '#ddd',
  },
});

export default function ImageCard({ event, checked }) {
  const classes = useStyles();



  return (
    <Collapse in={checked} {...(checked ? { timeout: 1000 } : {})} >
      <Card className={classes.root}>
        <CardMedia
          className={classes.media}
          image={`/uploads/${event.picture}`}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="h1"
            className={classes.title}
          >
            {event.eventName}
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            component="p"
            className={classes.desc}
          >
            {event.desc ? event.desc.slice(0, 50) + '...more' : ''}
          </Typography>
        </CardContent>
      </Card>
    </Collapse>
  );
}