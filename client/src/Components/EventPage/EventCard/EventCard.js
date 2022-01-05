import React, { useState, useContext } from 'react'
import AuthContex from '../../../store/auth-context'
import axios from 'axios'

import { Link } from 'react-router-dom'
import ModalEvent from './Modal'
import Card from 'react-bootstrap/Card'
import { Button } from 'react-bootstrap'

import classes from './EventCard.module.css'
export default function EventCard(props) {
    const [modalShow, setModalShow] = useState(false)
    const [eventData, setEventData] = useState({})

    const authCtx = useContext(AuthContex)
    let token = authCtx.token


    const handleCard = async (e) => {
        e.preventDefault();
        console.log(e.currentTarget.id);
        const data = await axios.get(`http://localhost:8000/event/${e.currentTarget.id}`, { headers: { "Authorization": `Bearer ${token}` } })
        setEventData(data.data)
        setModalShow(true)
    }

    return (
        <div key={props.event._id} className={classes.root}>
            <Card style={{ width: '18rem', height: '21rem' }}>
                <Card.Img variant="top" src={`/uploads/${props.event.picture}`} className={classes.img} />
                <Card.Body>
                    <Card.Title className={classes.dark} >{props.event.eventName ? props.event.eventName.slice(0, 20) : ''}</Card.Title>
                    <Card.Text>
                        <span className={classes.dark}>About event : </span>
                        {props.event.desc ? props.event.desc.slice(0, 50) + '...more' : ''}
                    </Card.Text>
                </Card.Body>

                <Card.Body className={classes.links}>

                    <Button className={classes.button} id={props.event._id} onClick={handleCard}>Check More </Button>
                </Card.Body>
                <ModalEvent show={modalShow}
                    data={eventData}
                    onHide={() => setModalShow(false)} />
            </Card>

        </div >
    )
}
