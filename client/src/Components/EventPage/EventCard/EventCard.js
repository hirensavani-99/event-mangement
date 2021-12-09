import React from 'react'

import { Link } from 'react-router-dom'

import Card from 'react-bootstrap/Card'
import { ListGroup, ListGroupItem } from 'react-bootstrap'

import classes from './EventCard.module.css'
export default function EventCard(props) {

    const handleClick = (e) => {
        e.preventDefault();
        console.log(props.event._id);
    }

    return (
        <div key={props.event._id} className={classes.root}>
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={`/uploads/${props.event.picture}`} />
                <Card.Body>
                    <Card.Title>{props.event.eventName ? props.event.eventName.slice(0, 12) : ''}</Card.Title>
                    <Card.Text>
                        <span>About event : </span>
                        {props.event.desc ? props.event.desc.slice(0, 20) + '...more' : ''}
                    </Card.Text>
                </Card.Body>
                <ListGroup className="list-group-flush">
                    <ListGroupItem><span>Address : </span>{props.event.address}</ListGroupItem>
                    <ListGroupItem><span>Date : </span>{props.event.eventDate}</ListGroupItem>
                    <ListGroupItem><bold><span>Price : </span>{props.event.priceOfPass}</bold></ListGroupItem>
                </ListGroup>
                <Card.Body className={classes.links}>
                    <button onClick={handleClick}>click</button>
                    <Link to="/payment">Buy tickets</Link>
                    <Link to="#">Save It for later</Link>
                </Card.Body>
            </Card>
        </div>
    )
}
