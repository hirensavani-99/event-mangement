import React from 'react'
import { Link } from 'react-router-dom'

import { Card, Button } from 'react-bootstrap'


import classes from './FindEvent.module.css'

export default function FindEvent(props) {
    return (
        <div className={classes.root}>
            <Card style={{ width: '25rem' }}>
                <div className={classes.card}>
                    <Card.Img variant="top" src={props.plane.pic} />
                    <Card.Body>
                        <Card.Title>{props.plane.title}</Card.Title>
                        <Card.Text>
                            {props.plane.desc}
                        </Card.Text>

                        <Button variant="outline-success"><Link to={`/${props.plane.title}`} >{props.plane.buttondesc} </Link></Button>
                    </Card.Body>
                </div>
            </Card>
        </div>
    )
}
