
import React from 'react'

import classes from './ourService.module.css'
import Card from 'react-bootstrap/Card'


export default function OurService(props) {

    return (
        <div className={classes.root}>
            <Card style={{ width: '18rem', height: '16rem' }}>
                <Card.Img variant="top" src={`/uploads/${props.service.pic}`} className={classes.img} />
                <Card.Body>
                    <Card.Title className={classes.dark} >{props.service.title}</Card.Title>

                </Card.Body>



            </Card>
        </div>
    )
}
